"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { endGame } from "@/store/slices/gameSlice";
import { rankPlayers, selectPlayers } from "@/features/game/selectors";
import type { Player } from "@/features/game/types";
import { BottomActionBar } from "./BottomActionBar";
import { PlayerScoreCard } from "./PlayerScoreCard";
import { LeaderboardModal } from "./modals/LeaderboardModal";
import { AddPlayerModal } from "./modals/AddPlayerModal";
import { ConfirmEndGameModal } from "./modals/ConfirmEndGameModal";

type OpenModal = "leaderboard" | "addPlayer" | "confirmEnd" | null;

export interface GameScreenProps {
  onGameEnd: (standings: Player[]) => void;
}

export function GameScreen({ onGameEnd }: GameScreenProps) {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayers);
  const [openModal, setOpenModal] = useState<OpenModal>(null);

  const handleConfirmEnd = () => {
    onGameEnd(rankPlayers(players));
    dispatch(endGame());
    setOpenModal(null);
  };

  return (
    <>
      <main className="flex flex-1 flex-col pb-28 pt-6">
        <Container className="flex flex-col gap-4">
          {players.map((player) => (
            <PlayerScoreCard key={player.id} player={player} />
          ))}
        </Container>
      </main>

      <BottomActionBar
        onOpenLeaderboard={() => setOpenModal("leaderboard")}
        onOpenAddPlayer={() => setOpenModal("addPlayer")}
        onOpenEndGame={() => setOpenModal("confirmEnd")}
      />

      <LeaderboardModal
        open={openModal === "leaderboard"}
        onClose={() => setOpenModal(null)}
        players={rankPlayers(players)}
      />
      <AddPlayerModal
        open={openModal === "addPlayer"}
        onClose={() => setOpenModal(null)}
      />
      <ConfirmEndGameModal
        open={openModal === "confirmEnd"}
        onClose={() => setOpenModal(null)}
        onConfirm={handleConfirmEnd}
      />
    </>
  );
}
