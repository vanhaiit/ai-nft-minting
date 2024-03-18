import { appStateReducer } from "@app/_stores/app";
import { betReducer } from "@app/_stores/bets";
import { warningAlertReducer } from "@app/_stores/notification";
import { userReducer } from "@app/_stores/user";
import { liveStreamReducer } from "@app/_stores/video";
import { myWalletReducer } from "@app/_stores/wallet";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseQueryApi } from "./baseQueryApi";

const appReducer = combineReducers({
  user: persistReducer(
    {
      key: "user",
      storage: storage,
    },
    userReducer,
  ),
  liveStream: liveStreamReducer,
  bet: persistReducer(
    {
      key: "bet",
      whitelist: ["bets"],
      storage: storage,
    },
    betReducer,
  ),
  myWallet: myWalletReducer,
  warningAlert: warningAlertReducer,
  app: appStateReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) => appReducer(state, action);
