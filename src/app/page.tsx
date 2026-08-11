"use client";

import { useState } from "react";
import { GameScreen } from "@/components/game/GameScreen";
import { PlayerSetupScreen } from "@/components/game/PlayerSetupScreen";
import { FinalResultsModal } from "@/components/game/modals/FinalResultsModal";
import { useAppSelector } from "@/store/hooks";
import { selectGameStatus } from "@/features/game/selectors";
import type { Player } from "@/features/game/types";

export default function Home() {
  const status = useAppSelector(selectGameStatus);
  const [finalStandings, setFinalStandings] = useState<Player[] | null>(null);

  return (
    <>
      {status === "playing" ? (
        <GameScreen onGameEnd={setFinalStandings} />
      ) : (
        <PlayerSetupScreen />
      )}

      <FinalResultsModal
        open={finalStandings !== null}
        standings={finalStandings ?? []}
        onRestart={() => setFinalStandings(null)}
      />
    </>
  );
}
