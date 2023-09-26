"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import logo from "@/public/logo.svg";

const Page = () => {
  useEffect(() => {
    redirect("/support");
  }, []);
  return (
    <>
      <Box className="w-full h-screen flex flex-col gap-3 justify-center align-middle relative shadow-lg bg-slate-100">
        <Image
          src={logo}
          alt="Logo"
          className="w-[30px] h-[30px] self-center absolute top-[44%] md:left-[49%] left-[45%]"
        />
        <CircularProgress className="self-center w-[80px] h-[80px]" />

        <h1 className="text-3xl text-blue-400 font-black self-center">
          Kns Support Service
        </h1>
      </Box>
    </>
  );
};

export default Page;
