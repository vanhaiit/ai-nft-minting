"use client";

import React from "react";
import { twJoin } from "tailwind-merge";
import CommonDropdown from "../CommonDropdown";

const AccountButton = () => {
  return (
    <CommonDropdown
      contentDropdown={
        <>
          <p
            className={twJoin(
              "py-2",
              "w-full",
              "border-b border-neutral3",
              "text-neutral1 text-center"
            )}
          >
            My AI-generated NFTs
          </p>
          <p className="w-full py-2 text-center">Sign-out</p>
        </>
      }
    >
      <div
        className={twJoin(
          "px-4 py-2",
          "text-primary1",
          "bg-primary1/20",
          "border border-primary1"
        )}
      >
        Connected 0x13a1bcd...
      </div>
    </CommonDropdown>
  );
};

export default AccountButton;
