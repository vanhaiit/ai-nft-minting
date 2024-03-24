"use client";

import React, { useEffect, useMemo, useState } from "react";

import CommonContainer from "@/app/_components/CommonContainer";
import { TypeAnimation } from "react-type-animation";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";
import { twJoin } from "tailwind-merge";
import SearchInput from "./_component/SearchInput";
import Filter from "./_component/Filter";
import Navigation from "./_component/Navigation";
import { useLazyGetAllNftQuery } from "@/stores/nft/api";
import { useAccount } from "wagmi";
import DetailNftModal from "./_component/DetailNftModal";

const Generate = () => {
  const account = useAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const [valueFilter, setValueFilter] = useState("Filters");
  const [searchValue, setSearchValue] = useState("");
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);
  const [getAllNft, { isFetching }] = useLazyGetAllNftQuery();
  const [allNft, setAllNft] = useState<any>();
  const [totalPage, setTotalPage] = useState<any>({ totalPage: 0, total: 0 });
  const [hasNft, setHasNft] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [detailData, setDetailData] = useState<any>();

  const handleGetAllNft = async () => {
    const params = {
      limit: LIMIT,
      page: currentPage ? currentPage : 1,
      search: searchValue,
      collectionId: [valueFilter.split("*")[1]],
      walletAddress: account.address,
    };
    const res: any = await getAllNft(params);
    if (res.status === "fulfilled") {
      setHasNft(true);
      setAllNft(res.data.data);
      setTotalPage({
        totalPage: res.data.metadata.totalOfPages,
        total: res.data.metadata.total,
      });
    } else {
      setHasNft(false);
    }
  };

  useEffect(() => {
    if (!account.address) return;
    handleGetAllNft();
  }, [!account.address, currentPage, valueFilter, searchValue]);

  return (
    <CommonContainer
      className={twJoin(
        "flex flex-col h-full gap-y-6 mt-20 mb-10",
        !hasNft && "center-root "
      )}
    >
      {hasNft ? (
        <>
          <div className="flex flex-col font-space text-2xl min-h-16">
            <TypeAnimation
              key={2}
              sequence={[
                "Here are NFTs that you minted...",
                () => setShowText2(true),
              ]}
              wrapper="p"
              cursor={false}
            />

            <span className="flex items-center">
              {showText2 && (
                <TypeAnimation
                  sequence={[
                    "It seems you minted totally",
                    () => setShowText3(true),
                  ]}
                  wrapper="p"
                  cursor={false}
                />
              )}
              {showText3 && (
                <TypeAnimation
                  sequence={[`${totalPage.total}`, () => setShowText4(true)]}
                  wrapper="p"
                  cursor={false}
                  className="text-primary1 mx-4"
                />
              )}
              {showText4 && (
                <TypeAnimation
                  sequence={["AI generated NFTs.."]}
                  wrapper="p"
                  cursor={false}
                />
              )}
            </span>
          </div>
          <div className="space-between-root">
            <SearchInput onClickSearch={(value) => setSearchValue(value)} />
            <Filter
              value={valueFilter}
              defaultValue={valueFilter}
              onChange={(value) => setValueFilter(value)}
            />
          </div>
          <div className="w-full grid grid-cols-4 gap-6">
            {allNft?.map((item: any, index: number) => (
              <button
                onClick={() => {
                  setDetailData(item);
                  setIsOpenModal(true);
                }}
              >
                <img
                  key={index}
                  width={100}
                  height={100}
                  src={`https://yellow-passive-octopus-474.mypinata.cloud/ipfs/${item.image}`}
                  alt=""
                  className="w-full h-full max-w-[312px] max-h-[312px] border border-neutral1 bg-neutral2"
                />
              </button>
            ))}
          </div>
          {allNft.length > 0 && (
            <Navigation
              currentPage={currentPage}
              totalPage={totalPage.totalPage}
              onChange={(value) => setCurrentPage(value)}
            />
          )}
        </>
      ) : (
        <div className="h-full flex-col gap-y-2 center-root">
          <TypeAnimation
            sequence={["There’s no minted NFT yet..."]}
            wrapper="p"
            cursor={false}
            className="text-space text-2xl font-bold"
            key={1}
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
      {detailData && (
        <DetailNftModal
          open={isOpenModal}
          detailData={detailData}
          onCancel={() => setIsOpenModal(false)}
        />
      )}
    </CommonContainer>
  );
};

export default Generate;

const LIMIT = 8;
