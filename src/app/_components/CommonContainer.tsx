import React, { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const CommonContainer: React.FC<PageProps> = ({
  children,
  className,
  containerClassName,
  ...otherProps
}) => {
  return (
    <div className={twMerge("w-full", containerClassName)} {...otherProps}>
      <div
        className={twMerge(
          "w-full max-w-[1320px]",
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

export default CommonContainer;

interface PageProps extends ComponentPropsWithoutRef<"div"> {
  containerClassName?: string;
}
