"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useAppDispatch } from "@/store/hooks";
import { adjustScore } from "@/store/slices/gameSlice";
import { SCORE_PRESETS, type Player } from "@/features/game/types";

export interface PlayerScoreCardProps {
  player: Player;
}

export function PlayerScoreCard({ player }: PlayerScoreCardProps) {
  const dispatch = useAppDispatch();
  const [customAmount, setCustomAmount] = useState("");
  const customValue = Number(customAmount) || 0;

  const applyDelta = (amount: number) => {
    if (amount === 0) return;
    dispatch(adjustScore({ id: player.id, amount }));
  };

  const applyCustomDelta = (sign: 1 | -1) => {
    if (!customValue) return;
    dispatch(adjustScore({ id: player.id, amount: sign * customValue }));
    setCustomAmount("");
  };

  return (
    <Card className="flex flex-col items-center gap-5 rounded-3xl border-white/10 bg-gradient-to-br from-primary/[0.09] via-white/[0.03] to-primary-2/[0.08] p-6 text-center">
      <span className="text-lg font-semibold text-foreground">
        {player.name}
      </span>

      <span className="bg-gradient-to-br from-primary via-primary-2 to-primary-3 bg-clip-text text-7xl font-extrabold tabular-nums leading-none text-transparent">
        {player.score}
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
    </Card>
  );
}
