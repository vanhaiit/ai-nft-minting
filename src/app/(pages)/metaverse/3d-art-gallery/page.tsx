"use client";
import { useWindowSize } from "@/hooks";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";
import CommonContainer from "@/app/_components/CommonContainer";
import CommonButton from "@/app/_components/CommonButton";
import WaveAnimation from "@/app/_components/WaveAnimation";

const ArtGallery = () => {
  const { windowWidth, windowHeight } = useWindowSize();
  return (
    <div className="w-full">
      <div
        className={twMerge("w-full h-full", "flex flex-col justify-between")}
      >
        <CommonContainer containerClassName="py-20">
          <p className="w-3/4 !text-white text-[50px] font-bold text-space_mono uppercase">
            <TypeAnimation
              sequence={[
                "Get ready for the imminent mass adoption of artificial intelligence...",
              ]}
              className="!text-white"
              cursor={false}
            />
          </p>
        </CommonContainer>
        <CommonContainer containerClassName="border-t">
          <div className="grid grid-cols-2">
            <p className="text-xl pt-12 pr-16 pb-4 border-r !text-white">
              <TypeAnimation
                sequence={[
                  `AI technology will serve as a catalyst for innovation by converging
                 various technological fields such as blockchain, energy storage,
                 robotics, and multiomic sequencing....`,
                ]}
                className="!text-white"
                cursor={false}
              />
            </p>
            <p className="text-xl pt-12 ml-16 pb-4 !text-white">
              <TypeAnimation
                sequence={[
                  `Maximize the AI technology to expand the value of your Non-fungible
                 token and add more value... Alpha Quark allows you to mint NFTs
                 using the latest version of image generative AI model.`,
                ]}
                className="!text-white"
                cursor={false}
              />
            </p>
          </div>
          <CommonButton className="w-fit mt-4 mx-auto">Generate</CommonButton>
        </CommonContainer>
        <WaveAnimation width={windowWidth} height={windowHeight / 2.5} />
      </div>
    </div>
  );
};

export default ArtGallery;
