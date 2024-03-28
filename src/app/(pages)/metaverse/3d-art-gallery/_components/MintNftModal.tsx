/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";
import { ModalProps, Radio } from "antd";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

import CommonInput from "@/app/_components/CommonInput";
import CommonModal from "@/app/_components/CommonModal";
import { ABI_CONTRACT, ABI_MINT_NFT_1155, ABI_MINT_NFT_721 } from "@/data";
import { fetchGetIpfsHash, retryCallPromise } from "@/helpers";
import { useContract } from "@/hooks/useContract";
import { useAppSelector } from "@/libs/redux/store";
import { getAtpBalance } from "@/stores/app/selectors";
import {
  useCreateCollectionDraftMutation,
  useGetAllCollectionQuery,
  useLazyGetDetailCollectionQuery,
  useLazyGetSignatureQuery,
} from "@/stores/collection/api";
import {
  useCreateMintMutation,
  useLazyGetDetailNftQuery,
} from "@/stores/nft/api";
import get from "lodash/get";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import Filter from "../../../my-generated-nfts/_component/Filter";

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
  const [getSignature] = useLazyGetSignatureQuery();
  const [createCollectionDraft] = useCreateCollectionDraftMutation();
  const [getDetailCollection] = useLazyGetDetailCollectionQuery();
  const [createMintNft] = useCreateMintMutation();
  const [getDetailNft] = useLazyGetDetailNftQuery();
  const [infoMintNft, setInfoMintNft] = useState<{
    id: string;
    contractMint: string;
  }>();
  const [balanceError, setBalanceError] = useState(false);
  const balance = useAppSelector(getAtpBalance);

  const { data: listCollection } = useGetAllCollectionQuery(
    {
      walletAddress: account?.address,
      status: ["deployed"],
    },
    { skip: !account.address }
  ) as any;

  const getContract = useContract(
    ABI_CONTRACT,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
  );

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      title: "",
      quantity: "",
      collectionName: "",
      description: "",
    },
  });

  const [collectionAddress] = collection?.split("*");

  const getContractMintNft = useContract(
    nftType === NftTypeEnum.ERC_1155 ? ABI_MINT_NFT_1155 : ABI_MINT_NFT_721,
    infoMintNft
      ? infoMintNft?.contractMint
      : collectionAddress ||
          (nftType === NftTypeEnum.ERC_1155
            ? process.env.NEXT_PUBLIC_COLLECTION_ADDRESS_DEFAULT_1155!
            : process.env.NEXT_PUBLIC_COLLECTION_ADDRESS_DEFAULT_721!)
  );

  function initValueCollection(value: any) {
    onChangeOptionCollection(3);
    setCollection(value);
    const [_collectionAddress, _idCollection, type] = value?.split("*");
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
        name: !!watch("collectionName")
          ? watch("collectionName")
          : randomNameCollection,
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

    if (res?.data?.id) {
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
        const quantity = Number(watch("quantity"));
        res = await contract?.mint(
          account.address,
          new Date().getTime().toString(),
          quantity,
          "0x00",
          ipfsHash
        );
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
    if (nftCollection === 2) {
      const nonce = await onGetNonce();
      const res = await onCreateCollection(nonce);
      if (res.signature) {
        await onCreateCollectionOnChain({
          name: watch("collectionName"),
          ...res,
        });
      }
    }
    if (nftCollection === 3) {
      const [_collectionAddress, collectionId] = collection?.split("*");
      onMintNft(collectionId);
    }
    if (nftCollection === 1) {
      const res: any = await getDetailCollection({
        id:
          nftType === NftTypeEnum.ERC_1155
            ? process.env.NEXT_PUBLIC_COLLECTION_ADDRESS_DEFAULT_1155!
            : process.env.NEXT_PUBLIC_COLLECTION_ADDRESS_DEFAULT_721!,
      });
      if (res?.data?.id) {
        setInfoMintNft({
          id: res?.data?.id,
          contractMint: res?.data?.contract.address,
        });
        return;
      }
      onMindError();
      return;
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
      name: watch("title"),
      description: watch("description"),
      image: ipfsHash,
      transactionHash,
      walletAddress: account.address,
    });

    if (res?.data?.id) {
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
    if (value === 1) {
      setCollection("");
    }
    setNftCollection(value);
  }

  function submitData() {
    handleGetIpfsHash();
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
              {listCollection?.length > 0 && (
                <div>
                  <Radio
                    checked={nftCollection === 3}
                    value={3}
                    className="!font-roboto"
                  />
                  <Filter
                    defaultValue={"Existing collections"}
                    value={collection || "Existing collections"}
                    onChange={initValueCollection}
                    data={listCollection}
                  />
                </div>
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
            <Controller
              name="title"
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 255,
                  message: "Only accept up to 255 characters.",
                },
              }}
              render={({ field }) => (
                <CommonInput {...field} className="w-full" />
              )}
            />
            <p className="text-red-500 text-[14px]">
              {get(errors, "title.message", "").toString()}
            </p>
          </WrapperItem>
          {nftType === NftTypeEnum.ERC_1155 && (
            <WrapperItem label="Quantity">
              <Controller
                name="quantity"
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field }) => {
                  const { onChange, ...otherField } = field;
                  function handleChange(e: any) {
                    if (!/^\d+$/.test(e?.target?.value)) {
                      return e?.preventDefault();
                    }
                    onChange(e?.target?.value);
                  }
                  return (
                    <CommonInput
                      onChange={handleChange}
                      className="w-full"
                      {...otherField}
                    />
                  );
                }}
              />
              <p className="text-red-500 text-[14px]">
                {get(errors, "quantity.message", "").toString()}
              </p>
            </WrapperItem>
          )}
          {nftCollection === 2 && (
            <WrapperItem label="New Title of NFT collection">
              <Controller
                name="collectionName"
                control={control}
                rules={{
                  required: "This field is required",
                  maxLength: {
                    value: 255,
                    message: "Only accept up to 255 characters.",
                  },
                }}
                render={({ field }) => (
                  <CommonInput className="w-full" {...field} />
                )}
              />
              <p className="text-red-500 text-[14px]">
                {get(errors, "collectionName.message", "").toString()}
              </p>
            </WrapperItem>
          )}
          <WrapperItem label="Description">
            <Controller
              name="description"
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 255,
                  message: "Only accept up to 255 characters.",
                },
              }}
              render={({ field }) => (
                <CommonInput className="w-full" {...field} />
              )}
            />
            <p className="text-red-500 text-[14px]">
              {get(errors, "description.message", "").toString()}
            </p>
          </WrapperItem>
          <CommonButton
            variant={CommonButtonVariantEnum.outline}
            isShowArrow={false}
            className="w-fit text-sm"
            onClick={handleSubmit(submitData)}
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
