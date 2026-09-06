const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const DAILY_DARSHAN_CACHE_KEY = "daily-darshan-photos:v1";

/** Reads a cached value written by writeCache, or null if missing/expired/unreadable.
 * Used to skip re-listing/re-querying Firebase Storage on repeat page visits. */
export function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, savedAt } = JSON.parse(raw) as { data: T; savedAt: number };
    if (Date.now() - savedAt > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    // Storage full or unavailable (private browsing) — just skip caching.
  }
}

/** Call after any upload/delete/retag so the next page load doesn't serve stale data. */
export function clearCache(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}
