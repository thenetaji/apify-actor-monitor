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
