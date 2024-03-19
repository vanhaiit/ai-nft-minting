import React, { Fragment } from "react";
import { NextIcon } from "@/app/_components/icon";
import { Select, SelectProps } from "antd";

const Filter: React.FC<FilterProps> = ({ defaultValue, ...otherProps }) => {
  return MOCK_LIST_COLLECTION.length > 0 ? (
    <Select
      defaultValue={defaultValue}
      style={{
        width: "fit-content",
        background: "rgb(0,0,0,0)",
        color: "#FFFFFF",
      }}
      options={MOCK_LIST_COLLECTION.map((item) => {
        return { value: item, label: item };
      })}
      dropdownStyle={{
        border: "1px solid #FFFFFF",
        padding: "8px 0",
        width: 166,
        background: "black",
      }}
      suffixIcon={<NextIcon className="rotate-90 text-neutral1" />}
      {...otherProps}
    />
  ) : (
    <Fragment />
  );
};

export default Filter;

interface FilterProps extends SelectProps {
  defaultValue: string;
  value: string;
}

export const MOCK_LIST_COLLECTION = [
  "Alpha Quark 1 NFTs",
  "Alpha Quark 2 NFTs",
  "BAYC AI-generated",
  "Alpha Quark 3 NFTs",
  "Alpha Quark 4 NFTs",
  "Alpha Quark 5 NFTs",
  "Alpha Quark 6 NFTs",
  "Alpha Quark 7 NFTs",
  "Alpha Quark 8 NFTs",
  "Alpha Quark 9 NFTs",
];
