import React from "react";
import { StepEnum } from "@/types";
import { twMerge, twJoin } from "tailwind-merge";
import { TypeAnimation } from "react-type-animation";
import { ImageAssets } from "../../../../../../../public";

import MintItem from "../MintItem";
import GenerateFile from "../GenerateFile";
import GenerateText from "../GenerateText";
import CommonContainer from "@/app/_components/CommonContainer";
import CommonButton from "@/app/_components/CommonButton";

const Step2: React.FC<Step2Props> = ({ onChangeStep }) => {
  const sequence = [
    "Enter keywords as you want...",
    "We will generate and visualize whatever you imagine...",
  ];

  return (
    <div className={twMerge("w-full h-full", "flex flex-col ")}>
      <CommonContainer
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
          <GenerateText />
          <GenerateFile />
        </div>
        <CommonButton className="w-fit mx-auto">Upload</CommonButton>
      </CommonContainer>
      <CommonContainer
        containerClassName="border-t py-10"
        className="flex-row space-between-root gap-x-6"
      >
        {MOCK_LIST_MINT.map((item, index) => (
          <MintItem key={index} urlImage={item.urlImage} />
        ))}
      </CommonContainer>
    </div>
  );
};

export default Step2;

interface Step2Props {
  onChangeStep: (value: StepEnum) => void;
}

const MOCK_LIST_MINT = [
  { urlImage: ImageAssets.Demo1Image },
  { urlImage: ImageAssets.Demo2Image },
  { urlImage: ImageAssets.Demo3Image },
];
