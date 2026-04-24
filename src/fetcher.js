import { log } from 'apify';

const BASE_URL = 'https://console-backend.apify.com';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Adaptive Rate Limiter ─────────────────────────────────────────────────────
//
// Maintains a shared per-session request delay that shrinks on success (AIMD)
// and grows on 429 / 5xx responses. All callers share a single promise queue
// so concurrent workers naturally stagger without racing each other.
class AdaptiveRateLimiter {
    constructor({ minDelay = 100, maxDelay = 10_000, initialDelay = 200 } = {}) {
        this.minDelay = minDelay;
        this.maxDelay = maxDelay;
        this.currentDelay = initialDelay;
        this._queue = Promise.resolve();
    }

    // Gradually recover speed after a run of successes (multiplicative decrease)
    onSuccess() {
        this.currentDelay = Math.max(this.minDelay, this.currentDelay * 0.9);
    }

    // Back off on 429; honour Retry-After header when present
    onRateLimit(retryAfterMs = null) {
        const backoff = retryAfterMs != null ? retryAfterMs : this.currentDelay * 2;
        this.currentDelay = Math.min(this.maxDelay, backoff);
        log.warning(`Rate limiter: 429 — delay set to ${Math.round(this.currentDelay)}ms`);
    }

    // Mild back-off on transient server errors
    onServerError() {
        this.currentDelay = Math.min(this.maxDelay, this.currentDelay * 1.5);
        log.warning(`Rate limiter: 5xx — delay set to ${Math.round(this.currentDelay)}ms`);
    }

    // Enqueue this call through the shared chain; each caller waits for the
    // previous one's delay to elapse before its own delay begins.
    waitAndConsume() {
        const delay = this.currentDelay + Math.random() * 50; // ±50 ms jitter
        this._queue = this._queue.then(() => sleep(delay));
        return this._queue;
    }
}

const rateLimiter = new AdaptiveRateLimiter();

// ── Core fetch wrapper with retry ─────────────────────────────────────────────
async function apiFetch(url, token, maxRetries = 5) {
    let attempt = 0;
    while (true) {
        await rateLimiter.waitAndConsume();
        const res = await fetch(url, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'authorization': `Bearer ${token}`,
                'Referer': 'https://console.apify.com/',
            },
        });

        if (res.ok) {
            rateLimiter.onSuccess();
            return res.json();
        }

        if (res.status === 429) {
            attempt++;
            const retryAfterSec = res.headers.get('Retry-After');
            const retryAfterMs = retryAfterSec != null ? Number(retryAfterSec) * 1000 : null;
            rateLimiter.onRateLimit(retryAfterMs);
            if (attempt >= maxRetries) {
                throw new Error(`Rate limit (429) exceeded after ${maxRetries} retries for ${url}`);
            }
            log.warning(`Retrying after rate limit [${attempt}/${maxRetries}]`, { url });
            continue;
        }

        if (res.status >= 500) {
            attempt++;
            rateLimiter.onServerError();
            if (attempt >= maxRetries) {
                throw new Error(`Server error ${res.status} after ${maxRetries} retries for ${url}`);
            }
            log.warning(`Retrying after server error ${res.status} [${attempt}/${maxRetries}]`, { url });
            continue;
        }

        // Any other 4xx — not retryable
        throw new Error(`API ${res.status} for ${url}`);
    }
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

    // The adaptive rate limiter in apiFetch handles pacing; no manual sleeps needed.
    const breakdown = await fetchActorBreakdown(token, month);
    const accountRunStats = await fetchAccountRunStats(token, month);
    const accountUserCounts = await fetchAccountUserCounts(token, month);
    const accountProfitMargin = await fetchAccountProfitMargin(token, month);
    const accountCostPerK = await fetchAccountCostPerThousand(token, month);

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
            const profitMargin = await fetchActorProfitMargin(token, actorId, month);
            const costPerK = await fetchActorCostPerThousand(token, actorId, month);
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

    // Concurrency cap of 4; per-request pacing is handled by the adaptive rate limiter.
    const perActorResults = await pAll(perActorFns, 4, 0);

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
                // Full daily breakdowns for the current month — used to build trend sparklines
                // and per-day comparisons without relying on stored historical snapshots.
                dailyRunStats: runStats?.dailyStats ?? {},
                dailyRevenueStats: profitMargin?.dailyProfitMarginStats ?? {},
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
        // Daily breakdown for the current month — enables any-date comparison without needing stored snapshots.
        // Keys are YYYY-MM-DD strings; values are the API's profit/user stat objects.
        dailyProfit: accountProfitMargin?.dailyProfitMarginStats ?? {},
        dailyUsers: accountUserCounts ?? {},
    };

    return { accountSummary, actorSnapshots };
}
