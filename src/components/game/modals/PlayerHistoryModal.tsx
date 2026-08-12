"use client";

import { useState } from "react";
import { Modal, ModalHeader } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { Player } from "@/features/game/types";

export interface PlayerHistoryModalProps {
  open: boolean;
  onClose: () => void;
  player: Player | null;
}

type SortOrder = "newest" | "oldest";

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function PlayerHistoryModal({ open, onClose, player }: PlayerHistoryModalProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const history = player
    ? sortOrder === "newest"
      ? [...player.history].reverse()
      : player.history
    : [];

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title={player ? `Historial de ${player.name}` : "Historial"} onClose={onClose} />

      {history.length > 0 && (
        <div className="mb-4 flex gap-1 rounded-full bg-white/[0.04] p-1">
          {(
            [
              ["newest", "Más reciente"],
              ["oldest", "Más antiguo"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setSortOrder(value)}
              className={cn(
                "flex-1 rounded-full py-1.5 text-sm font-semibold transition-colors",
                sortOrder === value
                  ? "bg-gradient-to-r from-primary via-primary-2 to-primary-3 text-primary-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {history.length === 0 ? (
        <p className="text-muted">Todavía no hay movimientos.</p>
      ) : (
        <ol className="flex max-h-80 flex-col gap-2 overflow-y-auto">
          {history.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-4 py-3"
            >
              <span
                className={cn(
                  "text-base font-bold tabular-nums",
                  entry.amount > 0 ? "text-primary-2" : "text-danger",
                )}
              >
                {entry.amount > 0 ? `+${entry.amount}` : entry.amount}
              </span>
              <span className="text-sm text-muted">{formatTime(entry.timestamp)}</span>
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {entry.total}
              </span>
            </li>
          ))}
        </ol>
      )}
    </Modal>
  );
}
