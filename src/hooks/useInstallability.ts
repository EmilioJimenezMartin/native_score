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

function isMacSafari() {
  const isMac = /Macintosh/i.test(navigator.userAgent) && !isIpadDevice();
  const isSafariEngine =
    /Safari/i.test(navigator.userAgent) && !/Chrome|CriOS|Chromium|Edg|OPR/i.test(navigator.userAgent);
  return isMac && isSafariEngine;
}

export type IosBrowser = "safari" | "chrome" | "other";

function getIosBrowser(): IosBrowser {
  if (/CriOS/i.test(navigator.userAgent)) return "chrome";
  if (/FxiOS|EdgiOS|OPiOS/i.test(navigator.userAgent)) return "other";
  return "safari";
}

/**
 * How this browser/session can actually install the app:
 * - "native": Chrome/Edge/Android fire `beforeinstallprompt` — a real
 *   one-tap install.
 * - "ios": Safari or Chrome on iOS/iPadOS — manual "Add to Home Screen".
 * - "macos-safari": desktop Safari — manual "Add to Dock" from the File menu.
 * - "unsupported": everything else (desktop Firefox, or Chrome/Edge
 *   Incognito, which deliberately suppresses `beforeinstallprompt`). We
 *   still surface the icon so the affordance is always in the same place;
 *   it just explains why installing isn't available here.
 */
export type InstallMethod = "native" | "ios" | "macos-safari" | "unsupported";

function getInstallMethod(canInstall: boolean): InstallMethod {
  if (canInstall) return "native";
  if (isIosDevice()) return "ios";
  if (isMacSafari()) return "macos-safari";
  return "unsupported";
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

  const isIpad = isClient && isIpadDevice();
  const iosBrowser: IosBrowser = isClient ? getIosBrowser() : "safari";
  const installMethod: InstallMethod = isClient ? getInstallMethod(canInstall) : "unsupported";
  const isIos = installMethod === "ios";
  // Always available once mounted, not installed, and not just installed —
  // every browser gets *some* explanation, even if it can't install at all.
  const isInstallable = isClient && !justInstalled && !isStandaloneDisplay();

  return {
    isInstallable,
    installMethod,
    isIos,
    isIpad,
    iosBrowser,
    dismissed,
    setDismissed,
    promptInstall,
  };
}
