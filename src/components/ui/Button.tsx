"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const VARIANT_CLASSES = {
  primary:
    "bg-gradient-to-r from-primary via-primary-2 to-primary-3 text-primary-foreground shadow-lg shadow-primary-2/40 hover:shadow-primary-2/60 hover:brightness-110",
  secondary:
    "bg-white/[0.06] text-foreground hover:bg-white/[0.1] border border-white/10",
  outline:
    "bg-transparent text-foreground border border-white/15 hover:bg-white/5",
  ghost: "bg-transparent text-foreground hover:bg-white/5",
  danger:
    "bg-gradient-to-r from-danger to-[#f43f5e] text-danger-foreground shadow-lg shadow-danger/30 hover:brightness-110",
} as const;

const SIZE_CLASSES = {
  sm: "h-10 px-3.5 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-14 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASSES;
export type ButtonSize = keyof typeof SIZE_CLASSES;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold",
          "transition-all duration-150 active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
