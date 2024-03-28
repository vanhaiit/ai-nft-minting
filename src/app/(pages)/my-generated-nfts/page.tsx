/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import CommonContainer from "@/app/_components/CommonContainer";
import { ART_GALLERY } from "@/constants";
import { useGetAllCollectionQuery } from "@/stores/collection/api";
import { useLazyGetAllNftQuery } from "@/stores/nft/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { twJoin } from "tailwind-merge";
import { useAccount } from "wagmi";
import DetailNftModal from "./_component/DetailNftModal";
import Filter from "./_component/Filter";
import Navigation from "./_component/Navigation";
import SearchInput from "./_component/SearchInput";

const Generate = () => {
  const account = useAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const [valueFilter, setValueFilter] = useState("Filters");
  const [searchValue, setSearchValue] = useState("");
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);
  const [getAllNft, { isFetching, isLoading }] = useLazyGetAllNftQuery();
  const [allNft, setAllNft] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<any>({ totalPage: 0, total: 0 });
  const [hasNft, setHasNft] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [detailData, setDetailData] = useState<any>();

  const { data: listCollection } = useGetAllCollectionQuery(
    {
      walletAddress: account?.address,
      status: ["deployed"],
    },
    { skip: !account.address }
  ) as any;

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
  }, [account.address, currentPage, valueFilter, searchValue]);

  return (
    <CommonContainer
      className={twJoin(
        "flex flex-col h-full gap-y-6 mt-20 mb-10",
        !hasNft && "center-root "
      )}
    >
      {allNft.length > 0 && !isLoading && (
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
            <SearchInput onSearch={(value) => setSearchValue(value)} />
            <Filter
              value={valueFilter}
              defaultValue={valueFilter}
              onChange={(value) => setValueFilter(value)}
              data={listCollection}
            />
          </div>
          <div className="w-full grid grid-cols-4 gap-6 min-h-[696px] flex items-start">
            {allNft?.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setDetailData(item);
                  setIsOpenModal(true);
                }}
              >
                <img
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
      )}
      {allNft.length === 0 && !isFetching && (
        <div className="h-full flex-col gap-y-[24px] center-root">
          <TypeAnimation
            sequence={["There’s no minted NFT yet..."]}
            wrapper="p"
            cursor={false}
            className="text-space text-2xl text-white !text-[24px] font-bold"
            key={1}
          />

          <Link
            className="!w-[96px] !h-[32px] bg-neutral2 text-center flex justify-center items-center text-neutral6"
            href={ART_GALLERY}
          >
            Generate
          </Link>
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
