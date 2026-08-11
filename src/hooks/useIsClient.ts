"use client";

import { useSyncExternalStore } from "react";

function subscribeNever() {
  return () => {};
}

/** SSR-safe "has this mounted on the client yet" flag, without an effect. */
export function useIsClient() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}
