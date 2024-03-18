"use client";

import React from "react";
import { useWindowSize } from "@/hooks";
import { twMerge, twJoin } from "tailwind-merge";
import { TypeAnimation } from "react-type-animation";

import WrapperPage from "../_WrapperPage";
import WaveAnimation from "../_WaveAnimation";
import CommonButton from "@/app/_components/CommonButton";

const Section1 = () => {
  const { windowWidth, windowHeight } = useWindowSize();

  return (
    <div className={twMerge("w-full h-full", "flex flex-col justify-between")}>
      <WrapperPage containerClassName="py-20">
        <p className="w-3/4 text-[50px] font-bold text-space_mono uppercase">
          <TypeAnimation
            sequence={[
              "Get ready for the imminent mass adoption of artificial intelligence...",
            ]}
            cursor={false}
          />
        </p>
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
        <CommonButton className="w-fit mt-4 mx-auto">Generate</CommonButton>
      </WrapperPage>
      <WaveAnimation width={windowWidth} height={windowHeight / 2.5} />
    </div>
  );
};

export default Section1;
