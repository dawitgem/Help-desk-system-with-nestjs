"use client";
import DashboardChartReport from "@/Components/DashboardChart";
import DashboardChart from "@/Components/DashboardChart";
import DashboardTicketReportCard from "@/Components/DashboardTicketReportCard";
import EditAccountDetail from "@/Components/EditAccountDetail";
import NavbarAgent from "@/Components/NavbarAgent";
import RecentActivities from "@/Components/RecentActivities";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import Link from "next/link";
import React, {
  Component,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BsCheck2,
  BsChevronDown,
  BsChevronRight,
  BsChevronUp,
} from "react-icons/bs";
import { IoCube } from "react-icons/io5";

const DefaultDashboardPage = () => {
  const [IsSelectDeptOpen, setIsSelectDeptOpen] = useState(false);
  const [openRecent, setOpenRecent] = useState(false);
  const [SelectedDept, setSelectedDept] = useState("All Department");
  const SelectDeptRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      console.log("hi there");
      if (
        SelectDeptRef.current &&
        !SelectDeptRef.current.contains(e.target as Node)
      ) {
        setIsSelectDeptOpen(false);
      }
    };
    document.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      handleClickOutSide(e);
    });

    return document.removeEventListener("mousedown", handleClickOutSide);
  }, []);
  return (
    <div className="relative">
      <NavbarAgent currentPage="My dashboard" />
      <div className="sticky z-[1] top-14 p-4 h-14 bg-slate-50 border flex justify-between">
        <div className="flex gap-3">
          <IoCube className="self-center text-gray-500" />
          <div className="h-full relative" ref={SelectDeptRef}>
            <button
              className="self-center flex gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsSelectDeptOpen((prevState) => !prevState);
              }}
            >
              <p className="text-sm text-gray-800">{SelectedDept}</p>
              {IsSelectDeptOpen ? (
                <BsChevronUp className="text-[8px] text-black self-center" />
              ) : (
                <BsChevronDown className="text-[8px] text-black self-center" />
              )}
            </button>
            {IsSelectDeptOpen && (
              <SelectDept
                Selected={SelectedDept}
                setSelected={setSelectedDept}
                setOpen={setIsSelectDeptOpen}
              />
            )}
          </div>
        </div>
        <button
          className="self-center hover:underline text-blue-600 text-sm flex gap-1 "
          onClick={(e) => {
            e.stopPropagation();
            setOpenRecent(true);
          }}
        >
          Recent Activities
          <BsChevronRight className="self-center text-[10px] text-black" />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <DashboardTicketReportCard />
        <DashboardChartReport />
        <div className="text-sm grid grid-cols-3 gap-4">
          <div className="bg-white p-3 flex flex-col gap-10">
            <div className=" flex justify-between">
              <div>
                <p className="text-xm text-gray-700 font-medium">
                  Unresolved tickets
                </p>
                <p className="text-[12px] text-gray-500 ">
                  Dept : {SelectedDept}
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
          <div className="bg-white p-2"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
        </div>
      </div>
      {openRecent && (
        <RecentActivities open={openRecent} setOpen={setOpenRecent} />
      )}
    </div>
  );
};

export default DefaultDashboardPage;

const Department = [
  { name: "All Department", value: "All" },
  { name: "Department 1", value: "dept2" },
  { name: "Department 2", value: "dept3" },
];

interface SelectDeptPros {
  Selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function SelectDept({ Selected, setSelected, setOpen }: SelectDeptPros) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="w-[200px] max-h-[180px]  bg-white  rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-6 left-0 flex flex-col gap-2 border">
      <form className="p-2 flex flex-col gap-1 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search for department"
          className="text-sm px-1 py-2 outline-none border-b border-blue-600 placeholder:text-sm"
          autoFocus
        />
        {Department.map((dept, i) => (
          <button
            key={i}
            className={`p-1 hover:bg-slate-200 rounded-sm text-sm  flex justify-between ${
              Selected.includes(dept.name)
                ? "text-blue-600 bg-slate-100"
                : "text-gray-700"
            }`}
            value={dept.value}
            onClick={(e) => {
              setSelected(dept.name);
              setOpen(false);
            }}
          >
            <p className=" font-medium">{dept.name}</p>
            {Selected.includes(dept.name) && <BsCheck2 />}
          </button>
        ))}
      </form>
    </div>
  );
}
