import { Dropdown, DropdownProps } from "antd";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const CommonDropdown: React.FC<CommonDropdownProps> = ({
  children,
  contentDropdown,
  className,
  ...otherProps
}) => {
  return (
    <Dropdown
      dropdownRender={() => (
        <div
          className={twMerge(
            "w-full",
            "mt-[25px]",
            "bg-neutral2",
            "flex flex-col",
            "text-neutral1 center-root font-roboto_mono",
            className
          )}
        >
          {contentDropdown}
        </div>
      )}
      className="!font-roboto_mono"
      {...otherProps}
    >
      <button>{children}</button>
    </Dropdown>
  );
};

export default CommonDropdown;

export interface CommonDropdownProps extends DropdownProps {
  contentDropdown: ReactNode;
}
