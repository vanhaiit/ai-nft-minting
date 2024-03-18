"use client";

import React from "react";
import { twJoin } from "tailwind-merge";
import { ImageAssets } from "../../../../../public";

import Image from "next/image";
import AccountButton from "./AccountButton";
import DesktopNavigation from "./DesktopNavigation";
import ConnectWalletButton from "./ConnectWalletButton";

const MainLayoutHeader = () => {
  const isConnected = true;

  return (
    <div
      className={twJoin(
        "h-20 w-full",
        "fixed z-10 top-0 border-b",
        "text-roboto_mono"
      )}
    >
      <div
        className={twJoin(
          "w-full h-full lg:max-w-[1300px] mx-auto",
          "space-between-root"
        )}
      >
        <Image src={ImageAssets.LogoImage} alt="" />
        <DesktopNavigation />
        {isConnected ? <AccountButton /> : <ConnectWalletButton />}
      </div>
    </div>
  );
};

export default MainLayoutHeader;
