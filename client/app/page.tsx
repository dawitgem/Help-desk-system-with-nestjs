"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProfileStart, selectUser } from "./Redux/features/userSlice";

const Page = () => {
  const dispatch = useDispatch();
  const { user, isAuth, Loading } = useSelector(selectUser);

  useEffect(() => {
    const getProfile = () => {
      dispatch(getProfileStart());
      console.log("this is not the best thing to me");
      console.log(user);
    };

    getProfile();
  }, []);

  useEffect(() => {
    if (user && isAuth && user.UserType === "Customer") redirect("/support/");
    if (
      user &&
      isAuth &&
      (user.UserType === "Agent" || user.UserType === "Admin")
    )
      redirect("/a/dashboard/default");
  }, [user]);
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
