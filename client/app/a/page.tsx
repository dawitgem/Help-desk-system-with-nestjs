"use client";
import DashboardChartReport from "@/Components/DashboardChart";
import DashboardChart from "@/Components/DashboardChart";
import DashboardTicketReportCard from "@/Components/DashboardTicketReportCard";
import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { IoCube } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getProfileStart, selectUser } from "../Redux/features/userSlice";

const AgentPage = () => {
  const dispatch = useDispatch();
  const { user, isAuth, Loading, error } = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    const getProfile = () => {
      try {
        dispatch(getProfileStart());
      } catch (e) {}
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (!Loading && !error && user === null) router.push("/support/");
    if (user && isAuth && user.UserType === "Customer")
      router.push("/support/");
    if (
      user &&
      isAuth &&
      (user.UserType === "Agent" || user.UserType === "Admin")
    )
      router.push("/a/dashboard/default");
  }, [user]);
  return (
    <Box className="flex flex-col gap-4 w-full h-screen justify-center align-middle   relative">
      <CircularProgress className="self-center justify-self-center" />
      <h1 className="self-center justify-self-center text-gray-700">
        Loading...
      </h1>
    </Box>
  );
};

export default AgentPage;
