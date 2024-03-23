import React, { useEffect, useState } from "react";
import { StepEnum } from "@/types";
import { twMerge, twJoin } from "tailwind-merge";
import { TypeAnimation } from "react-type-animation";
import { ImageAssets } from "../../../../../../public";

import MintItem from "./MintItem";
import GenerateFile from "./GenerateFile";
import GenerateText from "./GenerateText";
import CommonContainer from "@/app/_components/CommonContainer";
import CommonButton from "@/app/_components/CommonButton";
import Regenerate from "./Regenerate";

const sequence = [
  "Enter keywords as you want...",
  "We will generate and visualize whatever you imagine...",
];

const Step2: React.FC<Step2Props> = ({ onChangeStep, step }) => {
  const [isReGenerate, setIsReGenerate] = useState(false);
  const [urlReGenerate, setUrlReGenerate] = useState("");
  const [isShowCardMint, setIsShowCardMint] = useState(false);
  const [showText2, setShowText2] = useState(false);

  const [dataNft1, setDataNft1] = useState({ isMinted: false, urlImage: "" });
  const [dataNft2, setDataNft2] = useState({ isMinted: false, urlImage: "" });
  const [dataNft3, setDataNft3] = useState({ isMinted: false, urlImage: "" });

  const handleUpload = () => {
    setIsShowCardMint(true);
    setTimeout(() => {
      setDataNft1({ isMinted: false, urlImage: ImageAssets.Demo1Image });
    }, 2000);
    setTimeout(() => {
      setDataNft2({ isMinted: false, urlImage: ImageAssets.Demo2Image });
    }, 4000);
    setTimeout(() => {
      setDataNft3({ isMinted: false, urlImage: ImageAssets.Demo3Image });
    }, 6000);
  };

  useEffect(() => {
    if (dataNft1.urlImage && dataNft2.urlImage && dataNft3.urlImage) {
      onChangeStep(StepEnum.STEP_3);
      return;
    }
  }, [dataNft1, dataNft2, dataNft3]);

  return (
    <div className={twMerge("w-full h-full", "flex flex-col ")}>
      <CommonContainer
        containerClassName="w-full pt-20 pb-6"
        className="justify-center gap-y-8"
      >
        <TypeAnimation
          sequence={["Enter keywords as you want...", () => setShowText2(true)]}
          wrapper="p"
          cursor={true}
          className="w-3/4 text-2xl font-bold font-space uppercase"
        />
        {showText2 && (
          <TypeAnimation
            sequence={[
              "We will generate and visualize whatever you imagine...",
            ]}
            wrapper="p"
            cursor={true}
            className="w-3/4 text-2xl font-bold font-space uppercase"
          />
        )}
        <div className={twJoin("w-full h-full", "flex items-center gap-x-6")}>
          <GenerateText />
          <GenerateFile />
        </div>
        <CommonButton className="w-fit mx-auto" onClick={handleUpload}>
          Upload
        </CommonButton>
      </CommonContainer>
      <CommonContainer
        containerClassName="border-t py-10"
        className={twJoin(
          isReGenerate ? "center-root" : "flex-row space-between-root gap-x-6"
        )}
      >
        {isReGenerate ? (
          <Regenerate urlImage={urlReGenerate} />
        ) : (
          <>
            {isShowCardMint && (
              <>
                <MintItem
                  urlImage={dataNft1.urlImage}
                  isMinted={dataNft1.isMinted}
                  onRegenerate={() => {
                    setIsReGenerate(true);
                    setUrlReGenerate(dataNft1.urlImage);
                  }}
                />
                <MintItem
                  urlImage={dataNft2.urlImage}
                  isMinted={dataNft2.isMinted}
                  onRegenerate={() => {
                    setIsReGenerate(true);
                    setUrlReGenerate(dataNft2.urlImage);
                  }}
                />
                <MintItem
                  urlImage={dataNft3.urlImage}
                  isMinted={dataNft3.isMinted}
                  onRegenerate={() => {
                    setIsReGenerate(true);
                    setUrlReGenerate(dataNft3.urlImage);
                  }}
                />
              </>
            )}
          </>
        )}
      </CommonContainer>
    </div>
  );
};

export default Step2;

interface Step2Props {
  step: StepEnum;
  onChangeStep: (value: StepEnum) => void;
}
