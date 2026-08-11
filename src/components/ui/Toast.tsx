"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { XIcon } from "./icons";

export interface ToastProps {
  message: string;
  variant?: "error" | "success";
  leaving?: boolean;
  onClose: () => void;
}

export function Toast({ message, variant = "error", leaving = false, onClose }: ToastProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const visible = entered && !leaving;

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl backdrop-blur-xl",
        "transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0",
        variant === "error"
          ? "bg-gradient-to-r from-danger via-[#f43f5e] to-danger shadow-danger/40"
          : "bg-gradient-to-r from-primary via-primary-2 to-primary-3 shadow-primary-2/40",
      )}
    >
      <p className="flex-1 text-base font-semibold text-white">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar aviso"
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
      >
        <XIcon className="size-4" />
      </button>
    </div>
  );
}
