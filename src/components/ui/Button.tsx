"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const VARIANT_CLASSES = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "bg-surface-elevated text-foreground hover:bg-surface-elevated/80 border border-border",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-surface",
  ghost: "bg-transparent text-foreground hover:bg-surface",
  danger: "bg-danger text-danger-foreground hover:bg-danger/90",
} as const;

const SIZE_CLASSES = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-base",
  lg: "h-12 px-5 text-base",
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
          "inline-flex items-center justify-center gap-2 rounded-md font-medium",
          "transition-colors active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
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
