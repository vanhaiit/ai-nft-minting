import React, { ComponentPropsWithoutRef } from "react";
import { twMerge, twJoin } from "tailwind-merge";
import { ArrowIcon } from "@/app/_components/icon";
import { TypeAnimation } from "react-type-animation";
import { ImageAssets } from "../../../../../../public";

import CommonButton from "@/app/_components/CommonButton";
import AppProvider from "@/app/_components/AppProvider";
import MintItem from "./mint-item";

const Section2 = () => {
  const sequence = [
    "Enter keywords as you want...",
    "We will generate and visualize whatever you imagine...",
  ];

  return (
    <div className={twMerge("w-full h-full", "flex flex-col ")}>
      <AppProvider
        containerClassName="w-full pt-20 pb-6"
        className="justify-center gap-y-8"
      >
        {sequence.map((item, index) => (
          <TypeAnimation
            key={index}
            sequence={[item]}
            wrapper="p"
            cursor={false}
            className="w-3/4 text-2xl font-bold font-space uppercase"
          />
        ))}
        <div className={twJoin("w-full h-full", "flex items-center gap-x-6")}>
          <TopSection2Item
            title="A beautiful forest and futuristic city where there are a lot of artistic buildings."
            labelButton="Generate"
          />
          <TopSection2Item
            title="Upload your image that you want to make the AI model refer to"
            labelButton="Select"
          />
        </div>
        <CommonButton className="w-fit mx-auto">Upload</CommonButton>
      </AppProvider>
      <AppProvider
        containerClassName="border-t py-10"
        className="flex-row space-between-root gap-x-6"
      >
        {MOCK_LIST_MINT.map((item, index) => (
          <MintItem
            key={index}
            isMinted={item.isMinted}
            urlImage={item.urlImage}
          />
        ))}
      </AppProvider>
    </div>
  );
};

export default Section2;

const TopSection2Item: React.FC<TopSection2ItemProps> = ({
  title,
  children,
  className,
  labelButton,
  onClickButton,
  ...otherProps
}) => {
  return (
    <div
      className={twMerge(
        "p-4",
        "border border-neutral4",
        "w-full h-full min-h-[148px]",
        "flex flex-col justify-between",
        className
      )}
      {...otherProps}
    >
      <TypeAnimation
        sequence={[title]}
        cursor={false}
        className="font-medium"
      />
      <button className="flex items-center gap-x-1 ml-auto text-sm text-neutral4">
        {labelButton}
        <ArrowIcon />
      </button>
    </div>
  );
};

interface TopSection2ItemProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  labelButton: string;
  onClickButton?: () => void;
}

const MOCK_LIST_MINT = [
  { isMinted: true, urlImage: ImageAssets.Demo1Image },
  { isMinted: false, urlImage: ImageAssets.Demo2Image },
  { isMinted: false, urlImage: ImageAssets.Demo3Image },
];
