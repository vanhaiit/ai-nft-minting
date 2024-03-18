"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const WrapperPage: React.FC<WrapperPageProps> = ({
  children,
  className,
  containerClassName,
  ...otherProps
}) => {
  return (
    <div className={twMerge("w-full", containerClassName)} {...otherProps}>
      <div
        className={twMerge(
          "w-full max-w-[1300px]",
          "mx-auto",
          "flex flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default WrapperPage;

interface WrapperPageProps extends ComponentPropsWithoutRef<"div"> {
  containerClassName?: string;
}
