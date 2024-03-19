"use client";
import React from "react";
import CommonButton from "../../CommonButton";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import CommonDropdown from "../../CommonDropdown";
import { injected } from "wagmi/connectors";
import { twJoin } from "tailwind-merge";
import { formatAddress } from "@/helpers";
import get from "lodash/get";

const ConnectWalletButton = (props: any) => {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  if (!account?.isConnected)
    return (
      <CommonButton
        onClick={() => connect({ connector: injected() })}
        {...props}
        isShowArrow={false}
      >
        Connect
      </CommonButton>
    );
  return (
    <CommonDropdown
      contentDropdown={
        <>
          <button
            className={twJoin(
              "py-2",
              "w-full",
              "border-b border-neutral3",
              "text-neutral1 text-center"
            )}
          >
            My AI-generated NFTs
          </button>
          <button
            onClick={() => disconnect()}
            className="w-full py-2 text-center cursor-pointer"
          >
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
        Connected{" "}
        {get(account, "address", false) && formatAddress(account.address!)}
      </div>
    </CommonDropdown>
  );
};

export default ConnectWalletButton;
