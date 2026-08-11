import { Capacitor } from "@capacitor/core";

function isNative(): boolean {
  return Capacitor.isNativePlatform();
}

function getPlatform(): "ios" | "android" | "web" {
  return Capacitor.getPlatform() as "ios" | "android" | "web";
}

export const platformService = { isNative, getPlatform };
