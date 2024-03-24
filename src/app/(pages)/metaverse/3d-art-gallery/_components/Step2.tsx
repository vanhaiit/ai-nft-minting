import React, { useEffect, useState } from "react";
import { StepEnum } from "@/types";
import { twMerge, twJoin } from "tailwind-merge";
import { TypeAnimation } from "react-type-animation";

import MintItem from "./MintItem";
import GenerateFile from "./GenerateFile";
import GenerateText from "./GenerateText";
import CommonContainer from "@/app/_components/CommonContainer";
import CommonButton from "@/app/_components/CommonButton";
import Regenerate from "./Regenerate";

const Step2: React.FC<Step2Props> = ({ onChangeStep, step }) => {
  const [isReGenerate, setIsReGenerate] = useState(false);
  const [urlReGenerate, setUrlReGenerate] = useState("");
  const [isShowCardMint, setIsShowCardMint] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [isGenerateTextToImage, setIsGenerateTextToImage] = useState(false);
  const [valueText, setValueText] = useState("");
  const [isUploadGenerateAiImg, setIsUploadGenerateAiImg] = useState(false);
  const [fileValue, setFileValue] = useState<File>();
  const [reGenerateData, setReGenerateData] = useState<any>();

  const [dataNft1, setDataNft1] = useState({ isMinted: false, urlImage: "" });
  const [dataNft2, setDataNft2] = useState({ isMinted: false, urlImage: "" });
  const [dataNft3, setDataNft3] = useState({ isMinted: false, urlImage: "" });

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
        <div className="flex flex-col gap-y-8 min-h-24">
          <TypeAnimation
            sequence={[
              "Enter keywords as you want...",
              () => setShowText2(true),
            ]}
            wrapper="p"
            cursor={false}
            className="w-3/4 text-2xl font-bold font-space uppercase"
          />
          {showText2 && (
            <TypeAnimation
              sequence={[
                "We will generate and visualize whatever you imagine...",
              ]}
              wrapper="p"
              cursor={false}
              className="w-3/4 text-2xl font-bold font-space uppercase"
            />
          )}
        </div>
        <div className={twJoin("w-full h-full", "flex items-center gap-x-6")}>
          <GenerateText
            valueText={valueText}
            onChangeValueText={(value) => setValueText(value)}
            onGenerateTextToImg={() => {
              setIsShowCardMint(true);
              setIsGenerateTextToImage(!isGenerateTextToImage);
            }}
          />
          <GenerateFile onChangeSelectFile={(value) => setFileValue(value)} />
        </div>
        <CommonButton
          className="w-fit mx-auto"
          onClick={() => {
            setIsShowCardMint(true);
            setIsUploadGenerateAiImg(!isUploadGenerateAiImg);
          }}
          disabled={!valueText || !fileValue}
        >
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
          <Regenerate reGenerateData={reGenerateData} textValue={valueText} />
        ) : (
          <>
            {isShowCardMint && (
              <>
                <MintItem
                  valueText={valueText}
                  valueFile={fileValue}
                  isGenerateTextToImage={isGenerateTextToImage}
                  isUploadGenerateAiImg={isUploadGenerateAiImg}
                  onRegenerate={(value) => {
                    setIsReGenerate(true);
                    setReGenerateData(value);
                  }}
                />
                <MintItem
                  valueText={valueText}
                  valueFile={fileValue}
                  isGenerateTextToImage={isGenerateTextToImage}
                  isUploadGenerateAiImg={isUploadGenerateAiImg}
                  onRegenerate={(value) => {
                    setIsReGenerate(true);
                    setReGenerateData(value);
                  }}
                />
                <MintItem
                  valueText={valueText}
                  valueFile={fileValue}
                  isGenerateTextToImage={isGenerateTextToImage}
                  isUploadGenerateAiImg={isUploadGenerateAiImg}
                  onRegenerate={(value) => {
                    setIsReGenerate(true);
                    setReGenerateData(value);
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
