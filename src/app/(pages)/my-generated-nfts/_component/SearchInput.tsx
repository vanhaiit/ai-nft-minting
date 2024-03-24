"use client";

import React, { useEffect, useState } from "react";
import { SearchIcon } from "@/app/_components/icon";
import CommonInput, { CommonInputProps } from "@/app/_components/CommonInput";
let timer: any;
const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  ...otherProps
}) => {
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onSearch?.(valueInput);
    }, 500);
  }, [valueInput]);

  return (
    <CommonInput
      value={valueInput}
      className="pr-8"
      endAdornment={
        <SearchIcon className="text-neutral1 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" />
      }
      placeholder="Find my NFTs"
      onChange={(e) => setValueInput(e.target.value)}
      {...otherProps}
    />
  );
};

export default SearchInput;

interface SearchInputProps extends CommonInputProps {
  onSearch?: (value: string) => void;
}
