import { Actor, log } from 'apify';

/**
 * Opens the named Key-Value Store.
 * On the Apify platform this store persists indefinitely across runs.
 */
export async function openStore(storeName) {
    return Actor.openKeyValueStore(storeName);
}

/**
 * Saves the snapshot under two keys:
 *   snapshot_YYYY-MM-DD  — permanent dated record
 *   snapshot_latest      — always the most recent snapshot
 */
export async function saveSnapshot(store, snapshot) {
    const date = snapshot.accountSummary.today;
    const dateKey = `snapshot_${date}`;
    await store.setValue(dateKey, snapshot);
    await store.setValue('snapshot_latest', snapshot);
    log.info(`Snapshot saved to keys: "${dateKey}" and "snapshot_latest"`);
}

/**
 * Reads the most recent snapshot, or null if none exists yet.
 */
export async function loadLatestSnapshot(store) {
    const snapshot = await store.getValue('snapshot_latest');
    if (snapshot) {
        log.info('Loaded previous snapshot', { capturedAt: snapshot.accountSummary?.capturedAt });
    } else {
        log.info('No previous snapshot found — first run');
    }
    return snapshot ?? null;
}

/**
 * Reads the snapshot for a specific date (YYYY-MM-DD), or null if not found.
 */
export async function loadSnapshotForDate(store, date) {
    const snapshot = await store.getValue(`snapshot_${date}`);
    if (snapshot) {
        log.info('Loaded snapshot for date', { date, capturedAt: snapshot.accountSummary?.capturedAt });
    }
    return snapshot ?? null;
}

/**
 * Loads the last `n` dated snapshots (oldest → newest).
 * Useful for building trend sparklines and week-over-week comparisons.
 */
export async function loadLastNSnapshots(store, n = 7) {
    const allKeys = [];

    // forEachKey is the correct SDK v3 API for iterating KV store keys
    await store.forEachKey((key) => {
        if (/^snapshot_\d{4}-\d{2}-\d{2}$/.test(key)) {
            allKeys.push(key);
        }
    });

    // ISO date strings sort lexicographically, so alphabetical = chronological
    allKeys.sort();
    const recentKeys = allKeys.slice(-n);

    const snapshots = await Promise.all(recentKeys.map((key) => store.getValue(key)));
    const valid = snapshots.filter(Boolean);
    log.info(`Loaded ${valid.length} historical snapshot(s) for trending (requested ${n})`);
    return valid;
}

/**
 * Deletes dated snapshots older than `retentionDays` days.
 * Only removes `snapshot_YYYY-MM-DD` keys; `snapshot_latest` is never touched.
 */
export async function deleteOldSnapshots(store, retentionDays = 30) {
    const cutoffDate = new Date(Date.now() - retentionDays * 86_400_000).toISOString().slice(0, 10);
    const toDelete = [];

    await store.forEachKey((key) => {
        const match = key.match(/^snapshot_(\d{4}-\d{2}-\d{2})$/);
        if (match && match[1] < cutoffDate) {
            toDelete.push(key);
        }
    });

    if (toDelete.length === 0) {
        log.info('Snapshot cleanup: nothing to delete', { retentionDays, cutoffDate });
        return;
    }

    for (const key of toDelete) {
        await store.setValue(key, null);
    }
    log.info(`Snapshot cleanup: deleted ${toDelete.length} snapshot(s) older than ${retentionDays} days`, { cutoffDate });
}
