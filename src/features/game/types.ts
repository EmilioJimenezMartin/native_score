export interface Player {
  id: string;
  name: string;
  score: number;
}

export type GameStatus = "setup" | "playing";

export interface GameState {
  status: GameStatus;
  players: Player[];
  hasHydrated: boolean;
}

export const MIN_PLAYERS_TO_START = 2;
export const SCORE_PRESETS = [-10, -5, 5, 10] as const;
