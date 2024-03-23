"use client";

import React, { useMemo, useState } from "react";

import Image from "next/image";
import CommonContainer from "@/app/_components/CommonContainer";
import { TypeAnimation } from "react-type-animation";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";
import { twJoin } from "tailwind-merge";
import SearchInput from "./_component/SearchInput";
import Filter from "./_component/Filter";
import Navigation from "./_component/Navigation";
import { ImageAssets } from "../../../../public";

const Generate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [valueFilter, setValueFilter] = useState("Filters");

  const dataShow = useMemo(() => {
    return MOCK_DATA_LIST_NFT.slice(currentPage * 8 - 8, currentPage * 8);
  }, [currentPage]);

  return (
    <CommonContainer
      className={twJoin(
        "flex flex-col h-full gap-y-6 mt-20 mb-10",
        MOCK_DATA_LIST_NFT.length < 1 && "center-root "
      )}
    >
      {MOCK_DATA_LIST_NFT.length > 0 ? (
        <>
          <div className="flex flex-col font-space text-2xl">
            <p>Here are NFTs that you minted...</p>
            <span className="flex items-center">
              It seems you minted totally
              <p className="text-primary1 mx-3">
                {MOCK_DATA_LIST_NFT.length}
              </p>{" "}
              AI generated NFTs..
            </span>
          </div>
          <div className="space-between-root">
            <SearchInput />
            <Filter
              value={valueFilter}
              defaultValue={valueFilter}
              onChange={(value) => setValueFilter(value)}
            />
          </div>
          <div className="w-full grid grid-cols-4 gap-6">
            {dataShow.map((item, index) => (
              <Image
                key={index}
                src={item.urlImage}
                alt=""
                className="w-full h-full max-w-[312px] max-h-[312px] border border-neutral1 bg-neutral2"
              />
            ))}
          </div>
          <Navigation
            currentPage={currentPage}
            totalPage={Math.ceil(MOCK_DATA_LIST_NFT.length / 8)}
            onChange={(value) => setCurrentPage(value)}
          />
        </>
      ) : (
        <div className="h-full flex-col gap-y-2 center-root">
          <TypeAnimation
            sequence={["There’s no minted NFT yet..."]}
            className="text-space text-2xl font-bold"
            cursor={true}
          />
          <CommonButton
            className="w-fit"
            variant={CommonButtonVariantEnum.outline}
            isShowArrow={false}
          >
            Generate
          </CommonButton>
        </div>
      )}
    </CommonContainer>
  );
};

export default Generate;

const MOCK_DATA_LIST_NFT = [
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo2Image },
  { urlImage: ImageAssets.Demo2Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
  { urlImage: ImageAssets.Demo3Image },
];
