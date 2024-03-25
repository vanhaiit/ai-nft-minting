"use client";
import CommonButton from "@/app/_components/CommonButton";
import CommonContainer from "@/app/_components/CommonContainer";
import WaveAnimation from "@/app/_components/WaveAnimation";
import { StepEnum } from "@/types";
import Image from "next/image";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";
import { ImageAssets } from "../../../../../../public";

const Step1: React.FC<Step1Props> = ({ onChangeStep }) => {
  return (
    <div className="w-full">
      <div className={twMerge("w-full h-full", "flex flex-col")}>
        <CommonContainer containerClassName="h-[350px] flex justify-center items-center py-[80px]">
          <p className="w-3/4 !text-white text-[55px] font-extrabold !font-space uppercase h-[190px] max-h-[190px]">
            <TypeAnimation
              sequence={[
                `Get ready for the imminent \n
                mass adoption of \n
                artificial intelligence...`,
              ]}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
                lineHeight: "37px",
              }}
            />
          </p>
        </CommonContainer>
        <CommonContainer containerClassName="border-t border-neutral7 z-10 justify-center items-center">
          <div className=" grid-cols-2 min-h-[234px] !flex ">
            <p className="text-xl pt-12 pr-16 pb-4 border-gradient !text-white !w-[660px]">
              <TypeAnimation
                sequence={[
                  `AI technology will serve as a catalyst for innovation by converging
                 various technological fields such as blockchain, energy storage,
                 robotics, and multiomic sequencing....`,
                ]}
                className="!text-white "
              />
            </p>
            <Image className="!mt-[-35px]" src={ImageAssets.Line} alt="" />
            <p className=" text-xl pt-12 ml-16 pb-4 !text-white flex w-[595px]">
              <TypeAnimation
                sequence={[
                  `Maximize the AI technology to expand the value of your Non-fungible
                 token and add more value... Alpha Quark allows you to mint NFTs
                 using the latest version of image generative AI model.`,
                ]}
                className="!text-white"
                cursor={true}
              />
            </p>
          </div>
          <CommonButton
            className="w-fit mt-4 mx-auto "
            onClick={() => onChangeStep(StepEnum.STEP_2)}
          >
            Generate
          </CommonButton>
        </CommonContainer>
        <div className="h-[435px]"></div>
      </div>
      <div className=" absolute bottom-0 z-0 w-full flex justify-center items-center">
        <WaveAnimation width={1920} height={720} />
      </div>
    </div>
  );
};

export default Step1;

interface Step1Props {
  onChangeStep: (value: StepEnum) => void;
}
