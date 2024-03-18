import { Runner, VenueInfo } from "@app/_stores/bets/types";
import { EGameType } from "@constants";
import { BetType } from "@constants/bet";

export enum BetSlipSource {
  Home,
  Race_Detail,
}

export enum LoginType {
  USERNAME_PASSWORD = "username_password",
  GOOGLE = "google",
  TELEGRAM = "telegram",
  METAMASK = "metamask",
}

export interface BetSlip extends Runner {
  stake: string;
  venue: VenueInfo;
  gameType: EGameType;
  openDate: string | Date;
  distance: string;
  gameId: string | number;
  uuid: string;
  odd: number;
  betType: BetType;
  rules: string;
  source: BetSlipSource;
}
