"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Modal, ModalHeader, useToast } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPlayer } from "@/store/slices/gameSlice";
import { isDuplicatePlayerName, selectPlayers } from "@/features/game/selectors";

export interface AddPlayerModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddPlayerModal({ open, onClose }: AddPlayerModalProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const players = useAppSelector(selectPlayers);
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    if (isDuplicatePlayerName(players, trimmed)) {
      showToast(`Ya hay un jugador llamado "${trimmed}"`);
      return;
    }
    dispatch(addPlayer(trimmed));
    setName("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title="Añadir jugador" onClose={onClose} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre"
          placeholder="Nombre del jugador"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <Button type="submit" fullWidth disabled={!name.trim()}>
          Añadir
        </Button>
      </form>
    </Modal>
  );
}
