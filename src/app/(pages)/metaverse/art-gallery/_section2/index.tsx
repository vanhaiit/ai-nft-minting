import React, { ComponentPropsWithoutRef } from "react";
import { twMerge, twJoin } from "tailwind-merge";
import { ArrowIcon } from "@/app/_components/icon";
import { TypeAnimation } from "react-type-animation";

import WrapperPage from "../_WrapperPage";
import CommonButton from "@/app/_components/CommonButton";

const Section2 = () => {
  const sequence = [
    "Enter keywords as you want...",
    "We will generate and visualize whatever you imagine...",
  ];

  return (
    <div className={twMerge("w-full h-full", "flex flex-col ")}>
      <WrapperPage
        containerClassName="w-full pt-20 pb-6"
        className="justify-center gap-y-8"
      >
        {sequence.map((item) => (
          <TypeAnimation
            sequence={[item]}
            wrapper="p"
            cursor={false}
            className="w-3/4 text-2xl font-bold text-space_mono uppercase"
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
      </WrapperPage>
      <WrapperPage containerClassName="border-t">
        <div className="grid grid-cols-2">
          <p className="text-xl pt-12 pr-16 pb-4 border-r">
            AI technology will serve as a catalyst for innovation by converging
            various technological fields such as blockchain, energy storage,
            robotics, and multiomic sequencing....
          </p>
          <p className="text-xl pt-12 ml-16 pb-4">
            Maximize the AI technology to expand the value of your Non-fungible
            token and add more value... Alpha Quark allows you to mint NFTs
            using the latest version of image generative AI model.
          </p>
        </div>
      </WrapperPage>
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
      <p className="font-medium">{title}</p>
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
