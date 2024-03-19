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

const MintNftModal: React.FC<MintNftModalProps> = ({
  open,
  urlImage,
  onCancel,
}) => {
  const [nftCollection, setNftCollection] = useState(1);
  const [nftType, setNftType] = useState(NftTypeEnum.ERC_721);
  const [collection, setCollection] = useState("");

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
                defaultValue="Existing collections"
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
  ERC_721 = "ERC-721",
  ERC_1155 = "ERC-1155",
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
