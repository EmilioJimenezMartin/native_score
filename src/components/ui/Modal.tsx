"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/useIsClient";
import { cn } from "@/lib/utils/cn";
import { XIcon } from "./icons";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  const isClient = useIsClient();
  // Tracks whether this modal has ever been opened, adjusted directly during
  // render (React's sanctioned "derive state from a prop change" pattern —
  // see react.dev/learn/you-might-not-need-an-effect) so the very first
  // mount never plays the exit animation for a modal that was never shown.
  const [prevOpen, setPrevOpen] = useState(open);
  const [hasOpened, setHasOpened] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setHasOpened(true);
  }

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md",
        "transition-opacity ease-out",
        open
          ? "duration-300 opacity-100"
          : "pointer-events-none duration-200 opacity-0",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full max-w-sm rounded-[1.75rem] bg-gradient-to-br from-primary/60 via-primary-2/40 to-primary-3/40 p-px",
          "shadow-[0_0_70px_-12px_rgba(6,182,212,0.55)]",
          open && "animate-modal-in",
          !open && hasOpened && "animate-modal-out",
          !open && !hasOpened && "opacity-0",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "rounded-[calc(1.75rem-1px)] bg-surface-elevated/95 p-6 backdrop-blur-2xl",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
      >
        <XIcon className="size-4" />
      </button>
    </div>
  );
}
