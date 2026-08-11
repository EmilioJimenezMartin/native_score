"use client";

import { FlagIcon, PlusIcon, TrophyIcon } from "@/components/ui";

export interface BottomActionBarProps {
  onOpenLeaderboard: () => void;
  onOpenAddPlayer: () => void;
  onOpenEndGame: () => void;
}

export function BottomActionBar({
  onOpenLeaderboard,
  onOpenAddPlayer,
  onOpenEndGame,
}: BottomActionBarProps) {
  return (
    <nav
      className="fixed inset-x-0 z-40 flex justify-center px-4"
      style={{ bottom: "calc(var(--safe-bottom) + 1rem)" }}
    >
      <div className="grid w-full max-w-md grid-cols-3 items-center rounded-[2rem] border border-white/10 bg-surface/55 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:max-w-2xl">
        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="flex flex-col items-center justify-self-start gap-1.5 px-5 py-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <TrophyIcon className="size-6" />
          Clasificación
        </button>

        <button
          type="button"
          onClick={onOpenAddPlayer}
          aria-label="Añadir jugador"
          className="-translate-y-4 flex size-14 items-center justify-center justify-self-center rounded-full bg-gradient-to-br from-primary via-primary-2 to-primary-3 text-primary-foreground shadow-lg shadow-primary-2/50 transition-transform active:scale-95"
        >
          <PlusIcon className="size-6" />
        </button>

        <button
          type="button"
          onClick={onOpenEndGame}
          className="flex flex-col items-center justify-self-end gap-1.5 px-5 py-1 text-sm font-medium text-muted transition-colors hover:text-danger"
        >
          <FlagIcon className="size-6" />
          Terminar
        </button>
      </div>
    </nav>
  );
}
