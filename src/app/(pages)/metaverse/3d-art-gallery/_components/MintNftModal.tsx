"use client";

import React, { ComponentPropsWithoutRef, useState } from "react";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";
import { twJoin } from "tailwind-merge";
import { ModalProps, Radio } from "antd";

import Image from "next/image";
import Filter from "../../../generate/_component/Filter";
import CommonModal from "@/app/_components/CommonModal";
import CommonInput from "@/app/_components/CommonInput";
import { useAccount } from "wagmi";
import { useContract } from "@/hooks/useContract";
import { ABI_CONTRACT } from "@/data";
import {
  useCreateCollectionDraftMutation,
  useLazyGetDetailCollectionQuery,
  useLazyGetSignatureQuery,
} from "@/stores/collection/api";
import { retryCallPromise } from "@/helpers";

const MintNftModal: React.FC<MintNftModalProps> = ({
  open,
  urlImage,
  onCancel,
}) => {
  const account = useAccount();
  const [nftCollection, setNftCollection] = useState(1);
  const [nftType, setNftType] = useState(NftTypeEnum.ERC_721);
  const [collection, setCollection] = useState("");
  const [valueFilter, setValueFilter] = useState("Existing collections");
  const [getSignature] = useLazyGetSignatureQuery();
  const [createCollectionDraft] = useCreateCollectionDraftMutation();
  const [getDetailCollection] = useLazyGetDetailCollectionQuery();

  const getContract = useContract(
    ABI_CONTRACT,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
  );
  const onGetNonce = async () => {
    try {
      const res: any = await getContract;
      const nonce = await res?.nonces(account.address);
      return nonce.toString();
    } catch (error) {
      console.log("error", error);
    }
  };

  const onCreateCollection = async (nonce: string) => {
    try {
      const randomNameCollection = `Alpha Quark ${Math.floor(
        Math.random() * 100000
      )} NFTs`;
      const res = await getSignature({
        walletAddress: account.address,
        type: nftType,
        name: randomNameCollection,
        symbol: "AI",
        nonce,
        baseURI: "AI",
      });

      const resData = res.data;

      if (resData && resData.status_code === 200) {
        return resData.data;
      }
    } catch (error) {
      console.log("error", error);
      return {} as any;
    }
  };

  const onCreateCollectionOnChain = async (params: any) => {
    try {
      const {
        symbol,
        isPublicMintable,
        name,
        signature,
        deadline,
        baseURI,
        nonce,
      } = params;

      const contract: any = await getContract;
      let res;
      if (nftType === NftTypeEnum.ERC_1155) {
        res = await contract?.createERC1155Contract(
          account.address,
          baseURI,
          isPublicMintable,
          nonce,
          deadline,
          signature
        );
      } else {
        res = await contract?.createERC721Contract(
          account.address,
          name,
          symbol,
          isPublicMintable,
          nonce,
          deadline,
          signature
        );
      }
      console.log("res", res);

      onCreateCollectionDraft(name, res.hash);
    } catch (error) {
      console.log("error", error);
      return {};
    }
  };

  async function onCreateCollectionDraft(
    name: string,
    transactionHash: string
  ) {
    const res: any = await createCollectionDraft({
      name: name,
      description: "string",
      type: nftType,
      transactionHash: transactionHash,
      walletAddress: account.address,
    });

    await onGetDetailCollection(res.data.id);
    // return res.data.data.id;
  }

  async function onGetDetailCollection(id: string) {
    const res = await retryCallPromise(
      () => getDetailCollection({ id }),
      (res) => res.data.status === "deployed",
      1000,
      2000
    );
    console.log(res);
  }

  const handleMint = async () => {
    const nonce = await onGetNonce();

    const res = await onCreateCollection(nonce);

    if (res.signature) {
      await onCreateCollectionOnChain({ ...res });
    }
  };

  return (
    <CommonModal open={open} onCancel={onCancel}>
      <div className="flex flex-col gap-y-4">
        <p className="text-xl font-medium">Do you want to mint this image?</p>
        <WrapperItem label="NFT collection">
          <div className="flex flex-col gap-y-1">
            <Radio.Group
              onChange={(e) => setNftCollection(e.target.value)}
              value={nftCollection}
            >
              <Radio value={1}>Alpha Quark AI-NFT</Radio>
              <Radio value={2}>A New NFT collection</Radio>
            </Radio.Group>
            {nftCollection === 1 && (
              <Filter
                defaultValue={"Existing collections"}
                value={collection}
                onChange={(value) => setCollection(value)}
              />
            )}
          </div>
        </WrapperItem>
        <WrapperItem label="NFT Type">
          <Radio.Group
            onChange={(e) => setNftType(e.target.value)}
            value={nftType}
          >
            <Radio value={NftTypeEnum.ERC_721}>ERC-721</Radio>
            <Radio value={NftTypeEnum.ERC_1155}>ERC-1155</Radio>
          </Radio.Group>
        </WrapperItem>
        <WrapperItem label="Preview">
          <Image src={urlImage} alt="" width={180} height={180} />
        </WrapperItem>
        <WrapperItem label="Title of NFT">
          <CommonInput className="w-full" />
        </WrapperItem>
        <WrapperItem label="New Title of NFT collection">
          <CommonInput className="w-full" />
        </WrapperItem>
        <WrapperItem label="Description">
          <CommonInput className="w-full" />
        </WrapperItem>
        <CommonButton
          variant={CommonButtonVariantEnum.primary}
          isShowArrow={false}
          className="w-fit text-sm"
          onClick={handleMint}
        >
          Mint
        </CommonButton>
      </div>
    </CommonModal>
  );
};

export default MintNftModal;

interface MintNftModalProps extends ModalProps {
  urlImage: string;
}

enum NftTypeEnum {
  ERC_721 = "ERC_721",
  ERC_1155 = "ERC_1155",
}

const WrapperItem: React.FC<WrapperItemProps> = ({ children, label }) => {
  return (
    <div className={twJoin("w-full", "flex flex-col gap-y-2")}>
      <p className="text-base font-medium text-neutral1">{label}</p>
      {children}
    </div>
  );
};

interface WrapperItemProps extends ComponentPropsWithoutRef<"div"> {
  label: string;
}
