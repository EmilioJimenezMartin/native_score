/**
 * Generic key-value persistence over `localStorage`.
 * Safe to import from server-rendered code paths (static export prerender)
 * since every method no-ops when `window` is unavailable.
 */
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function get<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail (quota, private mode); persistence is best-effort.
  }
}

function remove(key: string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

export const storageService = { get, set, remove };
