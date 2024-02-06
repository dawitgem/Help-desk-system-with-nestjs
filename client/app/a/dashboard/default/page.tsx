"use client"
import DashboardChartReport from "@/Components/DashboardChart";
import DashboardTicketReportCard from "@/Components/DashboardTicketReportCard";
import { RecentActivitiesModal, SelectDeptPopOver } from "@/Components/Listbox";
import NavbarAgent from "@/Components/NavbarAgent";
import { getProfileApi } from "@/utils/QueryActions";
import { useQuery } from "@tanstack/react-query";
import {redirect } from "next/navigation"
import Link from "next/link";
import React, { useEffect } from "react";
import { IoCube } from "react-icons/io5";




const DefaultDashboardPage = () => { 
  const {data:user,isError,isLoading,error}=useQuery({
    queryKey:["getUser"],
    queryFn:getProfileApi
   })
   console.log(user)
   useEffect(()=>{
     if(!user ||!user.Verified||user.UserType==="Customer")
     redirect("/support")
  },[user]) 
  
  
  return (
    <div className="relative">
      <NavbarAgent currentPage="My dashboard"  />
      <div className="sticky z-[1] top-14 p-4 h-14 bg-slate-50 border  border-gray-300 flex justify-between">
        <div className="flex gap-3">
          <IoCube className="self-center text-gray-500" />
          <SelectDeptPopOver/>
        </div>
      </div>
        <RecentActivitiesModal/>
      <div className="p-4 flex flex-col gap-4 bg-slate-100 w-full">
        <DashboardTicketReportCard  />
        <DashboardChartReport />
        <div className="text-sm grid grid-cols-3 gap-4">
          <div className="bg-white p-3 flex flex-col gap-10  border shadow-md rounded-md">
            <div className=" flex justify-between">
              <div>
                <p className="text-xm text-gray-700 font-medium">
                  Unresolved tickets
                </p>
                <p className="text-[12px] text-gray-500 ">
                  Dept : All Department
                </p>
              </div>
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
              <div className="flex justify-between text-gray-700 p-3 font-medium">
                <p>Department</p>
                <p>1</p>
              </div>
              <div className="flex justify-between text-gray-700 p-3 font-medium">
                <p>Department</p>
                <p>2</p>
              </div>
              <div className="flex justify-between text-gray-700 p-3 font-medium">
                <p>Department</p>
                <p>4</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 border shadow-md rounded-md"></div>
          <div className="bg-white p-2 border shadow-md rounded-md"></div>
          <div className="bg-white p-2 border shadow-md rounded-md"></div>
          <div className="bg-white p-2 border shadow-md rounded-md"></div>
        </div>
      </div>
      
    </div>
  );
};

export default DefaultDashboardPage;
