"use client";

import { ConfirmModal } from "@/components/ui";

export interface ConfirmEndGameModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmEndGameModal({
  open,
  onClose,
  onConfirm,
}: ConfirmEndGameModalProps) {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Terminar partida"
      message="¿Seguro que quieres terminar la partida? Se mostrará la clasificación final y no podrás seguir jugando."
      confirmLabel="Terminar"
    />
  );
}
