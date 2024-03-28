/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { ART_GALLERY, MY_GENERATE_NFTS } from "@/constants";
import { ABI_TOKEN_ATQ } from "@/data";
import { formatAddress } from "@/helpers";
import { useAppDispatch } from "@/libs/redux/store";
import { setAtqBalance } from "@/stores/app";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect } from "react";
import { twJoin } from "tailwind-merge";
import { useAccount, useDisconnect } from "wagmi";
import Web3 from "web3";
import CommonButton from "../../CommonButton";
import CommonDropdown from "../../CommonDropdown";
import { useRouter } from "next/navigation";

const ConnectWalletButton = (props: any) => {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (account.address) {
          const provider = new Web3(process.env.NEXT_PUBLIC_TOKEN_AQT_RPC);
          const contract = new provider.eth.Contract(
            ABI_TOKEN_ATQ,
            process.env.NEXT_PUBLIC_TOKEN_AQT_ADDRESS!
          );
          const balance = await contract?.methods
            ?.balanceOf(account.address.toString())
            .call();
          dispatch(setAtqBalance(Number(balance) / 10 ** 18));
        }
      } catch (error) {
        console.log("🚀 ~ file: ConnectWallet.tsx:35 ~ error:", error);
      }
    })();
  }, [account?.address]);

  useEffect(() => {
    (async () => {
      if (account.chainId !== 97) {
        disconnect();
        router.replace("/");
      }
    })();
  }, [account?.chainId]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <CommonButton
                    onClick={openConnectModal}
                    {...props}
                    isShowArrow={false}
                  >
                    Connect
                  </CommonButton>
                );
              }

              return (
                <CommonDropdown
                  contentDropdown={
                    <>
                      <Link
                        href={MY_GENERATE_NFTS}
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
                    Connected {formatAddress(account.displayName!)}
                  </div>
                </CommonDropdown>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
