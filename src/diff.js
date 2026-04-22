/**
 * Pure function — no side effects, no imports.
 *
 * Computes the diff array between two snapshots.
 * Handles actors added (in curr, not in prev) and actors removed (in prev, not in curr).
 *
 * Status tagging rules:
 *   red    — todayRuns === 0 AND prev had runs, OR todaySuccessRate < 50,
 *             OR costDelta > 2× actor's average daily cost
 *   yellow — newPayingUsersGained > 0, OR |revenueDelta| > 20% of prevRevenue,
 *             OR |runsDelta| > 50% of prev daily avg runs
 *   green  — everything else
 */
export function computeDiffs(prevSnapshot, currSnapshot) {
    const currActors = currSnapshot?.actorSnapshots ?? [];
    const prevActors = prevSnapshot?.actorSnapshots ?? [];

    // Build lookup map: actorId → previous actor snapshot
    const prevMap = Object.fromEntries(
        prevActors.filter((a) => !a.fetchError).map((a) => [a.actorId, a]),
    );

    const diffs = [];

    for (const curr of currActors) {
        if (curr.fetchError) continue;

        const prev = prevMap[curr.actorId] ?? null;

        const todayRuns = curr.todayRuns ?? 0;
        const todaySucceeded = curr.todaySucceeded ?? 0;
        const todayFailed = curr.todayFailed ?? 0;
        const todaySuccessRate = todayRuns > 0 ? (todaySucceeded / todayRuns) * 100 : 0;

        const prevTotalRuns = prev?.totalRuns ?? curr.totalRuns;
        const prevTotalRevenue = prev?.totalRevenue ?? curr.totalRevenue;
        const prevTotalCost = prev?.totalCost ?? curr.totalCost;
        const prevProfitMargin = prev?.profitMargin ?? curr.profitMargin;
        const prevDailyAvgRuns = prev?.dailyRuns?.avg ?? curr.dailyRuns?.avg ?? 0;
        const prevTodayCost = prev?.todayCost ?? 0;
        const prevPayingUsers = prev?.payingUsers ?? curr.payingUsers;
        const prevFreeUsers = prev?.freeUsers ?? curr.freeUsers;

        const runsDelta = curr.totalRuns - prevTotalRuns;
        const revenueDelta = curr.totalRevenue - prevTotalRevenue;
        const costDelta = curr.totalCost - prevTotalCost;
        const profitMarginDelta = curr.profitMargin - prevProfitMargin;
        const newPayingUsersGained = curr.payingUsers - prevPayingUsers;
        const newFreeUsersGained = curr.freeUsers - prevFreeUsers;

        const prevSuccessRate =
            prev && prev.totalRuns > 0 ? (prev.succeededRuns / prev.totalRuns) * 100 : null;
        const currSuccessRate =
            curr.totalRuns > 0 ? (curr.succeededRuns / curr.totalRuns) * 100 : 0;
        const successRateDelta = prevSuccessRate !== null ? currSuccessRate - prevSuccessRate : 0;

        // Status
        let status = 'green';
        const hadRunsBefore = (prev?.todayRuns ?? 0) > 0 || (prev?.totalRuns ?? 0) > 0;

        if (
            (todayRuns === 0 && hadRunsBefore) ||
            todaySuccessRate < 50 ||
            (prevTodayCost > 0 && costDelta > 2 * prevTodayCost)
        ) {
            status = 'red';
        } else if (
            newPayingUsersGained > 0 ||
            (prevTotalRevenue > 0 && Math.abs(revenueDelta) > 0.2 * prevTotalRevenue) ||
            (prevDailyAvgRuns > 0 && Math.abs(runsDelta) > 0.5 * prevDailyAvgRuns)
        ) {
            status = 'yellow';
        }

        diffs.push({
            actorId: curr.actorId,
            actorName: curr.actorName,
            actorTitle: curr.actorTitle ?? curr.actorName,
            isNew: !prev,
            isRemoved: false,
            // Deltas
            todayPayingUsers: curr.todayPayingUsers ?? 0,
            todayFreeUsers: curr.todayFreeUsers ?? 0,
            newPayingUsersGained,
            newFreeUsersGained,
            runsDelta,
            successRateDelta,
            revenueDelta,
            costDelta,
            profitMarginDelta,
            // Today's absolute values
            todayRuns,
            todaySucceeded,
            todayFailed,
            todaySuccessRate,
            todayRevenue: curr.todayRevenue ?? 0,
            // Monthly totals (for expanded detail)
            totalRevenue: curr.totalRevenue,
            totalCost: curr.totalCost,
            netProfit: curr.totalRevenue - curr.totalCost,
            profitMargin: curr.profitMargin,
            payingUsers: curr.payingUsers,
            freeUsers: curr.freeUsers,
            costPer1000Results: curr.costPer1000Results,
            dailyResults: curr.dailyResults,
            dailyRuns: curr.dailyRuns,
            status,
        });
    }

    // Actors that existed before but are gone now → treat as removed (red)
    const currIds = new Set(currActors.map((a) => a.actorId));
    for (const prev of prevActors) {
        if (!prev.fetchError && !currIds.has(prev.actorId)) {
            diffs.push({
                actorId: prev.actorId,
                actorName: prev.actorName,
                actorTitle: prev.actorTitle ?? prev.actorName,
                isNew: false,
                isRemoved: true,
                todayPayingUsers: 0,
                todayFreeUsers: 0,
                newPayingUsersGained: 0,
                newFreeUsersGained: 0,
                runsDelta: -prev.totalRuns,
                successRateDelta: 0,
                revenueDelta: -prev.totalRevenue,
                costDelta: -prev.totalCost,
                profitMarginDelta: 0,
                todayRuns: 0,
                todaySucceeded: 0,
                todayFailed: 0,
                todaySuccessRate: 0,
                todayRevenue: 0,
                totalRevenue: 0,
                totalCost: 0,
                netProfit: 0,
                profitMargin: 0,
                payingUsers: 0,
                freeUsers: 0,
                costPer1000Results: 0,
                dailyResults: { avg: 0, min: 0, max: 0 },
                dailyRuns: { avg: 0, min: 0, max: 0 },
                status: 'red',
            });
        }
    }

    return diffs;
}
