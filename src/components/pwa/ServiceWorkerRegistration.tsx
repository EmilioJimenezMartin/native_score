"use client";

import { useEffect } from "react";

/**
 * Registers the offline/installability service worker. Uses a relative
 * URL (no leading slash) so it resolves under the current scope whether the
 * app is served from the domain root (Capacitor) or a subpath (GitHub
 * Pages) — see next.config.ts's basePath handling.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }, []);

  return null;
}
