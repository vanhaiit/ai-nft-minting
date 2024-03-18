import React, { FC, SVGProps } from "react";

const CheckIcon: FC<SVGProps<SVGSVGElement>> = ({ ...otherProps }) => {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" {...otherProps}>
      <path
        d="M20 0V2H19V3H18V4H17V5H16V6H15V7H14V8H13V9H12V10H11V11H10V12H9V13H8V14H6V13H5V12H4V11H3V10H2V9H1V8H0V6H2V7H3V8H4V9H5V10H6V11H8V10H9V9H10V8H11V7H12V6H13V5H14V4H15V3H16V2H17V1H18V0H20Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckIcon;
