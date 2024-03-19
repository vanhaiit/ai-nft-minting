import React, { ComponentPropsWithoutRef } from "react";
import { StepEnum } from "@/types";
import { twMerge, twJoin } from "tailwind-merge";

const StepNavigation: React.FC<StepNavigationProps> = ({ step }) => {
  return (
    <div
      className={twJoin(
        "w-full h-1",
        "fixed z-50 bottom-4",
        "flex items-center gap-x-4"
      )}
    >
      {Object.values(StepEnum).map((item, index) => (
        <StepNavigationItems
          key={index}
          className={twJoin(item === step && "bg-neutral1")}
        />
      ))}
    </div>
  );
};

export default StepNavigation;

const StepNavigationItems: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <span
      className={twMerge("w-full h-full bg-neutral1/50", className)}
      {...otherProps}
    />
  );
};

interface StepNavigationProps {
  step: StepEnum;
}
