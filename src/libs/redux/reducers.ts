import { combineReducers } from "redux";
import { baseQueryApi } from "./baseQueryApi";
import { appStateReducer } from "@/stores/app";
import { collectionStateReducer } from "@/stores/collection";

const appReducer = combineReducers({
  collection: collectionStateReducer,
  app: appStateReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) =>
  appReducer(state, action);
