"use client";

import React, { ComponentPropsWithoutRef, useState } from "react";
import { twMerge, twJoin } from "tailwind-merge";
import { CheckIcon } from "@/app/_components/icon";
import { TypeAnimation } from "react-type-animation";
import { ImageAssets } from "../../../../../../public";

import Image from "next/image";
import MintNftModal from "./MintNftModal";
import { useAppDispatch, useAppSelector } from "@/libs/redux/store";
import { getAtpBalance } from "@/stores/app/selectors";
import { setAtqBalance } from "@/stores/app";

const MintItem: React.FC<MintItemProps> = ({
  isMinted,
  urlImage,
  className,
  onRegenerate,
  ...otherProps
}) => {
  const balance = useAppSelector(getAtpBalance);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  dispatch(setAtqBalance(20000));

  return (
    <div
      className={twMerge(
        "relative",
        "bg-neutral2",
        "center-root",
        !isMinted && "cursor-pointer",
        "translate-hidden",
        "border-4 border-transparent",
        "w-full h-full max-w-[424px] max-h-[424px]",
        isMinted && "border-primary1 disable",
        className
      )}
      {...otherProps}
    >
      {urlImage ? (
        <Image src={urlImage} alt="" className="w-full h-full" />
      ) : (
        <div className="w-full h-[408px] flex flex-col center-root gap-y-2">
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
        </div>
      )}
      <button
        className={twJoin(
          "h-[calc(100%-56px)] w-full absolute top-0 left-0 opacity-0"
        )}
        disabled={isMinted}
        onClick={onRegenerate}
      ></button>
      <button
        className={twJoin(
          "py-4",
          "w-full",
          "button",
          isMinted ? "bg-primary1 text-black" : "bg-black1/70",
          "center-root gap-x-2",
          "absolute bottom-0 left-0"
        )}
        onClick={() => setIsOpenModal(true)}
        disabled={isMinted}
      >
        {isMinted && <CheckIcon className={twJoin("icon", "text-black1")} />}
        Mint
      </button>
      <MintNftModal
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        urlImage={urlImage}
      />
    </div>
  );
};

export default MintItem;

interface MintItemProps extends ComponentPropsWithoutRef<"div"> {
  isMinted: boolean;
  urlImage: string;

  onRegenerate: () => void;
}
