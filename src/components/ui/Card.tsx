import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-gradient-to-br from-primary/[0.07] via-white/[0.03] to-primary-2/[0.06] p-4 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
