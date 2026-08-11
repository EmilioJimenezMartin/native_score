"use client";

import { useState } from "react";
import { ConfirmModal, Container } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { endGame, removePlayer } from "@/store/slices/gameSlice";
import { getDisplayedPlayers, rankPlayers, selectPlayers } from "@/features/game/selectors";
import type { Player, SortMode } from "@/features/game/types";
import { BottomActionBar } from "./BottomActionBar";
import { PlayerListControls } from "./PlayerListControls";
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
  const [pendingRemoval, setPendingRemoval] = useState<Player | null>(null);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("default");

  const displayedPlayers = getDisplayedPlayers(players, search, sortMode);

  const handleConfirmEnd = () => {
    onGameEnd(rankPlayers(players));
    dispatch(endGame());
    setOpenModal(null);
  };

  const handleConfirmRemoval = () => {
    if (!pendingRemoval) return;
    const willBeEmpty = players.length <= 1;
    setPendingRemoval(null);
    // Removing the last remaining player leaves nothing to play with, so the
    // game ends the same way "Terminar partida" would, straight back to setup.
    if (willBeEmpty) {
      dispatch(endGame());
    } else {
      dispatch(removePlayer(pendingRemoval.id));
    }
  };

  return (
    <>
      <main className="flex flex-1 flex-col pb-28 pt-20">
        <Container className="flex flex-col gap-4">
          {players.length > 1 && (
            <PlayerListControls
              search={search}
              onSearchChange={setSearch}
              sortMode={sortMode}
              onSortModeChange={setSortMode}
            />
          )}

          {displayedPlayers.length === 0 ? (
            <p className="py-10 text-center text-muted">
              No se encontró ningún jugador con ese nombre.
            </p>
          ) : (
            displayedPlayers.map((player) => (
              <PlayerScoreCard
                key={player.id}
                player={player}
                onRequestRemove={() => setPendingRemoval(player)}
              />
            ))
          )}
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

      <ConfirmModal
        open={pendingRemoval !== null}
        onClose={() => setPendingRemoval(null)}
        onConfirm={handleConfirmRemoval}
        title="Eliminar jugador"
        message={
          pendingRemoval
            ? `¿Seguro que quieres eliminar a ${pendingRemoval.name} de la partida?`
            : ""
        }
        confirmLabel="Eliminar"
      />
    </>
  );
}
