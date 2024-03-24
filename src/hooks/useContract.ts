import {
  ExternalProvider,
  Provider,
  Web3Provider,
} from "@ethersproject/providers";
import {
  BaseContract,
  Contract,
  ContractInterface,
  ethers,
  Signer,
} from "ethers";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export const useContract = <T extends BaseContract>(
  abi: ContractInterface,
  address: string
): Promise<T | null> => {
  const { connector } = useAccount();

  return useMemo(async () => {
    if (!ethers.utils.isAddress(address)) {
      return null;
    }
    const provider = connector?.getProvider
      ? new Web3Provider((await connector?.getProvider?.()) as ExternalProvider)
      : null;

    return getContract<T>(abi, address, provider?.getSigner());
  }, [abi, address, connector]);
};

export const getContract = <T extends BaseContract>(
  abi: ContractInterface,
  address: string,
  signer?: Signer | Provider
): T => {
  return new Contract(address, abi, signer) as T;
};
