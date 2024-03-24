import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BetState = {};

const initialState: BetState = {};

// slice
export const appSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {},
});

// actions
export const {} = appSlice.actions;

// reducer
export const collectionStateReducer = appSlice.reducer;
