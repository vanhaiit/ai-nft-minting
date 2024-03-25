import React, { ComponentPropsWithRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { LongArrowIcon } from "./icon";

const CommonButton: React.FC<CommonButtonProps> = ({
  variant = CommonButtonVariantEnum.default,
  isShowArrow = true,
  className,
  children,
  ...otherProps
}) => {
  const variantStyle = useMemo(() => {
    switch (variant) {
      case CommonButtonVariantEnum.default:
        return "text-neutral1 border-neutral1";
      case CommonButtonVariantEnum.primary:
        return "bg-primary1 text-black1 border-primary1";
      case CommonButtonVariantEnum.outline:
        return "bg-primary2 text-primary1 border-0";
      default:
        return "";
    }
  }, [variant]);

  return (
    <button
      className={twMerge(
        "border",
        "relative",
        "py-2 pl-4",
        // "font-roboto",
        isShowArrow ? "pr-8" : "pr-4",
        variantStyle,
        className
      )}
      {...otherProps}
    >
      {children}
      {isShowArrow && (
        <LongArrowIcon className="absolute top-1/2 -right-6 -translate-y-1/2" />
      )}
    </button>
  );
};

export default CommonButton;

export interface CommonButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: CommonButtonVariantEnum;
  isShowArrow?: boolean;
}

export enum CommonButtonVariantEnum {
  default = "default",
  primary = "primary",
  outline = "outline",
}
