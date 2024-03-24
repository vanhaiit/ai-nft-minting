import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { ImageAssets } from "../../../../../public";
import ConnectWallet from "./ConnectWallet";
import DesktopNavigation from "./DesktopNavigation";
import Link from "next/link";

const MainLayoutHeader = () => {
  return (
    <div
      className={twJoin(
        "bg-black1",
        "h-20 w-full",
        "fixed z-10 top-0 border-b z-30"
      )}
    >
      <div
        className={twJoin(
          "w-full h-full lg:max-w-[1320px] mx-auto",
          "space-between-root"
        )}
      >
        <Link href={"/"}>
          <Image src={ImageAssets.LogoImage} alt="" />
        </Link>
        <DesktopNavigation />
        <ConnectWallet />
      </div>
    </div>
  );
};

export default MainLayoutHeader;
