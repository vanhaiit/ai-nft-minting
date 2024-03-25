/* eslint-disable @next/next/no-img-element */
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";
import CommonModal from "@/app/_components/CommonModal";
import { useGetDetailCollectionQuery } from "@/stores/collection/api";
import { ModalProps } from "antd";
import React from "react";

const DetailNftModal: React.FC<DetailNftModalProps> = ({
  detailData,
  onCancel,
  ...otherProps
}) => {
  const { data = {} } = useGetDetailCollectionQuery(
    { id: detailData.collectionId },
    {
      skip: !detailData?.collectionId,
    }
  );

  return (
    <CommonModal {...otherProps}>
      <div className="w-full h-full flex flex-col gap-y-4">
        <p className="text-2xl font-medium">NFT Detail</p>

        <div className="flex flex-col gap-y-2">
          <p className="font-medium">NFT collection</p>
          <p className="text-sm">{data.name}</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-medium">NFT Type</p>
          <p className="text-sm">{data.type}</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-medium">Image</p>
          <img
            alt=""
            src={`https://yellow-passive-octopus-474.mypinata.cloud/ipfs/${detailData?.image}`}
            width={180}
            height={180}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-medium">Title of NFT</p>
          <p className="w-full p-4 border text-sm">{detailData?.name}</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className=" font-medium">Current Owner</p>
          <p className="w-full p-4 border text-sm">{data?.contract?.address}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-medium">Description</p>
          <p className="w-full p-4 border text-sm">{detailData?.description}</p>
        </div>
        <CommonButton
          variant={CommonButtonVariantEnum.outline}
          isShowArrow={false}
          onClick={onCancel}
          className="w-fit text-sm"
        >
          Close
        </CommonButton>
      </div>
    </CommonModal>
  );
};

export default DetailNftModal;

interface DetailNftModalProps extends ModalProps {
  detailData: any;
}
