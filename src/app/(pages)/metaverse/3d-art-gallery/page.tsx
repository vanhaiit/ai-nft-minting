"use client";
import { useEffect, useMemo, useState } from "react";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import { StepEnum } from "@/types";
import StepNavigation from "./_components/StepNavigation";
import { useAccount, useReadContract } from "wagmi";
import abi from "@/data/ContractABI.json";
import { useContract } from "@/hooks/useContract";

const ArtGallery = () => {
  const [step, setStep] = useState<StepEnum>(StepEnum.STEP_1);
  const getData = useContract(
    abi,
    "0x8F715151F0CADF4d30dA311bbD2dA5d1F85aC8D1"
  );
  useEffect(() => {
    (async () => {
      const res: any = await getData;
      console.log(11111, res);

      const nonce = await res?.nonces(
        "0x6b175474e89094c44da98b954eedeac495271d0f"
      );
      console.log(1, nonce.toString());
    })();
  }, [getData]);

  // const result = useReadContract({
  //   abi,
  //   address: "0x8F715151F0CADF4d30dA311bbD2dA5d1F85aC8D1",
  //   functionName: "nonces",
  //   args: ["0x6b175474e89094c44da98b954eedeac495271d0f"],
  // });

  // console.log(11111, result);

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
