"use client";

import { useCallback, useSyncExternalStore } from "react";
import { storageService } from "@/services/storage.service";

const snapshotCache = new Map<string, { raw: string | null; value: unknown }>();

function readSnapshot<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;

  const raw = window.localStorage.getItem(key);
  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  const value = raw === null ? initialValue : (JSON.parse(raw) as T);
  snapshotCache.set(key, { raw, value });
  return value;
}

function subscribe(key: string, onChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === key) onChange();
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

/**
 * React-facing binding over `storageService`, kept in sync via
 * `useSyncExternalStore` so cross-tab and same-tab writes both propagate
 * without a manual effect-triggered re-render.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = useCallback(
    () => readSnapshot(key, initialValue),
    [key, initialValue],
  );
  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);
  const subscribeToKey = useCallback(
    (onChange: () => void) => subscribe(key, onChange),
    [key],
  );

  const value = useSyncExternalStore(subscribeToKey, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = readSnapshot(key, initialValue);
      const resolved = next instanceof Function ? next(prev) : next;
      storageService.set(key, resolved);
      snapshotCache.delete(key);
      window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    [key, initialValue],
  );

  return [value, setValue] as const;
}
