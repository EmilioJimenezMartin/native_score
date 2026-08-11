"use client";

import { useInstallPrompt } from "./useInstallPrompt";
import { useIsClient } from "./useIsClient";
import { useLocalStorage } from "./useLocalStorage";

const DISMISSED_KEY = "emi-score:install-banner-dismissed";

function isStandaloneDisplay() {
  const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone;
  return window.matchMedia("(display-mode: standalone)").matches || iosStandalone === true;
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Combines the native install-prompt capture with the platform checks
 * needed to decide whether to offer installation at all, plus whether the
 * user already dismissed the up-front nudge (shared across every consumer
 * via the same localStorage-backed key).
 */
export function useInstallability() {
  const isClient = useIsClient();
  const { canInstall, justInstalled, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useLocalStorage(DISMISSED_KEY, false);

  const isIos = isClient && isIosDevice();
  const isInstallable =
    isClient && !justInstalled && !isStandaloneDisplay() && (canInstall || isIos);

  return { isInstallable, isIos, dismissed, setDismissed, promptInstall };
}
