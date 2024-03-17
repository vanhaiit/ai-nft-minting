"use client";

import React, { useEffect } from "react";
import { ART_GALLERY } from "@/constants";
import { redirect } from "next/navigation";

const page = () => {
  useEffect(() => {
    redirect(ART_GALLERY);
  }, []);
  return <></>;
};

export default page;
