"use client";

import React from "react";
import { twJoin } from "tailwind-merge";
import CommonDropdown from "../../CommonDropdown";

const AccountButton = () => {
  return (
    <CommonDropdown
      contentDropdown={
        <>
          <button
            className={twJoin(
              "py-2",
              "w-full",
              "border-b border-neutral3",
              "text-neutral1 text-center hover:text-primary1"
            )}
          >
            My AI-generated NFTs
          </button>
          <button className="w-full py-2 text-center hover:text-primary1">
            Sign-out
          </button>
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
