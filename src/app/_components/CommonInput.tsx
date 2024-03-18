"use client";

import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const CommonInput: React.FC<CommonInputProps> = ({
  endAdornment,
  className,
  ...otherProps
}) => {
  return (
    <div className={twMerge("w-fit h-fit", "relative")}>
      <input
        className={twMerge(
          "text-sm",
          "px-2 py-3",
          "w-64 h-11",
          "bg-inherit",
          "border border-neutral1",
          "focus-visible:outline-none",
          className
        )}
        {...otherProps}
      />
      {endAdornment}
    </div>
  );
};

export default CommonInput;

export interface CommonInputProps extends ComponentPropsWithoutRef<"input"> {
  endAdornment?: ReactNode;
}
