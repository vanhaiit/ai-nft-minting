"use client";

import React from "react";
import { SearchIcon } from "@/app/_components/icon";
import CommonInput, { CommonInputProps } from "@/app/_components/CommonInput";

const SearchInput: React.FC<CommonInputProps> = () => {
  return (
    <CommonInput
      className="pr-8"
      endAdornment={
        <SearchIcon className="text-neutral1 absolute top-1/2 right-3 -translate-y-1/2" />
      }
      placeholder="Find my NFTs"
    />
  );
};

export default SearchInput;
