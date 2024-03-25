import React, { useState } from "react";
import { twJoin } from "tailwind-merge";
import { ArrowIcon } from "@/app/_components/icon";

const GenerateText: React.FC<GenerateTextProps> = ({
  valueText,
  onChangeValueText,
  onGenerateTextToImg,
}) => {
  return (
    <div
      className={twJoin(
        "p-4",
        "border border-neutral4",
        "w-full h-full min-h-[148px]",
        "flex flex-col justify-between"
      )}
    >
      <textarea
        maxLength={255}
        className="w-full !h-[90px] bg-transparent focus-visible:outline-none"
        style={{ resize: "none" }}
        placeholder="A beautiful forest and futuristic city where there are a lot of
              artistic buildings."
        onChange={(e) => onChangeValueText(e.target.value)}
      >
        {valueText}
      </textarea>
      <button
        className={twJoin(
          "flex items-center gap-x-1 ml-auto text-sm text-neutral4",
          valueText && "text-primary1"
        )}
        onClick={onGenerateTextToImg}
        disabled={!valueText}
      >
        Generate
        <ArrowIcon />
      </button>
    </div>
  );
};

export default GenerateText;

interface GenerateTextProps {
  valueText: string;
  onChangeValueText: (value: string) => void;

  onGenerateTextToImg: () => void;
}
