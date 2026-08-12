"use client";

import { SearchIcon, XIcon } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { SortMode } from "@/features/game/types";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "Por defecto" },
  { value: "score-desc", label: "Mayor puntuación" },
  { value: "score-asc", label: "Menor puntuación" },
  { value: "alphabetical", label: "Nombre A-Z" },
];

export interface PlayerListControlsProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortMode: SortMode;
  onSortModeChange: (value: SortMode) => void;
}

export function PlayerListControls({
  search,
  onSearchChange,
  sortMode,
  onSortModeChange,
}: PlayerListControlsProps) {
  const hasActiveFilters = search.trim() !== "" || sortMode !== "default";

  const clearFilters = () => {
    onSearchChange("");
    onSortModeChange("default");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar jugador..."
          aria-label="Buscar jugador"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="h-11 w-full rounded-full border border-white/10 bg-white/[0.06] pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:border-primary-2/50 focus-visible:ring-4 focus-visible:ring-primary-2/15"
        />
      </div>

      {/* Negates the parent Container's px-4 so the row scrolls edge-to-edge
          instead of stopping at the page padding, then reapplies the same
          padding to itself so the resting position looks unchanged. */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1">
        <div className="flex w-max items-center gap-2">
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSortModeChange(value)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                sortMode === value
                  ? "bg-gradient-to-r from-primary via-primary-2 to-primary-3 text-primary-foreground"
                  : "bg-white/[0.06] text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold text-danger/90 transition-colors hover:bg-danger/15"
            >
              <XIcon className="size-3.5" />
              Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
