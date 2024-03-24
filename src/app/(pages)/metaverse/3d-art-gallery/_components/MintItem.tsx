"use client";

import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { CheckIcon } from "@/app/_components/icon";
import { TypeAnimation } from "react-type-animation";
import { twJoin, twMerge } from "tailwind-merge";
import { ImageAssets } from "../../../../../../public";

import { useAppDispatch, useAppSelector } from "@/libs/redux/store";
import { getAtpBalance } from "@/stores/app/selectors";
import Image from "next/image";
import MintNftModal from "./MintNftModal";
import { fetchGenerateAiImage, fetchGenerateTextToImage } from "@/helpers";
import CommonModal from "@/app/_components/CommonModal";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";

const MintItem: React.FC<MintItemProps> = ({
  valueText,
  valueFile,
  className,
  isGenerateTextToImage,
  isUploadGenerateAiImg,
  onRegenerate,
  ...otherProps
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [isGenerateImageError, setIsGenerateImageError] = useState(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [isOpenModalMinting, setIsOpenModalMinting] = useState(false);

  const [dataImg, setDataImg] = useState<any>({
    dataImg: undefined,
    urlImage: "",
  });

  const onGenerateTextToImage = async () => {
    const res = await fetchGenerateTextToImage({
      input: valueText,
    });
    if (res.dataImg) {
      setDataImg(res);
    } else {
      console.log(1111);

      setIsGenerateImageError(true);
    }
  };

  const onUploadGenerateAiImg = async () => {
    let bodyData = new FormData();
    bodyData.append("file", valueFile);
    bodyData.append("input", valueText);
    const res = await fetchGenerateAiImage(bodyData);

    if (res.dataImg) {
      setDataImg(res);
    } else {
      setIsGenerateImageError(true);
    }
  };

  useEffect(() => {
    if (!valueText || valueFile) return;
    setDataImg({
      dataImg: undefined,
      urlImage: "",
    });
    onGenerateTextToImage();
  }, [isGenerateTextToImage]);

  useEffect(() => {
    if (!valueFile || !valueText) return;
    setDataImg({
      dataImg: undefined,
      urlImage: "",
    });
    onUploadGenerateAiImg();
  }, [isUploadGenerateAiImg]);

  return (
    <div
      className={twMerge(
        "relative",
        "container",
        "bg-neutral2",
        "center-root",
        !isMinted && "cursor-pointer",
        "translate-hidden",
        "border-4 border-transparent",
        "w-full h-full max-w-[424px] max-h-[424px] hover:border-primary1",
        isMinted && "border-primary1 disable",
        "[&>.button]:hover:bg-primary1 ",
        "[&~.icon]:hover:block",
        className
      )}
      {...otherProps}
    >
      {dataImg?.dataImg ? (
        <Image
          src={dataImg.urlImage}
          width={100}
          height={100}
          alt=""
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-[408px] flex flex-col center-root gap-y-2">
          {isGenerateImageError ? (
            <TypeAnimation
              sequence={["Generate Ai Image Error"]}
              wrapper="p"
              cursor={true}
            />
          ) : (
            <>
              <Image
                src={ImageAssets.LoadingImage}
                alt=""
                width={64}
                height={64}
                className="animate-spin"
              />
              <TypeAnimation
                sequence={["Generating the image..."]}
                wrapper="p"
                cursor={true}
              />
            </>
          )}
        </div>
      )}
      <button
        className={twJoin(
          "h-[calc(100%-56px)] w-full absolute top-0 left-0 opacity-0"
        )}
        disabled={isMinted || isGenerateImageError || !dataImg.dataImg}
        onClick={() => onRegenerate(dataImg)}
      ></button>
      <button
        className={twJoin(
          "button",
          "py-4",
          "w-full",
          "button",
          isMinted ? "bg-primary1 text-black" : "bg-black1/70",
          "center-root gap-x-2",
          "absolute bottom-0 left-0"
        )}
        onClick={() => setIsOpenModal(true)}
        disabled={isMinted || isGenerateImageError || !dataImg.dataImg}
      >
        {isMinted && <CheckIcon className={twJoin("icon", "text-black1")} />}
        Mint
      </button>
      <MintNftModal
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        dataImg={dataImg}
        onMindError={() => {
          setIsOpenModalMinting(false);
          setIsOpenModalError(true);
        }}
        onMindSuccess={() => {
          setIsOpenModalMinting(false);
          setIsOpenModalSuccess(true);
          setIsMinted(true);
        }}
        onMinting={() => setIsOpenModalMinting(true)}
      />
      <CommonModal open={isOpenModalSuccess}>
        <div className="flex flex-col items-center gap-y-4">
          <p className="w-full text-center">Successfully minted!</p>
          <CommonButton
            variant={CommonButtonVariantEnum.primary}
            isShowArrow={false}
            onClick={() => {
              setIsOpenModalSuccess(false);
              setIsOpenModal(false);
            }}
          >
            OK
          </CommonButton>
        </div>
      </CommonModal>
      <CommonModal open={isOpenModalError}>
        <div className="flex flex-col items-center gap-y-4">
          <p className="w-full text-center">
            Something went wrong! Please try again.
          </p>
          <CommonButton
            variant={CommonButtonVariantEnum.primary}
            isShowArrow={false}
            onClick={() => {
              setIsOpenModalError(false);
              setIsOpenModal(false);
            }}
          >
            OK
          </CommonButton>
        </div>
      </CommonModal>
      <CommonModal open={isOpenModalMinting}>
        <div className="flex flex-col gap-y-6 items-center">
          <p className="w-full text-center">
            Please wait until your NFT minting transaction is completed
          </p>
          <Image
            src={ImageAssets.LoadingImage}
            alt=""
            width={64}
            height={64}
            className="animate-spin"
          />
        </div>
      </CommonModal>
    </div>
  );
};

export default MintItem;

interface MintItemProps extends ComponentPropsWithoutRef<"div"> {
  valueText: string;
  valueFile: any;
  isGenerateTextToImage: boolean;
  isUploadGenerateAiImg: boolean;
  onRegenerate: (value: any) => void;
}
