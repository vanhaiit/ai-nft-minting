"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { twMerge, twJoin } from "tailwind-merge";
import { CheckIcon } from "@/app/_components/icon";

import Image from "next/image";

const MintItem: React.FC<MintItemProps> = ({
  isMinted,
  urlImage,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={twMerge(
        "relative",
        "bg-neutral2",
        "center-root",
        "translate-hidden",
        "w-full h-full max-w-[424px] max-h-[424px]",
        isMinted && "border-4 border-primary1",
        className
      )}
      {...otherProps}
    >
      <Image src={urlImage} alt="" className="w-full h-full" />
      <button
        className={twJoin(
          "py-4",
          "w-full",
          "center-root gap-x-2",
          "absolute bottom-0 left-0",
          isMinted ? "bg-primary1 text-black1" : "bg-black1/70 text-neutral1"
        )}
      >
        {isMinted && <CheckIcon />}
        Mint
      </button>
    </div>
  );
};

export default MintItem;

interface MintItemProps extends ComponentPropsWithoutRef<"div"> {
  isMinted: boolean;
  urlImage: string;
}
