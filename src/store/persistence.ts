import { storageService } from "@/services/storage.service";
import type { GameState } from "@/features/game/types";

const GAME_STORAGE_KEY = "native-score:game";

export function loadGameState(): GameState | undefined {
  return storageService.get<GameState | undefined>(GAME_STORAGE_KEY, undefined);
}

export function saveGameState(state: GameState): void {
  storageService.set(GAME_STORAGE_KEY, state);
}
