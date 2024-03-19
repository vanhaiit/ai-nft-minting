"use client";
import { useMemo, useState } from "react";
import Step1 from "./_components/Step1";
import Step2 from "./_components/step2";
import { StepEnum } from "@/types";
import StepNavigation from "./_components/StepNavigation";

const ArtGallery = () => {
  const [step, setStep] = useState<StepEnum>(StepEnum.STEP_1);

  const renderStep = useMemo(() => {
    if (step === StepEnum.STEP_1) {
      return <Step1 onChangeStep={setStep} />;
    }

    return <Step2 onChangeStep={setStep} />;
  }, [step]);
  return (
    <>
      {renderStep}
      <StepNavigation step={step} />
    </>
  );
};

export default ArtGallery;
