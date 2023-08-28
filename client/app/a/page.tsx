"use client";
import DashboardChartReport from "@/Components/DashboardChart";
import DashboardChart from "@/Components/DashboardChart";
import DashboardTicketReportCard from "@/Components/DashboardTicketReportCard";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { IoCube } from "react-icons/io5";

const AgentPage = () => {
  useEffect(() => {
    redirect("./a/dashboard/default");
  }, []);
  return <div>alsdkfjlaskdjf</div>;
};

export default AgentPage;
