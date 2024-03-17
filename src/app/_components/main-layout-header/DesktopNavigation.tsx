"use client";

import React, { ComponentPropsWithoutRef, useState } from "react";
import {
  NFT_AI,
  METAVERSE,
  ART_GALLERY,
  MARKETPLACE,
  NFT_LENDING,
  CRYPTO_VOXEL,
  ABOUT,
} from "@/constants";
import { usePathname } from "next/navigation";
import { twJoin, twMerge } from "tailwind-merge";

import Link from "next/link";
import CommonDropdown from "../CommonDropdown";

const DesktopNavigation = () => {
  const pathname = usePathname();

  return (
    <div className={twJoin("ml-6", "flex items-center")}>
      <DesktopLink href={ABOUT}>About</DesktopLink>
      <DesktopLink href={NFT_LENDING}>NFT-lending</DesktopLink>
      <DesktopLink href={MARKETPLACE}>Marketplace</DesktopLink>

      <CommonDropdown
        contentDropdown={
          <>
            <DesktopLink
              href={CRYPTO_VOXEL}
              className="py-2 border-r-0 border-b border-b-neutral3"
            >
              Crypto Voxel
            </DesktopLink>
            <DesktopLink href={ART_GALLERY} className="border-none py-2">
              3D art gallery
            </DesktopLink>
          </>
        }
      >
        <p
          className={twJoin(
            "px-10",
            "font-medium",
            "border-r border-neutral1/40",
            pathname.includes(METAVERSE) ? "text-primary1" : "text-neutral1"
          )}
        >
          Metaverse
        </p>
      </CommonDropdown>

      <DesktopLink href={NFT_AI}>NFT-AI</DesktopLink>
    </div>
  );
};

export default DesktopNavigation;

export const DesktopLink: React.FC<ComponentPropsWithoutRef<"a">> = ({
  href,
  children,
  className,
  ...otherProps
}) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href || "#"}
      className={twMerge(
        "px-10",
        "font-medium",
        "focus-visible:outline-none",
        "border-r border-neutral1/40 last:border-none",
        isActive ? "text-primary1" : "text-neutral1",
        className
      )}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
