"use client";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { WagmiProvider } from "wagmi";
import { bsc } from "wagmi/chains";

const queryClient = new QueryClient();

const _bsc = {
  ...bsc,
  id: 97,
  rpcUrls: {
    default: { http: ["https://bsc-testnet-rpc.publicnode.com"] },
  },
};
export const config = getDefaultConfig({
  appName: "NFT AI Minting",
  projectId: "9d662d196fc0e42029d6f2d541260b94",
  chains: [
    _bsc,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [bsc] : []),
  ],
  ssr: true,
  wallets: [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        coinbaseWallet,
        trustWallet,
      ],
    },
  ],
});

export function RainBowProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
