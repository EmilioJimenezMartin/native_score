"use client";

import { Modal, ModalHeader } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { Player } from "@/features/game/types";
import { RankBadge } from "../RankBadge";

export interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
  players: Player[];
}

export function LeaderboardModal({ open, onClose, players }: LeaderboardModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title="Clasificación" onClose={onClose} />
      {players.length === 0 ? (
        <p className="text-muted">Todavía no hay puntuaciones.</p>
      ) : (
        <ol className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto">
          {players.map((player, index) => (
            <li
              key={player.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3",
                index === 0
                  ? "border border-primary-2/40 bg-gradient-to-r from-primary/20 via-primary-2/15 to-transparent"
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
      )}
    </Modal>
  );
}
