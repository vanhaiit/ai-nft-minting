import React, { Fragment, useEffect } from "react";
import { NextIcon } from "@/app/_components/icon";
import { Select, SelectProps } from "antd";

const Filter: React.FC<FilterProps> = ({
  defaultValue,
  onInitValue,
  data,
  ...otherProps
}) => {
  useEffect(() => {
    if (data?.length > 0) {
      onInitValue?.(
        `${data[0].contract.address}*${data[0].id}*${data[0].contract.type}`
      );
    }
  }, [data]);

  return data?.length > 0 ? (
    <Select
      defaultValue={defaultValue}
      style={{
        width: "fit-content",
        background: "rgb(0,0,0,0)",
        color: "#FFFFFF",
      }}
      options={data?.map((item: any) => {
        return {
          value: `${item.contract.address}*${item.id}*${item.contract.type}`,
          label: item.name,
        };
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
  data: any;
  onInitValue?: (value: any) => void;
}
