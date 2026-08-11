"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Button,
  Card,
  ConfirmModal,
  Container,
  PlusIcon,
  TrashIcon,
  useToast,
} from "@/components/ui";
import { InstallBanner } from "@/components/pwa/InstallBanner";
import { cn } from "@/lib/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPlayer, removePlayer, startGame } from "@/store/slices/gameSlice";
import {
  isDuplicatePlayerName,
  selectCanStartGame,
  selectPlayers,
} from "@/features/game/selectors";
import { MIN_PLAYERS_TO_START, type Player } from "@/features/game/types";

const AVATAR_GRADIENTS = [
  "from-primary to-primary-2",
  "from-primary-2 to-primary-3",
  "from-primary-3 to-emerald-400",
  "from-emerald-400 to-primary",
];

export function PlayerSetupScreen() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const players = useAppSelector(selectPlayers);
  const canStart = useAppSelector(selectCanStartGame);
  const [name, setName] = useState("");
  const [pendingRemoval, setPendingRemoval] = useState<Player | null>(null);

  const handleAddPlayer = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    if (isDuplicatePlayerName(players, trimmed)) {
      showToast(`Ya hay un jugador llamado "${trimmed}"`);
      return;
    }
    dispatch(addPlayer(trimmed));
    setName("");
  };

  const handleConfirmRemoval = () => {
    if (!pendingRemoval) return;
    dispatch(removePlayer(pendingRemoval.id));
    setPendingRemoval(null);
  };

  return (
    <main className="flex flex-1 flex-col gap-8 py-10">
      <Container className="flex flex-col gap-8">
        <header className="flex flex-col gap-1.5">
          <h1 className="bg-gradient-to-r from-primary via-primary-2 to-primary-3 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            EMI - Score
          </h1>
          <p className="text-muted">
            Añade a los jugadores para empezar la partida
          </p>
        </header>

        <InstallBanner />

        <form
          onSubmit={handleAddPlayer}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] py-2 pl-6 pr-2 shadow-inner shadow-black/20 backdrop-blur-xl transition-colors focus-within:border-primary-2/50 focus-within:ring-4 focus-within:ring-primary-2/15"
        >
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre del jugador"
            aria-label="Nombre del jugador"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="h-12 flex-1 bg-transparent text-lg text-foreground placeholder:text-muted/60 focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            aria-label="Añadir jugador"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary-2 to-primary-3 text-primary-foreground shadow-lg shadow-primary-2/40 transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none"
          >
            <PlusIcon className="size-5" />
          </button>
        </form>

        {players.length > 0 && (
          <ul className="flex flex-col gap-3">
            {players.map((player, index) => (
              <li key={player.id}>
                <Card className="flex items-center gap-3 rounded-2xl py-3">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-primary-foreground",
                      AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
                    )}
                  >
                    {player.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="flex-1 text-base font-medium text-foreground">
                    {player.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPendingRemoval(player)}
                    aria-label={`Eliminar a ${player.name}`}
                    className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-danger/15 hover:text-danger"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Container>

      <Container className="mt-auto">
        <Button
          size="lg"
          fullWidth
          disabled={!canStart}
          onClick={() => dispatch(startGame())}
        >
          {canStart
            ? "Empezar partida"
            : `Añade al menos ${MIN_PLAYERS_TO_START} jugadores`}
        </Button>
      </Container>

      <ConfirmModal
        open={pendingRemoval !== null}
        onClose={() => setPendingRemoval(null)}
        onConfirm={handleConfirmRemoval}
        title="Eliminar jugador"
        message={
          pendingRemoval
            ? `¿Seguro que quieres eliminar a ${pendingRemoval.name}?`
            : ""
        }
        confirmLabel="Eliminar"
      />
    </main>
  );
}
