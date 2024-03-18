import React, { useMemo, useState } from "react";
import { ImageAssets } from "../../../../../../public";

import AppProvider from "@/app/_components/AppProvider";
import SearchInput from "./SearchInput";
import Navigation from "./Navigation";
import Image from "next/image";

const ListNft = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dataShow = useMemo(() => {
    return MOCK_DATA_LIST_NFT.slice(currentPage * 8 - 8, currentPage * 8);
  }, [currentPage]);

  return (
    <AppProvider className="flex flex-col h-full gap-y-6 mt-20 mb-10">
      <div className="flex flex-col font-space text-2xl">
        <p>Here are NFTs that you minted...</p>
        <span className="flex items-center">
          It seems you minted totally
          <p className="text-primary1 mx-3">{MOCK_DATA_LIST_NFT.length}</p> AI
          generated NFTs..
        </span>
      </div>
      <SearchInput />
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
    </AppProvider>
  );
};

export default ListNft;

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
