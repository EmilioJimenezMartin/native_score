"use client";

import { Button, Modal, TrophyIcon } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { Player } from "@/features/game/types";
import { RankBadge } from "../RankBadge";

export interface FinalResultsModalProps {
  open: boolean;
  standings: Player[];
  onRestart: () => void;
}

export function FinalResultsModal({
  open,
  standings,
  onRestart,
}: FinalResultsModalProps) {
  const winner = standings[0];

  return (
    <Modal open={open} onClose={onRestart}>
      <div className="flex flex-col items-center gap-1 pb-2 text-center">
        <div className="relative mb-2">
          <span className="absolute inset-0 -z-10 scale-150 rounded-full bg-gradient-to-br from-primary via-primary-2 to-primary-3 opacity-40 blur-2xl" />
          <span
            className={cn(
              "flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary-2 to-primary-3 text-primary-foreground",
              open && "animate-glow-pulse",
            )}
          >
            <TrophyIcon className="size-9" />
          </span>
        </div>
        {winner && (
          <h2 className="bg-gradient-to-r from-primary via-primary-2 to-primary-3 bg-clip-text text-2xl font-extrabold text-transparent">
            ¡{winner.name} gana!
          </h2>
        )}
        <p className="text-muted">Clasificación final</p>
      </div>

      <ol className="mt-4 flex max-h-[45vh] flex-col gap-2 overflow-y-auto">
        {standings.map((player, index) => (
          <li
            key={player.id}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3",
              index === 0
                ? "border border-primary-2/40 bg-gradient-to-r from-primary/25 via-primary-2/15 to-transparent"
                : "bg-white/[0.04]",
            )}
          >
            <RankBadge rank={index + 1} />
            <span className="flex-1 text-foreground">{player.name}</span>
            <span className="text-lg font-bold tabular-nums text-foreground">
              {player.score}
            </span>
          </li>
        ))}
      </ol>

      <Button size="lg" fullWidth className="mt-6" onClick={onRestart}>
        Volver al principio
      </Button>
    </Modal>
  );
}
