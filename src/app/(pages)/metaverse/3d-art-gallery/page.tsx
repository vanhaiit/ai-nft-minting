"use client";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import { StepEnum } from "@/types";
import StepNavigation from "./_components/StepNavigation";
import CommonModal from "@/app/_components/CommonModal";
import { useAppDispatch, useAppSelector } from "@/libs/redux/store";
import { useAccount } from "wagmi";
import { getAtpBalance } from "@/stores/app/selectors";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";

const ArtGallery = () => {
  const account = useAccount();
  const balance = useAppSelector(getAtpBalance);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [step, setStep] = useState<StepEnum>(StepEnum.STEP_1);
  const [contentModal, setContentModal] = useState<ReactNode>();

  useEffect(() => {
    setIsOpenModal(true);
    if (!account.address) return setContentModal(<Fragment />);
    if (balance < 50) {
      setContentModal(
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-xl font-medium">Oops,</p>
          <span>
            It seems that do not hold any Alpha Quark Token yet. If you hold{" "}
            <p className="text-primary1 inline-block">50 AQT</p> on your wallet,
            then you can use the latest version of AI model to generate images
            freely!
          </span>
        </div>
      );
    } else {
      setContentModal(
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-xl font-medium">Congrats!</p>
          <p>
            It seems that you’re already an Alpha Quark Token holder! You can
            use the latest version of AI model to generate images!{" "}
          </p>
        </div>
      );
    }
  }, [balance, account.address]);

  return (
    <>
      {step === StepEnum.STEP_1 ? (
        <Step1 onChangeStep={setStep} />
      ) : (
        <Step2 onChangeStep={setStep} step={step} />
      )}
      <StepNavigation step={step} onChangeStep={(value) => setStep(value)} />

      <CommonModal open={isOpenModal} onCancel={() => setIsOpenModal(false)}>
        <div className="flex flex-col gap-y-6 items-center">
          {contentModal}
          <CommonButton
            variant={CommonButtonVariantEnum.primary}
            isShowArrow={false}
            className="w-fit text-sm"
            onClick={() => setIsOpenModal(false)}
          >
            I got it
          </CommonButton>
        </div>
      </CommonModal>
    </>
  );
};

export default ArtGallery;
