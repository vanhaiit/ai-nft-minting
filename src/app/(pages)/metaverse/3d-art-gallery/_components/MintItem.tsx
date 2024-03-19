"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { twMerge, twJoin } from "tailwind-merge";
import { CheckIcon } from "@/app/_components/icon";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { ImageAssets } from "../../../../../../public";

const MintItem: React.FC<MintItemProps> = ({
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
        "border-4 border-transparent hover:border-primary1",
        "[&>.button]:hover:!bg-primary1 [&>.button]:hover:!text-black",
        "[&>.button.icon]:!hover:!block",
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
            cursor={false}
          />
        </div>
      )}
      <button
        className={twJoin(
          "py-4",
          "w-full",
          "button",
          "bg-black1/70",
          "center-root gap-x-2",
          "absolute bottom-0 left-0"
        )}
      >
        <CheckIcon className={twJoin("icon", "hidden text-black1")} />
        Mint
      </button>
    </div>
  );
};

export default MintItem;

interface MintItemProps extends ComponentPropsWithoutRef<"div"> {
  urlImage: string;
}
