import { log } from 'apify';

const BASE_URL = 'https://console-backend.apify.com';

async function apiFetch(url, token) {
    const res = await fetch(url, {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'authorization': `Bearer ${token}`,
            'Referer': 'https://console.apify.com/',
        },
    });
    if (!res.ok) {
        throw new Error(`API ${res.status} for ${url}`);
    }
    return res.json();
}

function getCurrentMonth() {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, '0');
    return `${y}-${m}-01`;
}

function getTodayDate() {
    return new Date().toISOString().slice(0, 10);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Simple concurrency pool — runs `fns` with at most `limit` in-flight at once,
// preserving result order. Adds `delayMs` between each task start.
async function pAll(fns, limit = 3, delayMs = 500) {
    const results = new Array(fns.length);
    let next = 0;
    async function worker() {
        while (true) {
            const idx = next++;
            if (idx >= fns.length) break;
            if (idx > 0) await sleep(delayMs);
            results[idx] = await fns[idx]();
        }
    }
    await Promise.all(Array.from({ length: Math.min(limit, fns.length) }, worker));
    return results;
}

// 1. Account-wide endpoints

export async function fetchOwnedActors(token) {
    const data = await apiFetch(
        `${BASE_URL}/actors/find-users-owned-actors-by-text?text=`,
        token,
    );
    return Array.isArray(data) ? data : [];
}

export async function fetchActorBreakdown(token, month) {
    return apiFetch(`${BASE_URL}/actor-analytics/actor-breakdown?month=${month}`, token);
}

export async function fetchAccountRunStats(token, month) {
    return apiFetch(
        `${BASE_URL}/actor-analytics/run-statistics/monthly/all-users?month=${month}`,
        token,
    );
}

export async function fetchAccountUserCounts(token, month) {
    return apiFetch(
        `${BASE_URL}/actor-analytics/user-count-statistics?month=${month}`,
        token,
    );
}

export async function fetchAccountProfitMargin(token, month) {
    return apiFetch(`${BASE_URL}/actor-analytics/profit-margin?month=${month}`, token);
}

export async function fetchAccountCostPerThousand(token, month) {
    return apiFetch(
        `${BASE_URL}/actor-analytics/costs-per-thousand-results?month=${month}`,
        token,
    );
}

// 2. Per-actor endpoints

export async function fetchActorRunStats(token, actorId, month) {
    return apiFetch(
        `${BASE_URL}/actor-analytics/run-statistics/monthly/all-users?actorIds%5B%5D=${actorId}&month=${month}`,
        token,
    );
}

export async function fetchActorProfitMargin(token, actorId, month) {
    return apiFetch(
        `${BASE_URL}/actor-analytics/profit-margin?month=${month}&actorIds%5B%5D=${actorId}`,
        token,
    );
}

export async function fetchActorCostPerThousand(token, actorId, month) {
    return apiFetch(
        `${BASE_URL}/actor-analytics/costs-per-thousand-results?month=${month}&actorIds%5B%5D=${actorId}`,
        token,
    );
}

export async function fetchActorUserCounts(token, actorId, month) {
    return apiFetch(
        `${BASE_URL}/actor-analytics/user-count-statistics?month=${month}&actorIds%5B%5D=${actorId}`,
        token,
    );
}

// 3. Full snapshot builder

/**
 * Fetches all data needed for one snapshot run and returns:
 * { accountSummary, actorSnapshots }
 */
export async function getAccountSnapshot(token) {
    const month = getCurrentMonth();
    const today = getTodayDate();
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const capturedAt = new Date().toISOString();

    log.info('Fetching account-wide analytics', { month, today });

    const breakdown = await fetchActorBreakdown(token, month);
    await sleep(300);
    const accountRunStats = await fetchAccountRunStats(token, month);
    await sleep(300);
    const accountUserCounts = await fetchAccountUserCounts(token, month);
    await sleep(300);
    const accountProfitMargin = await fetchAccountProfitMargin(token, month);
    await sleep(300);
    const accountCostPerK = await fetchAccountCostPerThousand(token, month);
    await sleep(300);

    // Build a quick lookup: actorId → breakdown entry
    const bdMap = {};
    for (const entry of breakdown?.monetizationPerActor ?? []) {
        bdMap[entry.actor._id] = entry;
    }

    const ownedActors = await fetchOwnedActors(token);
    log.info(`Found ${ownedActors.length} owned actors`);

    // Fetch per-actor stats sequentially with a delay to avoid overwhelming the server
    let actorIdx = 0;
    const perActorFns = ownedActors.map((actor) => async () => {
        const actorId = actor.id || actor._id;
        const actorNum = ++actorIdx;
        try {
            const runStats = await fetchActorRunStats(token, actorId, month);
            await sleep(300);
            const profitMargin = await fetchActorProfitMargin(token, actorId, month);
            await sleep(300);
            const costPerK = await fetchActorCostPerThousand(token, actorId, month);
            await sleep(300);
            const userCounts = await fetchActorUserCounts(token, actorId, month);
            log.info(`Completed actor stats [${actorNum}/${ownedActors.length}]`, {
                actorId,
                actorName: actor.name,
            });
            return { actor, actorId, runStats, profitMargin, costPerK, userCounts };
        } catch (err) {
            log.warning(`Skipping actor [${actorNum}/${ownedActors.length}]`, {
                actorId,
                actorName: actor.name,
                error: err.message,
            });
            return { actor, actorId, fetchError: err.message };
        }
    });

    // Concurrency cap of 4, 300 ms stagger between task starts
    const perActorResults = await pAll(perActorFns, 4, 300);

    // Build per-actor snapshot objects
    const actorSnapshots = perActorResults.map(
        ({ actor, actorId, runStats, profitMargin, costPerK, userCounts, fetchError }) => {
            if (fetchError) {
                return { actorId, actorName: actor.name, actorTitle: actor.title, capturedAt, fetchError };
            }

            const bd = bdMap[actorId];
            const runsStats = bd?.runsStats ?? {};
            const earningsStats = bd?.earningsStats ?? {};
            const usersStats = bd?.usersStats ?? {};

            // Today's daily entries
            const todayRun = runStats?.dailyStats?.[today] ?? {};
            const todayUser = userCounts?.[today] ?? {};
            const todayProfit = profitMargin?.dailyProfitMarginStats?.[today]?.allUsersUsd ?? {};
            const totalProfit = profitMargin?.totalProfitMarginStats?.allUsersUsd ?? {};

            const todayRuns = todayRun.TOTAL ?? 0;
            const todaySucceeded = todayRun.SUCCEEDED ?? 0;
            const todayFailed = (todayRun.FAILED ?? 0) + (todayRun['TIMED-OUT'] ?? 0);

            return {
                actorId,
                actorName: actor.name,
                actorTitle: actor.title ?? actor.name,
                capturedAt,
                // Monthly cumulative totals
                totalRuns: runsStats.TOTAL ?? 0,
                succeededRuns: runsStats.SUCCEEDED ?? 0,
                failedRuns: (runsStats.FAILED ?? 0) + (runsStats['TIMED-OUT'] ?? 0),
                payingUsers: usersStats.payingUsers ?? 0,
                freeUsers: usersStats.freeUsers ?? 0,
                totalRevenue: earningsStats.totalRevenueUsd ?? 0,
                totalCost: totalProfit.costUsd ?? 0,
                profitMargin: totalProfit.margin ?? 0,
                costPer1000Results: costPerK?.totalActorRunsCost?.avgActorRunsCost ?? 0,
                dailyResults: runStats?.resultsSummary ?? { avg: 0, min: 0, max: 0 },
                dailyRuns: runStats?.runsSummary ?? { avg: 0, min: 0, max: 0 },
                // Today's specific data
                todayDate: today,
                todayRuns,
                todaySucceeded,
                todayFailed,
                todayPayingUsers: todayUser.payingUsers ?? 0,
                todayFreeUsers: todayUser.freeUsers ?? 0,
                todayRevenue: todayProfit.revenueUsd ?? 0,
                todayCost: todayProfit.costUsd ?? 0,
            };
        },
    );

    // Build account-level summary
    const accTodayRun = accountRunStats?.dailyStats?.[today] ?? {};
    const accTodayUser = accountUserCounts?.[today] ?? {};
    const accTodayProfit = accountProfitMargin?.dailyProfitMarginStats?.[today]?.allUsersUsd ?? {};
    const accTodayProfitPaying = accountProfitMargin?.dailyProfitMarginStats?.[today]?.payingUsersUsd ?? {};
    const accTotal = accountProfitMargin?.totalProfitMarginStats?.allUsersUsd ?? {};
    const accTotalPaying = accountProfitMargin?.totalProfitMarginStats?.payingUsersUsd ?? {};

    const todaySucceeded = accTodayRun.SUCCEEDED ?? 0;
    const todayRuns = accTodayRun.TOTAL ?? 0;

    const accountSummary = {
        capturedAt,
        month,
        today,
        // Monthly totals
        totalRevenue: accTotal.revenueUsd ?? 0,
        totalCost: accTotal.costUsd ?? 0,
        netProfit: accTotal.profitUsd ?? 0,
        overallMargin: accTotal.margin ?? 0,
        // Paying vs free revenue split (monthly)
        payingRevenueMTD: accTotalPaying.revenueUsd ?? 0,
        freeRevenueMTD: (accTotal.revenueUsd ?? 0) - (accTotalPaying.revenueUsd ?? 0),
        // Today's data
        todayRevenue: accTodayProfit.revenueUsd ?? 0,
        todayCost: accTodayProfit.costUsd ?? 0,
        // Paying vs free revenue split (today)
        todayPayingRevenue: accTodayProfitPaying.revenueUsd ?? 0,
        todayFreeRevenue: (accTodayProfit.revenueUsd ?? 0) - (accTodayProfitPaying.revenueUsd ?? 0),
        todayRuns,
        todaySucceeded,
        todayFailed: (accTodayRun.FAILED ?? 0) + (accTodayRun['TIMED-OUT'] ?? 0),
        todaySuccessRate: todayRuns > 0 ? (todaySucceeded / todayRuns) * 100 : 0,
        todayPayingUsers: accTodayUser.payingUsers ?? 0,
        todayFreeUsers: accTodayUser.freeUsers ?? 0,
        payingUsersChange: (accTodayUser.payingUsers ?? 0) - (accountUserCounts?.[yesterday]?.payingUsers ?? 0),
        freeUsersChange: (accTodayUser.freeUsers ?? 0) - (accountUserCounts?.[yesterday]?.freeUsers ?? 0),
        avgCostPer1000Results: accountCostPerK?.totalActorRunsCost?.avgActorRunsCost ?? 0,
    };

    return { accountSummary, actorSnapshots };
}
