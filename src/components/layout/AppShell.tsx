import type { ReactNode } from "react";

export interface AppShellProps {
  children: ReactNode;
}

/**
 * Root visual frame for every screen: pins content to the dark background
 * and reserves the device safe areas so the native (Capacitor) status bar
 * never overlaps the UI. The bottom inset is intentionally left to whatever
 * renders at the bottom of the screen (e.g. `BottomActionBar` already pads
 * itself), since a fixed bar ignores this container's own padding.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="flex min-h-dvh flex-col bg-background"
      style={{
        paddingTop: "var(--safe-top)",
        paddingLeft: "var(--safe-left)",
        paddingRight: "var(--safe-right)",
      }}
    >
      {children}
    </div>
  );
}
