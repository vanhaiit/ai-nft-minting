// Project: 50a7e53e0086b973575ca358e92615e30f5d32624892b1d54a66a51d1c82d8df
import { RootState } from "@/libs/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const getAtpBalance = createSelector(
  [(state: RootState) => state.app],
  ({ atqBalance }) => atqBalance
);
