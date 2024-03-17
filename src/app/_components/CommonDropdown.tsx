"use client";

import React, { ReactNode, useState } from "react";
import { twJoin } from "tailwind-merge";
import { Dropdown, DropdownProps } from "antd";

const CommonDropdown: React.FC<CommonDropdownProps> = ({
  children,
  contentDropdown,
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
          className={twJoin(
            "w-full ",
            "mt-[25px]",
            "bg-neutral2",
            "flex flex-col",
            "text-neutral1 center-root"
          )}
        >
          {contentDropdown}
        </div>
      )}
      {...otherProps}
    >
      <button onClick={() => setIsOpen(true)}>{children}</button>
    </Dropdown>
  );
};

export default CommonDropdown;

interface CommonDropdownProps extends DropdownProps {
  contentDropdown: ReactNode;
}
