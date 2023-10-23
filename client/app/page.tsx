"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProfileStart, selectUser } from "./Redux/features/userSlice";
import { LuAlertOctagon } from "react-icons/lu";

const Page = () => {
  const dispatch = useDispatch();
  const { user, isAuth, Loading, error } = useSelector(selectUser);

  useEffect(() => {
    const getProfile = () => {
      dispatch(getProfileStart());
    };

    getProfile();
  }, []);

  useEffect(() => {
    if (user === null) redirect("/support/");
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
      {error ? (
        <div className="flex justify-center bg-slate-600 align-middle h-screen gap-5">
          <LuAlertOctagon className="text-xl text-white place-self-center" />
          <p className="text-lg text-slate-50 font-semibold self-center opacity-80">
            {error}
          </p>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Page;
