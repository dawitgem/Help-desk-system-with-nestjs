"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useDispatch } from "react-redux";
import { getProfileStart } from "./Redux/features/userSlice";

const Page = () => {
  return (
    <>
      <Box className="w-full h-screen flex flex-col gap-5 justify-center align-middle relative shadow-lg bg-slate-50">
        <Image
          src={logo}
          alt="Logo"
          className="w-[30px] h-[30px] self-center "
        />
        <CircularProgress className="self-center text-3xl  " />

        <h1 className="text-3xl text-blue-400 font-black self-center">
          Kns Support Service
        </h1>
      </Box>
    </>
  );
};

export default Page;
