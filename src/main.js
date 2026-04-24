import { Actor, log } from 'apify';
import { ApifyClient } from 'apify-client';
import { getAccountSnapshot } from './fetcher.js';
import { openStore, saveSnapshot, loadLatestSnapshot, loadSnapshotForDate, deleteOldSnapshots } from './storage.js';
import { computeDiffs, buildTrendData } from './diff.js';
import { generateReport } from './report.js';

await Actor.init();

try {
    // Read input
    const input = await Actor.getInput();
    const {
        apifyToken,
        emailTo,
        snapshotStoreName = 'apify-actor-monitor',
        compareDate = null,
        snapshotRetentionDays = 30,
    } = input ?? {};

    if (!apifyToken) throw new Error('Input "apifyToken" is required');

    log.info('Actor started', {
        snapshotStoreName,
        emailTo: emailTo ?? '(not set)',
        compareDate: compareDate ?? '(auto: yesterday)',
        snapshotRetentionDays,
    });

    // Fetch current snapshot
    log.info('Fetching account snapshot from Apify analytics API...');
    const currSnapshot = await getAccountSnapshot(apifyToken);
    log.info('Snapshot fetched', {
        actors: currSnapshot.actorSnapshots.length,
        today: currSnapshot.accountSummary.today,
    });

    // Open named KV store
    const store = await openStore(snapshotStoreName);

    // Load previous snapshot for comparison.
    // If compareDate is supplied, use that exact date as the baseline.
    // Otherwise prefer yesterday's dated snapshot (consistent across same-day re-runs),
    // falling back to the latest snapshot in case of gaps.
    let prevSnapshot;
    if (compareDate) {
        log.info('Using custom compareDate as baseline', { compareDate });
        prevSnapshot = (await loadSnapshotForDate(store, compareDate)) ?? (await loadLatestSnapshot(store));
    } else {
        const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
        prevSnapshot = (await loadSnapshotForDate(store, yesterday)) ?? (await loadLatestSnapshot(store));
    }

    // Compute diffs
    const diffs = computeDiffs(prevSnapshot, currSnapshot);
    log.info('Diffs computed', {
        red: diffs.filter((d) => d.status === 'red').length,
        yellow: diffs.filter((d) => d.status === 'yellow').length,
        green: diffs.filter((d) => d.status === 'green').length,
    });

    // Save new snapshot and clean up old ones beyond the retention window
    await saveSnapshot(store, currSnapshot);
    await deleteOldSnapshots(store, snapshotRetentionDays);

    // Generate HTML report and save to KV store
    const { accountSummary } = currSnapshot;
    const reportKey = `report-${accountSummary.today}`;

    // Build a direct link to the stored HTML file (requires Apify token to view)
    const reportUrl = `https://api.apify.com/v2/key-value-stores/${store.id}/records/${reportKey}`;

    // Build 7-day trend from per-actor daily API data — no stored snapshots needed.
    // The API already returns the full month's daily stats for every actor.
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(Date.now() - (6 - i) * 86_400_000);
        return d.toISOString().slice(0, 10);
    });
    const activeActors = currSnapshot.actorSnapshots.filter((a) => !a.fetchError);
    const syntheticSnapshots = last7Days.map((date) => ({
        accountSummary: { today: date },
        actorSnapshots: activeActors.map((a) => ({
            actorId: a.actorId,
            actorName: a.actorName,
            actorTitle: a.actorTitle,
            todayRuns: a.dailyRunStats?.[date]?.TOTAL ?? 0,
            todayRevenue: a.dailyRevenueStats?.[date]?.allUsersUsd?.revenueUsd ?? 0,
        })),
    }));
    const trendData = buildTrendData(syntheticSnapshots);
    log.info('Trend data built from daily API stats', { actorsWithTrend: trendData.size, days: last7Days.length });

    log.info('Generating HTML report...');
    const isFirstRun = prevSnapshot === null;
    const fetchErrorCount = currSnapshot.actorSnapshots.filter((a) => a.fetchError).length;

    // Build account-level comparison summary.
    // The live API response already contains all daily data for the current month inside
    // accountSummary.dailyProfit / dailyUsers — so we always prefer that over a stored
    // snapshot (it's more accurate: stored snapshots reflect the time they were taken,
    // not the final end-of-day totals).
    const compDate = compareDate ?? new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const dailyProfitEntry = accountSummary.dailyProfit?.[compDate];
    const dailyUserEntry = accountSummary.dailyUsers?.[compDate] ?? {};
    // Sum per-actor daily runs for compDate (account-level run API returns empty dailyStats)
    const compDateRuns = activeActors.reduce((sum, a) => sum + (a.dailyRunStats?.[compDate]?.TOTAL ?? 0), 0);
    let prevAccountSummaryForReport;
    if (dailyProfitEntry) {
        prevAccountSummaryForReport = {
            today: compDate,
            todayRevenue: dailyProfitEntry.allUsersUsd?.revenueUsd ?? 0,
            todayCost: dailyProfitEntry.allUsersUsd?.costUsd ?? 0,
            todayRuns: compDateRuns,
            todayPayingUsers: dailyUserEntry.payingUsers ?? 0,
            todayFreeUsers: dailyUserEntry.freeUsers ?? 0,
        };
        log.info('Built comparison summary from daily API data', { compDate, revenue: prevAccountSummaryForReport.todayRevenue });
    } else {
        prevAccountSummaryForReport = prevSnapshot?.accountSummary ?? null;
        log.info('No daily API data for compDate — falling back to stored snapshot', { compDate });
    }

    const html = generateReport(accountSummary, diffs, reportUrl, isFirstRun, fetchErrorCount, trendData, prevAccountSummaryForReport);
    if (isFirstRun) log.info('First run detected — baseline snapshot saved. Full comparison report available next run.');
    await store.setValue(reportKey, html, { contentType: 'text/html' });
    log.info('HTML report saved to KV store', { key: reportKey, reportUrl });

    // Push run summary to dataset
    const validDiffs = diffs.filter((d) => !d.isRemoved);

    // Top 5 actors by today's revenue
    const topActorsByRevenue = [...validDiffs]
        .sort((a, b) => b.todayRevenue - a.todayRevenue)
        .slice(0, 5)
        .map((d) => ({
            name: d.actorTitle || d.actorName,
            todayRevenue: +d.todayRevenue.toFixed(2),
            todayRuns: d.todayRuns,
            todaySuccessRate: +d.todaySuccessRate.toFixed(1),
            status: d.status,
        }));

    // Actors flagged red or yellow (names only for quick scan)
    const flaggedActors = diffs
        .filter((d) => d.status === 'red' || d.status === 'yellow')
        .map((d) => ({
            name: d.actorTitle || d.actorName,
            status: d.status,
            todayRuns: d.todayRuns,
            todaySuccessRate: +d.todaySuccessRate.toFixed(1),
            revenueDelta: +d.revenueDelta.toFixed(2),
            isNew: d.isNew,
            isRemoved: d.isRemoved,
        }));

    await Actor.pushData({
        // A. Identity
        date: accountSummary.today,
        capturedAt: accountSummary.capturedAt,

        // B. Month-to-date financials
        totalRevenue: +accountSummary.totalRevenue.toFixed(2),
        totalCost: +accountSummary.totalCost.toFixed(2),
        netProfit: +accountSummary.netProfit.toFixed(2),
        overallMargin: +accountSummary.overallMargin.toFixed(4),
        avgCostPer1000Results: +accountSummary.avgCostPer1000Results.toFixed(4),

        // C. Daily financials
        todayRevenue: +accountSummary.todayRevenue.toFixed(2),
        todayCost: +accountSummary.todayCost.toFixed(2),

        // D. Daily run statistics
        todayRuns: accountSummary.todayRuns,
        todaySucceeded: accountSummary.todaySucceeded,
        todayFailed: accountSummary.todayFailed,
        todaySuccessRate: +accountSummary.todaySuccessRate.toFixed(2),

        // E. Daily user statistics
        todayPayingUsers: accountSummary.todayPayingUsers,
        todayFreeUsers: accountSummary.todayFreeUsers,

        // F. Actor counts
        actorsMonitored: currSnapshot.actorSnapshots.filter((a) => !a.fetchError).length,
        statusCounts: {
            red: diffs.filter((d) => d.status === 'red').length,
            yellow: diffs.filter((d) => d.status === 'yellow').length,
            green: diffs.filter((d) => d.status === 'green').length,
        },

        // G. Actor breakdowns
        topActorsByRevenue,
        flaggedActors,

        // H. Report link
        reportUrl,
    });

    // 9. Send email report (if configured)
    if (emailTo) {
        log.info(`Sending HTML report to ${emailTo}...`);

        const emailClient = new ApifyClient({ token: apifyToken });
        await emailClient.actor('e643gqfZae2TfQEbA').call({
            to: emailTo,
            subject: `Apify Actor Report — ${accountSummary.today}`,
            html,
            isMock: false,
        });

        log.info('Email report sent', { to: emailTo });
    } else {
        log.info('emailTo not set — skipping email');
    }

    log.info('Actor finished successfully');
} catch (err) {
    log.error(`Actor failed: ${err.message}`, { stack: err.stack });
    process.exitCode = 1;
}

await Actor.exit();
