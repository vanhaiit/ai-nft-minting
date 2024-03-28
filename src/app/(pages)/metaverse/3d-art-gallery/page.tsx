"use client";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import { StepEnum } from "@/types";
import StepNavigation from "./_components/StepNavigation";
import CommonModal from "@/app/_components/CommonModal";
import { useAppSelector } from "@/libs/redux/store";
import { useAccount } from "wagmi";
import { getAtpBalance } from "@/stores/app/selectors";
import CommonButton, {
  CommonButtonVariantEnum,
} from "@/app/_components/CommonButton";

const ArtGallery = () => {
  const account = useAccount();
  const balance = useAppSelector(getAtpBalance);
  const confirmAlert = localStorage.getItem("ConfirmAlert");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [step, setStep] = useState<StepEnum>(StepEnum.STEP_1);
  const [contentModal, setContentModal] = useState<any>();

  function handleConfirm() {
    localStorage.setItem("ConfirmAlert", "CONFIRMED");
  }

  useEffect(() => {
    if (confirmAlert) return;
    setIsOpenModal(true);
    if (!account.address) return setContentModal(<Fragment />);
    if (balance < 50) {
      setContentModal({
        class: "!w-[605px] h-[calc(100svh-200px)] flex items-center",
        content: (
          <div className="flex flex-col items-center gap-y-4 text-center">
            <p className="text-[20px] font-medium">Oops,</p>
            <span className="text-[16px]">
              It seems that do not hold any Alpha Quark Token yet. If you hold{" "}
              <p className="text-primary1 inline-block">50 AQT</p> on your
              wallet, then you can use the latest version of AI model to
              generate images freely!
            </span>
          </div>
        ),
      });
    } else {
      setContentModal({
        class: "!w-[610px] h-[calc(100svh-200px)] flex items-center",
        content: (
          <div className="flex flex-col items-center gap-y-4 text-center">
            <p className="text-[20px] font-medium">Congrats!</p>
            <div className="flex flex-col w-full">
              <p className="text-[16px] -tracking-[1.5px]">
                It seems that you’re already an Alpha Quark Token holder!
              </p>
              <p className="text-[16px] -tracking-[1.5px]">
                You can use the latest version of AI model to generate images!
              </p>
            </div>
          </div>
        ),
      });
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

      {account.address && (
        <CommonModal
          className={contentModal?.class}
          open={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
        >
          <div className="flex flex-col gap-y-6 items-center">
            {contentModal?.content}
            <CommonButton
              variant={CommonButtonVariantEnum.outline}
              isShowArrow={false}
              className="w-fit text-sm"
              onClick={() => {
                setIsOpenModal(false);
                handleConfirm();
              }}
            >
              I got it
            </CommonButton>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default ArtGallery;
