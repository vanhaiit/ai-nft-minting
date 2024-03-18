import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BetState = {
  inOpenPageTime: boolean;
  openMobileSide: boolean;
  openLiveChat: boolean;
};

const initialState: BetState = {
  inOpenPageTime: true,
  openMobileSide: false,
  openLiveChat: false,
};

// slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOpenMobileSidebar: (state, actions: PayloadAction<boolean>) => {
      state.openMobileSide = actions.payload;
    },
    setInOpenPageTime: (state, actions: PayloadAction<boolean>) => {
      state.inOpenPageTime = actions.payload;
    },
    setOpenLiveChat: (state, actions: PayloadAction<boolean>) => {
      state.openLiveChat = actions.payload;
    },
  },
});

// actions
export const { setOpenMobileSidebar, setOpenLiveChat, setInOpenPageTime } =
  appSlice.actions;

// reducer
export const appStateReducer = appSlice.reducer;
