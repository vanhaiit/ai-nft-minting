import { fetchGenerateAiImage } from "@/helpers";
import Image from "next/image";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { twJoin, twMerge } from "tailwind-merge";
import { ImageAssets } from "../../../../../../public";
import CommonModal from "@/app/_components/CommonModal";
import MintNftModal from "./MintNftModal";
import { CheckIcon } from "@/app/_components/icon";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";

const Regenerate: React.FC<RegenerateProps> = ({
  textValue,
  reGenerateData,
  className,
  ...otherProps
}) => {
  const [isReGenerate, setIsReGenerate] = useState(false);
  const [isReGenerateImageError, setIsReGenerateImageError] = useState(false);
  const [dataImg, setDataImg] = useState<any>({
    dataImg: undefined,
    urlImage: "",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [isOpenModalMinting, setIsOpenModalMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const handleReGenerate = async () => {
    setIsReGenerate(true);
    let bodyData = new FormData();
    bodyData.append("file", dataImg.dataImg);
    bodyData.append("input", textValue);
    const res = await fetchGenerateAiImage(bodyData);

    if (res.dataImg) {
      setDataImg(res);
    } else {
      setIsReGenerateImageError(true);
    }
    setIsReGenerate(false);
  };

  useEffect(() => {
    setDataImg(reGenerateData);
  }, [reGenerateData]);

  return (
    <div
      className={twMerge(
        "w-[424px] h-[424px] relative hover:border-4 border-primary1",
        "[&>.coating]:hover:!flex",
        "[&>.button]:hover:!bg-primary1",
        isMinted && "border-4",
        isReGenerateImageError && "flex justify-center items-center",
        className
      )}
      {...otherProps}
    >
      {isReGenerateImageError ? (
        <TypeAnimation
          sequence={["Generate Ai Image Error"]}
          wrapper="p"
          cursor={true}
        />
      ) : (
        <>
          {!isReGenerate && dataImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              width={100}
              height={100}
              src={dataImg.urlImage}
              alt=""
              className="w-full h-full absolute top-0 left-0 -z-10"
            />
          ) : (
            <div className="w-full h-full center-root gap-y-4 flex-col">
              <Image
                src={ImageAssets.LoadingImage}
                alt=""
                width={64}
                height={64}
                className="animate-spin"
              />
              <TypeAnimation
                sequence={["Regenerating the image..."]}
                wrapper="p"
                cursor={true}
              />
            </div>
          )}
        </>
      )}

      {!isReGenerateImageError && !isReGenerate && !isMinted && (
        <div className="coating w-full hidden h-full flex-col items-center justify-center px-11 bg-black1/80 gap-y-2 text-center">
          <p className="font-medium text-[16px] mb-[42px]">
            I do not like this image. I want to regenerate one more.
          </p>
          <button
            className="border border-neutral1 text-sm py-2 px-4 w-fit"
            onClick={() => handleReGenerate()}
          >
            Regenerate
          </button>
        </div>
      )}
      {!isReGenerateImageError && !isReGenerate && (
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
          disabled={
            isMinted ||
            isReGenerateImageError ||
            !dataImg.dataImg ||
            isReGenerate
          }
        >
          {isMinted && <CheckIcon className={twJoin("icon", "text-black1")} />}
          Mint
        </button>
      )}

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
          <p className="w-full text-center text-[16px]">
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
      <CommonModal open={isOpenModalMinting} className="!w-[453px]">
        <div className="flex flex-col gap-y-6 items-center">
          <p className="w-full text-center text-[16px]">
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

export default Regenerate;

interface RegenerateProps extends ComponentPropsWithoutRef<"div"> {
  textValue: string;
  reGenerateData: any;
}
