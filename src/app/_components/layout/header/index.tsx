import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { ImageAssets } from "../../../../../public";
import ConnectWallet from "./ConnectWallet";
import DesktopNavigation from "./DesktopNavigation";

const MainLayoutHeader = () => {
  return (
    <div
      className={twJoin(
        "h-20 w-full",
        "fixed z-10 top-0 border-b",
        "text-roboto_mono"
      )}
    >
      <div
        className={twJoin(
          "w-full h-full lg:max-w-[1320px] mx-auto",
          "space-between-root"
        )}
      >
        <Image src={ImageAssets.LogoImage} alt="" />
        <DesktopNavigation />
        <ConnectWallet />
      </div>
    </div>
  );
};

export default MainLayoutHeader;
