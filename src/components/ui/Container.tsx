import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-md px-4 sm:max-w-2xl", className)}
      {...props}
    />
  );
}
