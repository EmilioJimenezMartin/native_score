import type { RootState } from "@/store/store";
import type { Player, SortMode } from "./types";
import { MIN_PLAYERS_TO_START } from "./types";

export const selectGameStatus = (state: RootState) => state.game.status;
export const selectPlayers = (state: RootState) => state.game.players;
export const selectHasHydrated = (state: RootState) => state.game.hasHydrated;
export const selectCanStartGame = (state: RootState) =>
  state.game.players.length >= MIN_PLAYERS_TO_START;

export function rankPlayers(players: Player[]): Player[] {
  return [...players].sort((a, b) => b.score - a.score);
}

export function isDuplicatePlayerName(players: Player[], name: string): boolean {
  const normalized = name.trim().toLowerCase();
  return players.some((player) => player.name.toLowerCase() === normalized);
}

/** "default" is insertion order, i.e. `players` as stored — never reordered. */
export function getDisplayedPlayers(
  players: Player[],
  search: string,
  sortMode: SortMode,
): Player[] {
  const query = search.trim().toLowerCase();
  const filtered = query
    ? players.filter((player) => player.name.toLowerCase().includes(query))
    : players;

  switch (sortMode) {
    case "score-desc":
      return [...filtered].sort((a, b) => b.score - a.score);
    case "score-asc":
      return [...filtered].sort((a, b) => a.score - b.score);
    case "alphabetical":
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es"));
    default:
      return filtered;
  }
}
