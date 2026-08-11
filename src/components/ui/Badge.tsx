import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const VARIANT_CLASSES = {
  neutral: "bg-surface-elevated text-foreground border border-border",
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  danger: "bg-danger/15 text-danger",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof VARIANT_CLASSES;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
