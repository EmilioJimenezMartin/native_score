"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Modal, ModalHeader, useToast } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { renamePlayer } from "@/store/slices/gameSlice";
import { isDuplicatePlayerName, selectPlayers } from "@/features/game/selectors";
import type { Player } from "@/features/game/types";

export interface EditPlayerNameModalProps {
  open: boolean;
  onClose: () => void;
  player: Player | null;
}

export function EditPlayerNameModal({ open, onClose, player }: EditPlayerNameModalProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const players = useAppSelector(selectPlayers);

  // Re-seeds the input with the current player's name each time the modal
  // opens, adjusted during render (see Modal.tsx) rather than in an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  const [name, setName] = useState(player?.name ?? "");
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && player) setName(player.name);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!player) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    if (isDuplicatePlayerName(players, trimmed, player.id)) {
      showToast(`Ya hay un jugador llamado "${trimmed}"`);
      return;
    }
    dispatch(renamePlayer({ id: player.id, name: trimmed }));
    showToast(`Nombre actualizado a "${trimmed}"`, "success");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title="Editar nombre" onClose={onClose} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre"
          placeholder="Nombre del jugador"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoFocus
        />
        <Button type="submit" fullWidth disabled={!name.trim()}>
          Guardar
        </Button>
      </form>
    </Modal>
  );
}
