"use client";
import React, { useEffect } from "react";
import { useWindowSize } from "@/hooks";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";
import CommonContainer from "@/app/_components/CommonContainer";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";
import WaveAnimation from "@/app/_components/WaveAnimation";
import { useState } from "react";
import CommonModal from "@/app/_components/CommonModal";
import { StepEnum } from "@/types";
import { debounce } from "lodash";

const Step1: React.FC<Step1Props> = ({ onChangeStep }) => {
  const { windowWidth, windowHeight } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<any>({});

  const handleResize = debounce(() => {
    setSize({
      width: windowWidth,
      height: windowHeight,
    });
  }, 2000);

  useEffect(() => {
    handleResize();
  }, [windowWidth, windowHeight]);

  return (
    <div className="w-full">
      <div
        className={twMerge("w-full h-full", "flex flex-col justify-between")}
      >
        <CommonContainer containerClassName="py-20" className="min-h-[255px]">
          <p className="w-3/4 !text-white text-[50px] font-bold text-space_mono uppercase">
            <TypeAnimation
              sequence={[
                "Get ready for the imminent mass adoption of artificial intelligence...",
              ]}
              className="!text-white "
              cursor={true}
            />
          </p>
        </CommonContainer>
        <CommonContainer containerClassName="border-t">
          <div className="grid grid-cols-2 min-h-[234px]">
            <p className="text-xl pt-12 pr-16 pb-4 border-r !text-white">
              <TypeAnimation
                sequence={[
                  `AI technology will serve as a catalyst for innovation by converging
                 various technological fields such as blockchain, energy storage,
                 robotics, and multiomic sequencing....`,
                ]}
                className="!text-white "
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
                cursor={true}
              />
            </p>
          </div>
          <CommonButton
            className="w-fit mt-4 mx-auto"
            onClick={() => onChangeStep(StepEnum.STEP_2)}
          >
            Generate
          </CommonButton>
        </CommonContainer>
        <WaveAnimation width={size.width} height={size.height / 2.5} />
      </div>
      <CommonModal open={isOpen} onCancel={() => setIsOpen(false)}>
        <div className="center-root flex-col gap-y-3">
          <p className="text-xl">Congrats!</p>
          <p>
            It seems that you’re already an Alpha Quark Token holder! You can
            use the latest version of AI model to generate images!
          </p>
          <CommonButton
            variant={CommonButtonVariantEnum.primary}
            isShowArrow={false}
            className="text-sm"
          >
            I got it
          </CommonButton>
        </div>
      </CommonModal>
    </div>
  );
};

export default Step1;

interface Step1Props {
  onChangeStep: (value: StepEnum) => void;
}
