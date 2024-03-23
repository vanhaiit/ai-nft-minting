"use client";

import { CheckIcon } from "@/app/_components/icon";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { twJoin, twMerge } from "tailwind-merge";
import { ImageAssets } from "../../../../../../public";

import { ABI_CONTRACT } from "@/data";
import { useContract } from "@/hooks/useContract";
import { useAppDispatch, useAppSelector } from "@/libs/redux/store";
import { getAtpBalance } from "@/stores/app/selectors";
import Image from "next/image";
import MintNftModal from "./MintNftModal";

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
  const [search, setSearch] = useState("");
  // const { data, isLoading } = useGetConfigQuery({ id: "" }, { skip: true });
  // const [createTran, { isLoading: isLoad }] = useCreateTransactionMutation();
  // createTran({});
  // dispatch(setAtqBalance(20000));

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
          "button",
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
