"use client";

import React, { useState } from "react";
import { SearchIcon } from "@/app/_components/icon";
import CommonInput, { CommonInputProps } from "@/app/_components/CommonInput";

const SearchInput: React.FC<SearchInputProps> = ({
  onClickSearch,
  ...otherProps
}) => {
  const [valueInput, setValueInput] = useState("");

  return (
    <CommonInput
      value={valueInput}
      className="pr-8"
      endAdornment={
        <SearchIcon
          className="text-neutral1 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          onClick={() => onClickSearch(valueInput)}
        />
      }
      placeholder="Find my NFTs"
      onChange={(e) => setValueInput(e.target.value)}
      {...otherProps}
    />
  );
};

export default SearchInput;

interface SearchInputProps extends CommonInputProps {
  onClickSearch: (value: string) => void;
}
