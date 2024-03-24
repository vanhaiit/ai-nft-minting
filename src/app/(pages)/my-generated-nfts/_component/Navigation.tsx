"use client";

import React from "react";
import { NextIcon } from "@/app/_components/icon";
import { twJoin } from "tailwind-merge";

const Navigation: React.FC<NavigationProps> = ({
  totalPage,
  currentPage,
  onChange,
}) => {
  const handleNext = () => {
    onChange(currentPage + 1);
  };
  const handlePre = () => {
    onChange(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-x-2 mx-auto">
      <button onClick={() => handlePre()} disabled={currentPage <= 1}>
        <NextIcon
          className={twJoin(
            "rotate-180",
            currentPage <= 1 && "text-neutral1/50"
          )}
        />
      </button>
      <p className="text-primary1">{currentPage}</p>/<p>{totalPage}</p>
      <button onClick={() => handleNext()} disabled={currentPage >= totalPage}>
        <NextIcon
          className={twJoin(currentPage >= totalPage && "text-neutral1/50")}
        />
      </button>
    </div>
  );
};

export default Navigation;

interface NavigationProps {
  totalPage: number;
  currentPage: number;
  onChange: (value: number) => void;
}
