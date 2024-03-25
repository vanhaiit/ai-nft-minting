import { fetchGenerateAiImage } from "@/helpers";
import Image from "next/image";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";
import { ImageAssets } from "../../../../../../public";

const Regenerate: React.FC<RegenerateProps> = ({
  textValue,
  reGenerateData,
  className,
  ...otherProps
}) => {
  const [isReGenerate, setIsReGenerate] = useState(false);
  const [isReGenerateImageError, setIsReGenerateImageError] = useState(false);
  const [dataImg, setDataImg] = useState<any>({
    dataImg: undefined,
    urlImage: "",
  });
  const isMinted = false;

  const handleReGenerate = async () => {
    setIsReGenerate(true);
    let bodyData = new FormData();
    bodyData.append("file", dataImg.dataImg);
    bodyData.append("input", textValue);
    const res = await fetchGenerateAiImage(bodyData);

    if (res.dataImg) {
      setDataImg(res);
    } else {
      setIsReGenerateImageError(true);
    }
    setIsReGenerate(false);
  };
  useEffect(() => {
    setDataImg(reGenerateData);
  }, [reGenerateData]);

  return (
    <div
      className={twMerge(
        "w-[424px] h-[424px] relative hover:border-4 border-primary1",
        "[&>.coating]:hover:!flex",
        className
      )}
      {...otherProps}
    >
      {isReGenerateImageError ? (
        <TypeAnimation
          sequence={["Generate Ai Image Error"]}
          wrapper="p"
          cursor={true}
        />
      ) : (
        <>
          {!isReGenerate && dataImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              width={100}
              height={100}
              src={dataImg.urlImage}
              alt=""
              className="w-full h-full absolute top-0 left-0 -z-10"
            />
          ) : (
            <div className="w-full h-full center-root gap-y-4 flex-col">
              <Image
                src={ImageAssets.LoadingImage}
                alt=""
                width={64}
                height={64}
                className="animate-spin"
              />
              <TypeAnimation
                sequence={["Regenerating the image..."]}
                wrapper="p"
                cursor={true}
              />
            </div>
          )}
        </>
      )}

      {!isReGenerate && (
        <div className="coating w-full hidden h-full flex-col items-center justify-center px-11 bg-black1/80 gap-y-2 ">
          <p className="font-medium">
            I do not like this image. I want to regenerate one more.
          </p>
          <button
            className="border border-neutral1 text-sm py-2 px-4 w-fit"
            onClick={() => handleReGenerate()}
          >
            Regenerate
          </button>
        </div>
      )}
    </div>
  );

  // <div
  //   className={twMerge(
  //     "relative",
  //     "container",
  //     "bg-neutral2",
  //     "center-root",
  //     !isMinted && "cursor-pointer",
  //     "translate-hidden",
  //     "border-4 border-transparent",
  //     "w-full h-full max-w-[420px] max-h-[420px] hover:border-primary1",
  //     isMinted && "border-primary1 disable",
  //     "[&>.button]:hover:bg-primary1 ",
  //     "[&~.icon]:hover:block",
  //     className
  //   )}
  //   {...otherProps}
  // >
  //   {dataImg.dataImg ? (
  //     <Image
  //       src={dataImg.urlImage}
  //       width={100}
  //       height={100}
  //       alt=""
  //       className="w-full h-full"
  //     />
  //   ) : (
  //     <div className="w-full h-[408px] flex flex-col center-root gap-y-2">
  //       {isReGenerateImageError ? (
  //         <TypeAnimation
  //           sequence={["Generate Ai Image Error"]}
  //           wrapper="p"
  //           cursor={true}
  //         />
  //       ) : (
  //         <>
  //           <Image
  //             src={ImageAssets.LoadingImage}
  //             alt=""
  //             width={64}
  //             height={64}
  //             className="animate-spin"
  //           />
  //           <TypeAnimation
  //             sequence={["Generating the image..."]}
  //             wrapper="p"
  //             cursor={true}
  //           />
  //         </>
  //       )}
  //     </div>
  //   )}

  //   <button
  //     className={twJoin(
  //       "button",
  //       "py-4",
  //       "w-full",
  //       "button",
  //       isMinted ? "bg-primary1 text-black" : "bg-black1/70",
  //       "center-root gap-x-2",
  //       "absolute bottom-0 left-0"
  //     )}
  //     // disabled={isMinted || isGenerateImageError || !dataImg.dataImg}
  //   >
  //     {isMinted && <CheckIcon className={twJoin("icon", "text-black1")} />}
  //     Mint
  //   </button>
  // </div>
};

export default Regenerate;

interface RegenerateProps extends ComponentPropsWithoutRef<"div"> {
  textValue: string;
  reGenerateData: any;
}
