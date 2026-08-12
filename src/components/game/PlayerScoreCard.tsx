"use client";

import { useState } from "react";
import { Card, ClockIcon, PencilIcon, TrashIcon, XIcon } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useAppDispatch } from "@/store/hooks";
import { adjustScore, adjustStrikes } from "@/store/slices/gameSlice";
import { SCORE_PRESETS, type Player } from "@/features/game/types";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { PlayerHistoryModal } from "./modals/PlayerHistoryModal";
import { EditPlayerNameModal } from "./modals/EditPlayerNameModal";

const MAX_VISIBLE_STRIKES = 5;

export interface PlayerScoreCardProps {
  player: Player;
  onRequestRemove: () => void;
}

export function PlayerScoreCard({ player, onRequestRemove }: PlayerScoreCardProps) {
  const dispatch = useAppDispatch();
  const [customAmount, setCustomAmount] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const customValue = Number(customAmount) || 0;
  const animatedScore = useAnimatedNumber(player.score);

  const applyDelta = (amount: number) => {
    if (amount === 0) return;
    dispatch(adjustScore({ id: player.id, amount }));
  };

  const applyCustomDelta = (sign: 1 | -1) => {
    if (!customValue) return;
    dispatch(adjustScore({ id: player.id, amount: sign * customValue }));
    setCustomAmount("");
  };

  const applyStrikeDelta = (amount: number) => {
    dispatch(adjustStrikes({ id: player.id, amount }));
  };

  return (
    <Card className="relative flex flex-col items-center gap-5 rounded-3xl border-white/10 bg-gradient-to-br from-primary/[0.09] via-white/[0.03] to-primary-2/[0.08] p-6 text-center">
      <button
        type="button"
        onClick={() => setShowHistory(true)}
        aria-label={`Ver historial de ${player.name}`}
        className="absolute left-3 top-3 flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-primary-2 shadow-sm transition-all hover:bg-primary-2/15 active:scale-90"
      >
        <ClockIcon className="size-5" />
      </button>

      <button
        type="button"
        onClick={onRequestRemove}
        aria-label={`Eliminar a ${player.name} de la partida`}
        className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-danger shadow-sm transition-all hover:bg-danger/15 active:scale-90"
      >
        <TrashIcon className="size-5" />
      </button>

      <button
        type="button"
        onClick={() => setShowEditName(true)}
        aria-label={`Editar nombre de ${player.name}`}
        className="flex items-center gap-1.5 rounded-full px-2 py-1 text-lg font-semibold text-foreground transition-colors hover:bg-white/10"
      >
        {player.name}
        <PencilIcon className="size-3.5 text-muted" />
      </button>

      <span className="bg-gradient-to-br from-primary via-primary-2 to-primary-3 bg-clip-text text-7xl font-extrabold tabular-nums leading-none text-transparent">
        {animatedScore}
      </span>

      <div className="grid w-full grid-cols-4 gap-2">
        {SCORE_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => applyDelta(preset)}
            className={cn(
              "h-11 rounded-full text-sm font-bold transition-all active:scale-95",
              preset > 0
                ? "bg-gradient-to-br from-primary/25 to-primary-2/25 text-primary-2 hover:from-primary/35 hover:to-primary-2/35"
                : "bg-white/[0.06] text-danger/90 hover:bg-danger/15",
            )}
          >
            {preset > 0 ? `+${preset}` : preset}
          </button>
        ))}
      </div>

      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          disabled={!customValue}
          onClick={() => applyCustomDelta(-1)}
          aria-label="Restar cantidad"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-2xl font-semibold text-foreground transition-all active:scale-90 disabled:opacity-30"
        >
          −
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={customAmount}
          onChange={(event) =>
            setCustomAmount(event.target.value.replace(/[^0-9]/g, ""))
          }
          placeholder="Cantidad"
          aria-label="Cantidad personalizada"
          className="h-14 w-full rounded-2xl border border-white/15 bg-white/[0.07] px-4 text-center text-lg font-semibold text-foreground shadow-inner shadow-black/20 placeholder:text-muted/60 placeholder:font-normal focus-visible:outline-none focus-visible:border-primary-2/60 focus-visible:ring-4 focus-visible:ring-primary-2/20"
        />
        <button
          type="button"
          disabled={!customValue}
          onClick={() => applyCustomDelta(1)}
          aria-label="Sumar cantidad"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2 text-2xl font-semibold text-primary-foreground shadow-md shadow-primary-2/30 transition-all active:scale-90 disabled:opacity-30 disabled:shadow-none"
        >
          +
        </button>
      </div>

      <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted">Strikes</span>
          <div className="flex items-center gap-0.5">
            {player.strikes === 0 ? (
              <span className="text-sm text-muted/60">0</span>
            ) : (
              <>
                {Array.from({ length: Math.min(player.strikes, MAX_VISIBLE_STRIKES) }).map(
                  (_, index) => (
                    <XIcon key={index} className="size-3.5 text-danger" />
                  ),
                )}
                {player.strikes > MAX_VISIBLE_STRIKES && (
                  <span className="ml-0.5 text-xs font-semibold text-danger">
                    +{player.strikes - MAX_VISIBLE_STRIKES}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => applyStrikeDelta(-1)}
            disabled={player.strikes === 0}
            aria-label={`Quitar strike a ${player.name}`}
            className="flex size-8 items-center justify-center rounded-full bg-white/[0.06] text-base font-semibold text-foreground transition-all active:scale-90 disabled:opacity-30"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => applyStrikeDelta(1)}
            aria-label={`Añadir strike a ${player.name}`}
            className="flex size-8 items-center justify-center rounded-full bg-danger/20 text-base font-semibold text-danger transition-all active:scale-90 hover:bg-danger/30"
          >
            +
          </button>
        </div>
      </div>

      <PlayerHistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        player={player}
      />
      <EditPlayerNameModal
        open={showEditName}
        onClose={() => setShowEditName(false)}
        player={player}
      />
    </Card>
  );
}
