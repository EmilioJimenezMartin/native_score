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
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return children;
}
