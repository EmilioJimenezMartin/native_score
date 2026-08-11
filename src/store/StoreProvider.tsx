"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { Spinner } from "@/components/ui/Spinner";
import { selectHasHydrated } from "@/features/game/selectors";
import { makeStore, type AppStore } from "./store";
import { loadGameState, saveGameState } from "./persistence";
import { hydrate } from "./slices/gameSlice";
import { useAppSelector } from "./hooks";

export interface StoreProviderProps {
  children: ReactNode;
}

/**
 * Owns the Redux store instance and loads the persisted game (if any) from
 * localStorage once mounted. Whether hydration has happened lives in the
 * store itself (`game.hasHydrated`) rather than local React state, so
 * children can read it with `useAppSelector` instead of the effect calling
 * `setState` directly.
 */
export function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    store.dispatch(hydrate(loadGameState()));

    const unsubscribe = store.subscribe(() => {
      saveGameState(store.getState().game);
    });
    return unsubscribe;
  }, [store]);

  return (
    <Provider store={store}>
      <HydrationGate>{children}</HydrationGate>
    </Provider>
  );
}

function HydrationGate({ children }: { children: ReactNode }) {
  const hasHydrated = useAppSelector(selectHasHydrated);

  if (!hasHydrated) {
    // Opaque and full-viewport on its own terms (not just `flex-1`) since
    // this replaces AppShell entirely for this first tick — it can't rely
    // on AppShell's flex-col context to center it, and it deliberately
    // covers the page's ambient gradient so the loading state reads as one
    // plain, centered spinner instead of a stray blob of color.
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  return children;
}
