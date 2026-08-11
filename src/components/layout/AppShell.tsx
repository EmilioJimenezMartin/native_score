import type { ReactNode } from "react";

export interface AppShellProps {
  children: ReactNode;
}

/**
 * Root visual frame for every screen: pins content to the dark background
 * and reserves the device safe areas so the native (Capacitor) status bar
 * and home indicator never overlap the UI.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="flex min-h-dvh flex-col bg-background"
      style={{
        paddingTop: "var(--safe-top)",
        paddingBottom: "var(--safe-bottom)",
        paddingLeft: "var(--safe-left)",
        paddingRight: "var(--safe-right)",
      }}
    >
      {children}
    </div>
  );
}
