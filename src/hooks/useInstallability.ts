"use client";

import { useInstallPrompt } from "./useInstallPrompt";
import { useIsClient } from "./useIsClient";
import { useLocalStorage } from "./useLocalStorage";

const DISMISSED_KEY = "emi-score:install-banner-dismissed";

function isStandaloneDisplay() {
  const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone;
  return window.matchMedia("(display-mode: standalone)").matches || iosStandalone === true;
}

function isIpadDevice() {
  // iPadOS 13+ reports as "Macintosh" in the UA string unless the site is
  // requested in mobile mode, so a real Mac has to be ruled out by touch
  // support instead.
  return (
    /ipad/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || isIpadDevice();
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
  const isIpad = isClient && isIpadDevice();
  const isInstallable =
    isClient && !justInstalled && !isStandaloneDisplay() && (canInstall || isIos);

  return { isInstallable, isIos, isIpad, dismissed, setDismissed, promptInstall };
}
