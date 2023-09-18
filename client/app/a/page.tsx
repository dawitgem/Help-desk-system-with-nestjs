"use client";
import DashboardChartReport from "@/Components/DashboardChart";
import DashboardChart from "@/Components/DashboardChart";
import DashboardTicketReportCard from "@/Components/DashboardTicketReportCard";
import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { IoCube } from "react-icons/io5";

const AgentPage = () => {
  useEffect(() => {
    redirect("./a/dashboard/default");
  }, []);
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
