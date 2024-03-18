import { combineReducers } from "redux";
import { baseQueryApi } from "./baseQueryApi";
import { appStateReducer } from "@/stores/app";

const appReducer = combineReducers({
  app: appStateReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) =>
  appReducer(state, action);
