"use client";

import React, { ChangeEvent, useState } from "react";
import { twJoin } from "tailwind-merge";
import { ArrowIcon, FileIcon } from "@/app/_components/icon";

const GenerateFile: React.FC<GenerateFileProp> = ({ onChangeSelectFile }) => {
  const [listFileName, setListFileName] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string | ArrayBuffer>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length !== 0) {
      const newList = [...listFileName];
      newList.push(event.target.files[0].name);
      setListFileName(newList);
      onChangeSelectFile(event.target.files[0]);
    }
  };

  return (
    <div
      className={twJoin(
        "p-4",
        "border border-neutral4",
        "w-full h-full min-h-[148px]",
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
        <p className="text-neutral1 font-roboto">
          Upload your image that you want to make the AI model refer to
        </p>
      )}

      <div className="w-[72px] h-5 overflow-hidden relative ml-auto [&>.text]:hover:!text-primary1">
        <input type="file" onChange={handleChange} className="opacity-0 w-17" />
        <div className="text absolute top-0 flex items-center gap-x-1 text-sm text-neutral4 -z-10">
          Select
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default GenerateFile;

interface GenerateFileProp {
  onChangeSelectFile: (value: File) => void;
}
