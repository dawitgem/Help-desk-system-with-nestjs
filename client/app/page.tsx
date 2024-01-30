"use client";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { LuAlertOctagon } from "react-icons/lu";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getProfile } from "./Redux/features/userSlice";
import { getProfileApi } from "@/utils/QueryActions";



const Page = () => {
  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({ queryKey: ["getUser"], queryFn: ()=> {}});
  const router = useRouter();
  const dispatch = useDispatch();

  console.log("request from main");
  if (user && isSuccess) dispatch(getProfile(user));
  if (!user) router.push("/support");
  if (user && isSuccess)
    if (isSuccess && user.UserType === "Customer") router.push("/support");
  if (isSuccess && (user.UserType === "Admin" || user.UserType === "Agent"))
    router.push("/a/dashboard/default");

  if (isError)
    return (
      <div className="flex justify-center bg-slate-600 align-middle h-screen gap-5">
        <LuAlertOctagon className="text-xl text-white place-self-center" />
        <p className="text-lg text-slate-50 font-semibold self-center opacity-80">
          {error.message}
        </p>
      </div>
    );

  if (isLoading)
    return (
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
    );
};

export default Page;
