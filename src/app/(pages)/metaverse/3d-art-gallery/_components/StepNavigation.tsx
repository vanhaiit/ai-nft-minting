import React, { ComponentPropsWithoutRef } from "react";
import { StepEnum } from "@/types";
import { twMerge, twJoin } from "tailwind-merge";

const StepNavigation: React.FC<StepNavigationProps> = ({
  step,
  onChangeStep,
}) => {
  return (
    <div
      className={twJoin(
        "w-full h-1 py-3",
        "fixed z-50 bottom-0",
        "items-center gap-x-4 bg-black1",
        Number(step) < 4 ? "flex" : "hidden"
      )}
    >
      <StepNavigationItems
        className={twJoin(StepEnum.STEP_1 === step && "bg-neutral1")}
        onClick={() => onChangeStep(StepEnum.STEP_1)}
      />
      <StepNavigationItems
        className={twJoin(StepEnum.STEP_2 === step && "bg-neutral1")}
        onClick={() => onChangeStep(StepEnum.STEP_2)}
      />
      <StepNavigationItems
        className={twJoin(StepEnum.STEP_3 === step && "bg-neutral1")}
      />
    </div>
  );
};

export default StepNavigation;

const StepNavigationItems: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  onClick,
  ...otherProps
}) => {
  return (
    <div className="w-full h-[30px] p-2  cursor-pointer" onClick={onClick}>
      <span
        className={twMerge("w-full h-1 flex bg-neutral1/50 ", className)}
        {...otherProps}
      />
    </div>
  );
};

interface StepNavigationProps {
  step: StepEnum;
  onChangeStep: (value: StepEnum) => void;
}
