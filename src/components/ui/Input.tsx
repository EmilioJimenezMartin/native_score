"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-14 w-full rounded-2xl border border-white/15 bg-white/[0.07] px-4 text-lg text-foreground shadow-inner shadow-black/20",
            "placeholder:text-muted/60",
            "transition-shadow duration-150",
            "focus-visible:outline-none focus-visible:border-primary-2/60 focus-visible:ring-4 focus-visible:ring-primary-2/20",
            "disabled:pointer-events-none disabled:opacity-50",
            error &&
              "border-danger/60 focus-visible:border-danger focus-visible:ring-danger/20",
            className,
          )}
          {...props}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
