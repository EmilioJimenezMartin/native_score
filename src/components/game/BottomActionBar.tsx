"use client";

import { Container, FlagIcon, PlusIcon, TrophyIcon } from "@/components/ui";

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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-surface/80 backdrop-blur-xl"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <Container className="flex items-center justify-around py-3">
        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="flex flex-col items-center gap-1.5 px-4 py-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <TrophyIcon className="size-6" />
          Clasificación
        </button>

        <button
          type="button"
          onClick={onOpenAddPlayer}
          aria-label="Añadir jugador"
          className="-translate-y-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary-2 to-primary-3 text-primary-foreground shadow-lg shadow-primary-2/50 transition-transform active:scale-95"
        >
          <PlusIcon className="size-6" />
        </button>

        <button
          type="button"
          onClick={onOpenEndGame}
          className="flex flex-col items-center gap-1.5 px-4 py-1 text-sm font-medium text-muted transition-colors hover:text-danger"
        >
          <FlagIcon className="size-6" />
          Terminar
        </button>
      </Container>
    </nav>
  );
}
