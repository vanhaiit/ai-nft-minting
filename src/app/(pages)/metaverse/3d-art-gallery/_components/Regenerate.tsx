import React, { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const Regenerate: React.FC<RegenerateProps> = ({
  urlImage,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={twMerge(
        "w-[424px] h-[424px] relative hover:border-4 border-primary1",
        "[&>.coating]:hover:!flex",
        className
      )}
      {...otherProps}
    >
      <Image
        src={urlImage}
        alt=""
        className="w-full h-full absolute top-0 left-0 -z-10"
      />
      <div className="coating w-full hidden h-full flex-col items-center justify-center px-11 bg-black1/80 gap-y-2 ">
        <p className="font-medium">
          I do not like this image. I want to regenerate one more.
        </p>
        <button className="border border-neutral1 text-sm py-2 px-4 w-fit">
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default Regenerate;

interface RegenerateProps extends ComponentPropsWithoutRef<"div"> {
  urlImage: string;
}
