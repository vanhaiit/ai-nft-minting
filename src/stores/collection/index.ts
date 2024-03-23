import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BetState = {
  atqBalance: number;
};

const initialState: BetState = {
  atqBalance: 0,
};

// slice
export const appSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setAtqBalance: (state, actions: PayloadAction<number>) => {
      state.atqBalance = actions.payload;
    },
  },
});

// actions
export const { setAtqBalance } = appSlice.actions;

// reducer
export const collectionStateReducer = appSlice.reducer;
