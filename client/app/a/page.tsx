"use client";
import DashboardChart from "@/Components/DashboardChart";
import DashboardTicketReportCard from "@/Components/DashboardTicketReportCard";
import Link from "next/link";
import React from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { IoCube } from "react-icons/io5";

const AgentPage = () => {
  return (
    <div>
      <div className="sticky z-10 top-14 p-4 h-14 bg-slate-50 border flex justify-between">
        <div className="flex gap-3">
          <IoCube className="self-center text-gray-500" />
          <button className="self-center flex gap-2">
            <p className="text-sm text-gray-800">All Articles</p>
            <BsChevronDown className="text-[8px] text-black self-center" />
          </button>
        </div>
        <button className="self-center hover:underline text-blue-600 text-sm flex gap-1 ">
          Recent Activities
          <BsChevronRight className="self-center text-[10px] text-black" />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <DashboardTicketReportCard />
        <div className="flex  bg-white rounded-md shadow-sm">
          <DashboardChart />
          <div className="pt-20 flex flex-col gap-5">
            <div className="border-l-4 p-3 flex flex-col">
              <h1 className="text-xl text-gray-600">Received</h1>
              <h1 className="self-center text-2xl text-gray-400">0</h1>
            </div>
            <div className="border-l-4 p-3 flex flex-col">
              <h1 className="text-xl text-gray-600">Resolved</h1>
              <h1 className="self-center text-2xl text-gray-400">0</h1>
            </div>
          </div>
        </div>
        <div className="text-sm grid grid-cols-3 gap-4">
          <div className="bg-white p-3 flex flex-col gap-10">
            <div className=" flex justify-between">
              <p className="text-xm text-gray-800">Unresolved tickets</p>
              <Link
                className="hover:underline text-blue-600 text-sm"
                href={"/a"}
              >
                View details
              </Link>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between text-gray-500 p-3 border-b">
                <p>Department</p>
                <p>Open</p>
              </div>
              <div className="flex justify-between text-gray-900 p-3">
                <p>Department</p>
                <p>1</p>
              </div>
              <div className="flex justify-between text-gray-900 p-3">
                <p>Department</p>
                <p>2</p>
              </div>
              <div className="flex justify-between text-gray-900 p-3">
                <p>Department</p>
                <p>4</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-2"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
