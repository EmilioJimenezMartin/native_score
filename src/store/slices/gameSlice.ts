import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameState, Player } from "@/features/game/types";

const initialState: GameState = {
  status: "setup",
  players: [],
  hasHydrated: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    hydrate: (_state, action: PayloadAction<GameState | undefined>) => ({
      ...(action.payload ?? initialState),
      hasHydrated: true,
    }),
    addPlayer: {
      reducer: (state, action: PayloadAction<Player>) => {
        state.players.push(action.payload);
      },
      prepare: (name: string) => ({
        payload: { id: nanoid(), name: name.trim(), score: 0 } satisfies Player,
      }),
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((player) => player.id !== action.payload);
    },
    startGame: (state) => {
      if (state.players.length >= 2) state.status = "playing";
    },
    adjustScore: (
      state,
      action: PayloadAction<{ id: string; amount: number }>,
    ) => {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) player.score += action.payload.amount;
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
