import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameState, Player } from "@/features/game/types";

const MAX_HISTORY_ENTRIES = 100;

const initialState: GameState = {
  status: "setup",
  players: [],
  hasHydrated: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    hydrate: (_state, action: PayloadAction<GameState | undefined>) => {
      const payload = action.payload ?? initialState;
      return {
        ...payload,
        // Defends against state persisted by an older build that didn't
        // track per-player history yet.
        players: payload.players.map((player) => ({
          ...player,
          history: player.history ?? [],
        })),
        hasHydrated: true,
      };
    },
    addPlayer: {
      reducer: (state, action: PayloadAction<Player>) => {
        state.players.push(action.payload);
      },
      prepare: (name: string) => ({
        payload: { id: nanoid(), name: name.trim(), score: 0, history: [] } satisfies Player,
      }),
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((player) => player.id !== action.payload);
    },
    startGame: (state) => {
      if (state.players.length >= 2) state.status = "playing";
    },
    adjustScore: {
      reducer: (
        state,
        action: PayloadAction<{ id: string; amount: number; entryId: string; timestamp: number }>,
      ) => {
        const player = state.players.find((p) => p.id === action.payload.id);
        if (!player) return;

        player.score += action.payload.amount;
        player.history.push({
          id: action.payload.entryId,
          amount: action.payload.amount,
          total: player.score,
          timestamp: action.payload.timestamp,
        });
        if (player.history.length > MAX_HISTORY_ENTRIES) {
          player.history.splice(0, player.history.length - MAX_HISTORY_ENTRIES);
        }
      },
      prepare: (payload: { id: string; amount: number }) => ({
        payload: { ...payload, entryId: nanoid(), timestamp: Date.now() },
      }),
    },
    endGame: () => ({ ...initialState, hasHydrated: true }),
  },
});

export const {
  hydrate,
  addPlayer,
  removePlayer,
  startGame,
  adjustScore,
  endGame,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
