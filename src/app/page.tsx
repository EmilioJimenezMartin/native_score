"use client";

import { useState } from "react";
import { GameScreen } from "@/components/game/GameScreen";
import { PlayerSetupScreen } from "@/components/game/PlayerSetupScreen";
import { FinalResultsModal } from "@/components/game/modals/FinalResultsModal";
import { InstallMenuButton } from "@/components/pwa/InstallMenuButton";
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

      {/* Fixed at the page level (not inside either screen) so it stays put
          across setup <-> game transitions instead of vanishing mid-game. */}
      <InstallMenuButton />

      <FinalResultsModal
        open={finalStandings !== null}
        standings={finalStandings ?? []}
        onRestart={() => setFinalStandings(null)}
      />
    </>
  );
}
