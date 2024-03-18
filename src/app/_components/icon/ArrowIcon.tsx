import React, { FC, SVGProps } from "react";

const ArrowIcon: FC<SVGProps<SVGSVGElement>> = ({ ...otherProps }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_1_308)">
        <path
          d="M10.7812 7.33336L7.20517 3.75736L8.14784 2.8147L13.3332 8.00003L8.14784 13.1854L7.20517 12.2427L10.7812 8.6667H2.6665V7.33336H10.7812Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_308">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowIcon;
