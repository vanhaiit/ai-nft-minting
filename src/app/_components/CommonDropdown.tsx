"use client";

import React, { ReactNode, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { Dropdown, DropdownProps } from "antd";

const CommonDropdown: React.FC<CommonDropdownProps> = ({
  children,
  contentDropdown,
  className,
  ...otherProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      trigger={["click"]}
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}
      dropdownRender={() => (
        <div
          className={twMerge(
            "w-full",
            "mt-[25px]",
            "bg-neutral2",
            "flex flex-col",
            "text-neutral1 center-root font-roboto",
            className
          )}
        >
          {contentDropdown}
        </div>
      )}
      className="!font-roboto"
      {...otherProps}
    >
      <button onClick={() => setIsOpen(true)}>{children}</button>
    </Dropdown>
  );
};

export default CommonDropdown;

export interface CommonDropdownProps extends DropdownProps {
  contentDropdown: ReactNode;
}
