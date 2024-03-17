"use client";

import { useEffect } from "react";
import { METAVERSE } from "@/constants";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(METAVERSE);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  return <></>;
}
