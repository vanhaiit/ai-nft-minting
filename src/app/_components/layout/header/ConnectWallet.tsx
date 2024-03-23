"use client";
import React, { useEffect } from "react";
import CommonButton from "../../CommonButton";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import CommonDropdown from "../../CommonDropdown";
import { injected } from "wagmi/connectors";
import { twJoin } from "tailwind-merge";
import { formatAddress } from "@/helpers";
import get from "lodash/get";
import Link from "next/link";
import { GENERATE } from "@/constants";
import Web3 from "web3";
import abi from "@/data/AQT_ABI.json";

const ConnectWalletButton = (props: any) => {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  useEffect(() => {
    (async () => {
      try {
        if (account.address) {
          const provider = new Web3(process.env.NEXT_PUBLIC_TOKEN_AQT_RPC);
          const contract = new provider.eth.Contract(
            abi,
            process.env.NEXT_PUBLIC_TOKEN_AQT_ADDRESS!
          );
          const balance = await contract?.methods
            ?.balanceOf(account.address.toString())
            .call();
          console.log("BALANCE", Number(balance) / 10 ** 18);
        }
      } catch (error) {
        console.log("🚀 ~ file: ConnectWallet.tsx:35 ~ error:", error);
      }
    })();
  }, [account.address]);

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
          <Link
            href={GENERATE}
            className={twJoin(
              "py-2",
              "w-full",
              "border-b border-neutral3",
              "text-neutral1 text-center"
            )}
          >
            My AI-generated NFTs
          </Link>
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
