"use client";

import React, { ChangeEvent, useState } from "react";
import { twJoin } from "tailwind-merge";
import { ArrowIcon, FileIcon } from "@/app/_components/icon";
import CommonModal from "@/app/_components/CommonModal";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";

const GenerateFile: React.FC<GenerateFileProp> = ({ onChangeSelectFile }) => {
  const [listFileName, setListFileName] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length !== 0) {
      const selectedFile = event.target.files[0];
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/postscript",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (
        !allowedTypes.includes(selectedFile.type) ||
        selectedFile.size > maxSize
      ) {
        return setError(true);
      }
      const newList = [...listFileName];
      newList.push(selectedFile.name);
      setListFileName(newList);
      onChangeSelectFile(selectedFile);
    }
  };

  return (
    <>
      <div
        className={twJoin(
          "p-4",
          "border border-neutral4",
          "w-full max-h-[148px] h-[148px] overflow-auto",
          "flex flex-col justify-between"
        )}
      >
        {listFileName.length > 0 ? (
          <div className="flex flex-col gap-y-2 mb-3">
            {listFileName.map((item, index) => (
              <div
                className={twJoin(
                  "pb-2 border-b",
                  "flex items-center gap-x-1",
                  index === listFileName.length - 1 &&
                    "text-primary1 border-b-primary1"
                )}
                key={index}
              >
                <FileIcon />
                <p>{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral1 font-roboto_mono">
            Upload your image that you want to make the AI model refer to
          </p>
        )}

        <div className="w-[72px] h-5 overflow-hidden relative ml-auto [&>.text]:hover:!text-primary1 !cursor-pointer">
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleChange}
            className="opacity-0 w-17 !cursor-pointer"
          />
          <div className="text absolute top-0 flex items-center gap-x-1 text-sm text-neutral4 -z-10 !cursor-pointer">
            Select
            <ArrowIcon />
          </div>
        </div>
      </div>
      <CommonModal
        className="!w-[509px] h-[calc(100svh-200px)] flex items-center"
        open={error}
        onCancel={() => setError(false)}
      >
        <div className="flex flex-col gap-y-6 items-center">
          <div className="flex flex-col items-center gap-y-4 text-center">
            <p className="text-[16px] text-white">
              You can only upload maximum 5Mb per files
            </p>
          </div>
          <CommonButton
            variant={CommonButtonVariantEnum.outline}
            isShowArrow={false}
            className="w-fit text-sm"
            onClick={() => setError(false)}
          >
            Ok
          </CommonButton>
        </div>
      </CommonModal>
    </>
  );
};

export default GenerateFile;

interface GenerateFileProp {
  onChangeSelectFile: (value: File) => void;
}
