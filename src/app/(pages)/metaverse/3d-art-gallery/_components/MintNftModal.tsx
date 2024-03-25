"use client";

import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";
import { twJoin } from "tailwind-merge";
import { ModalProps, Radio } from "antd";

import Image from "next/image";
import Filter from "../../../my-generated-nfts/_component/Filter";
import CommonModal from "@/app/_components/CommonModal";
import CommonInput from "@/app/_components/CommonInput";
import { useAccount } from "wagmi";
import { useContract } from "@/hooks/useContract";
import { ABI_CONTRACT, ABI_MINT_NFT_1155, ABI_MINT_NFT_721 } from "@/data";
import {
  useCreateCollectionDraftMutation,
  useLazyGetDetailCollectionQuery,
  useLazyGetSignatureQuery,
} from "@/stores/collection/api";
import { fetchGetIpfsHash, retryCallPromise } from "@/helpers";
import {
  useCreateMintMutation,
  useLazyGetDetailNftQuery,
} from "@/stores/nft/api";
import { useAppSelector } from "@/libs/redux/store";
import { getAtpBalance } from "@/stores/app/selectors";

let ipfsHash = "";

const MintNftModal: React.FC<MintNftModalProps> = ({
  open,
  dataImg,
  onMindSuccess,
  onMindError,
  onMinting,
  onCancel,
}) => {
  const account = useAccount();
  const [nftCollection, setNftCollection] = useState(1);
  const [nftType, setNftType] = useState(NftTypeEnum.ERC_721);
  const [collection, setCollection] = useState("");
  const [quantity, setQuantity] = useState("");
  const [getSignature] = useLazyGetSignatureQuery();
  const [createCollectionDraft] = useCreateCollectionDraftMutation();
  const [getDetailCollection] = useLazyGetDetailCollectionQuery();
  const [createMintNft] = useCreateMintMutation();
  const [getDetailNft] = useLazyGetDetailNftQuery();
  const [infoMintNft, setInfoMintNft] = useState<{
    id: string;
    contractMint: string;
  }>();
  const [titleNft, setTitleNft] = useState("");
  const [description, setDescription] = useState("");
  const [newNftCollection, setNewNftCollection] = useState("");
  const [balanceError, setBalanceError] = useState(false);
  const balance = useAppSelector(getAtpBalance);

  const getContract = useContract(
    ABI_CONTRACT,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
  );

  const [collectionAddress, idCollection, type] = collection?.split("*");
  const getContractMintNft = useContract(
    nftType === NftTypeEnum.ERC_1155 ? ABI_MINT_NFT_1155 : ABI_MINT_NFT_721,
    infoMintNft ? infoMintNft?.contractMint : collectionAddress
  );

  function initValueCollection(value: any) {
    setCollection(value);
    const [collectionAddress, idCollection, type] = value?.split("*");
    setNftType(type);
  }

  const onGetNonce = async () => {
    try {
      const res: any = await getContract;
      const nonce = await res?.nonces(account.address);
      return nonce.toString();
    } catch (error) {
      console.log("error", error);
      onMindError();
      return "";
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
        name: newNftCollection ? newNftCollection : randomNameCollection,
        symbol: "AI",
        nonce,
        baseURI: "AI",
      });

      const resData = res.data;

      if (resData && resData.status_code === 200) {
        return resData.data;
      } else {
        onMindError();
      }
    } catch (error) {
      console.log("error", error);
      onMindError();
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

      onCreateCollectionDraft(name, res.hash);
    } catch (error) {
      console.log("error", error);
      onMindError();
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

    if (res.data.id) {
      await onGetDetailCollection(res.data.id);
    } else {
      onMindError();
    }
  }

  async function onGetDetailCollection(id: string) {
    const res: any = await retryCallPromise(
      () => getDetailCollection({ id }),
      (res) => {
        return res.data.status === "deployed";
      },
      1000,
      4000
    );
    if (res.data.contract.address) {
      setInfoMintNft({
        id: id,
        contractMint: res.data.contract.address,
      });
    }
  }

  async function onMintNft(id: string) {
    try {
      const contract: any = await getContractMintNft;
      let res;
      if (nftType === NftTypeEnum.ERC_1155) {
        res = await contract?.mint(account.address, id, 1, "0x0", ipfsHash);
      } else {
        res = await contract?.mint(account.address, ipfsHash);
      }

      if (res && res.hash) {
        onCreateMintNft(res.hash, id, ipfsHash);
      } else {
        onMindError();
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: MintNftModal.tsx:207 ~ onMintNft ~ error:",
        error
      );
      onMindError();
    }
  }

  const handleMint = async () => {
    if (nftCollection === 2 || !collection) {
      const nonce = await onGetNonce();
      const res = await onCreateCollection(nonce);
      if (res.signature) {
        await onCreateCollectionOnChain({ name: newNftCollection, ...res });
      }
    } else {
      onMintNft(new Date().getTime().toString());
    }
  };

  const handleGetIpfsHash = async () => {
    if (balance < 50) return setBalanceError(true);
    onMinting();
    let bodyData = new FormData();
    bodyData.append("file", dataImg.dataImg);
    const res: any = await fetchGetIpfsHash(bodyData);
    console.log("🚀 ~ handleGetIpfsHash ~ res:", res);

    if (res?.data?.IpfsHash) {
      ipfsHash = res.data.IpfsHash;
      handleMint();
    } else {
      onMindError();
    }
  };

  async function onCreateMintNft(
    transactionHash: string,
    id: string,
    ipfsHash: string
  ) {
    const res: any = await createMintNft({
      id: id,
      name: titleNft,
      description: description,
      image: ipfsHash,
      transactionHash,
      walletAddress: account.address,
    });

    if (res.data.id) {
      onDetailNft(res.data.id);
    } else {
      onMindError();
    }
  }

  async function onDetailNft(id: number) {
    const res: any = await retryCallPromise(
      () => getDetailNft({ id }),
      (res) => {
        return res.data.blockchainStatus === "MINTED";
      },
      1000,
      3000
    );

    if (res.data.blockchainStatus === "MINTED") {
      onMindSuccess();
    }
  }

  useEffect(() => {
    if (infoMintNft) {
      onMintNft(infoMintNft.id);
    }
  }, [infoMintNft]);

  function onChangeOptionCollection(value: any) {
    if (value === 2) {
      setNftCollection(value);
      setCollection("");
      setNftType(NftTypeEnum.ERC_721);
    }
    setNftCollection(value);
  }

  return (
    <>
      <CommonModal
        open={open}
        className="h-[calc(100svh-200px)] flex items-center !w-[404px]"
        onCancel={onCancel}
      >
        <div className="flex flex-col gap-y-4">
          <p className="text-xl font-medium">Do you want to mint this image?</p>
          <WrapperItem label="NFT collection">
            <div className="flex flex-col gap-y-1">
              <Radio.Group
                onChange={(e) => onChangeOptionCollection(e.target.value)}
                value={nftCollection}
              >
                <Radio value={1} className="!font-roboto">
                  Alpha Quark AI-NFT
                </Radio>
                <Radio value={2} className="!font-roboto">
                  A New NFT collection
                </Radio>
              </Radio.Group>
              {nftCollection === 1 && (
                <Filter
                  defaultValue={"Existing collections"}
                  value={collection}
                  onChange={initValueCollection}
                  onInitValue={initValueCollection}
                />
              )}
            </div>
          </WrapperItem>
          <WrapperItem label="NFT Type">
            {!!collection ? (
              <div className="flex-row">
                <Radio
                  checked={nftType === NftTypeEnum.ERC_721}
                  value={NftTypeEnum.ERC_721}
                >
                  ERC-721
                </Radio>
                <Radio
                  checked={nftType === NftTypeEnum.ERC_1155}
                  value={NftTypeEnum.ERC_1155}
                >
                  ERC-1155
                </Radio>
              </div>
            ) : (
              <Radio.Group
                onChange={(e) => setNftType(e.target.value)}
                value={nftType}
              >
                <Radio value={NftTypeEnum.ERC_721}>ERC-721</Radio>
                <Radio value={NftTypeEnum.ERC_1155}>ERC-1155</Radio>
              </Radio.Group>
            )}
          </WrapperItem>
          <WrapperItem label="Preview">
            <Image src={dataImg.urlImage} alt="" width={180} height={180} />
          </WrapperItem>
          <WrapperItem label="Title of NFT">
            <CommonInput
              className="w-full"
              onChange={(e) => setTitleNft(e.target.value)}
            />
          </WrapperItem>
          {nftType === NftTypeEnum.ERC_1155 && (
            <WrapperItem label="Quantity">
              <CommonInput
                className="w-full"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </WrapperItem>
          )}
          {nftCollection === 2 && (
            <WrapperItem label="New Title of NFT collection">
              <CommonInput
                className="w-full"
                onChange={(e) => setNewNftCollection(e.target.value)}
              />
            </WrapperItem>
          )}
          <WrapperItem label="Description">
            <CommonInput
              className="w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
          </WrapperItem>
          <CommonButton
            variant={CommonButtonVariantEnum.outline}
            isShowArrow={false}
            className="w-fit text-sm"
            onClick={handleGetIpfsHash}
            disabled={
              !titleNft ||
              !description ||
              (!newNftCollection && nftCollection === 2)
            }
          >
            Mint
          </CommonButton>
        </div>
      </CommonModal>
      <CommonModal
        className="!w-[686px] h-[calc(100svh-200px)] flex items-center"
        open={balanceError}
        onCancel={() => setBalanceError(false)}
      >
        <div className="flex flex-col gap-y-6 items-center">
          <div className="flex flex-col items-center gap-y-4 text-center">
            <p className="text-[20px] font-medium">Oops,</p>
            <p className="text-[16px] text-primary1">
              <p className="text-[16px] text-white">
                It seems that do not hold any Alpha Quark Token yet.
              </p>
              <span>
                To mint a new NFT collection rather than Alpha Quark AI-NFT
                collection, you need to hold at least 50 AQT{" "}
                <span className="text-[16px] text-white">on your wallet.</span>
              </span>
            </p>
          </div>
          <CommonButton
            variant={CommonButtonVariantEnum.outline}
            isShowArrow={false}
            className="w-fit text-sm"
            onClick={() => setBalanceError(false)}
          >
            I got it
          </CommonButton>
        </div>
      </CommonModal>
    </>
  );
};

export default MintNftModal;

interface MintNftModalProps extends ModalProps {
  dataImg: any;
  onMindSuccess: () => void;
  onMindError: () => void;
  onMinting: () => void;
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
