import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BetState = {
  atqBalance: number;
  allCollection: string[];
};

const initialState: BetState = {
  atqBalance: 0,
  allCollection: [],
};

// slice
export const appSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setAtqBalance: (state, actions: PayloadAction<number>) => {
      state.atqBalance = actions.payload;
    },
    setAllCollection: (state, actions: PayloadAction<string[]>) => {
      state.allCollection = actions.payload;
    },
  },
});

// actions
export const { setAtqBalance } = appSlice.actions;

// reducer
export const collectionStateReducer = appSlice.reducer;
