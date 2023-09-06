"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";
import { BiTime } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAccountBoxLine } from "react-icons/ri";

const SettingPage = () => {
  return (
    <div>
      <NavbarAgent currentPage="Admin" />
      <div className="p-5 ">
        <div className="bg-white p-5 h-[calc(100vh-120px)] grid grid-cols-2 gap-5 justify-center align-middle rounded-md shadow-sm">
          <div className="col-span-2 p-5 flex gap-5  ">
            <IoSettingsOutline className="self-center text-2xl text-gray-700" />
            <h1
              className="text-lg font-bold text-gray-700 self-center
            "
            >
              Admin setting
            </h1>
          </div>
          <Link
            href={"/a/admin/agents"}
            className="flex flex-col gap-1 hover:bg-slate-100 hover:rounded-md p-5"
          >
            <div className="flex gap-5">
              <GoPerson className="text-3xl text-gray-600" />
              <p className="text-md text-gray-700 font-semibold self-center">
                Agents
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Define agents scope, department and other details
            </p>
          </Link>{" "}
          <Link
            href={"/a/admin/departments"}
            className="flex flex-col gap-1 hover:bg-slate-100 hover:rounded-md p-5"
          >
            <div className="flex gap-5">
              <HiOutlineUserGroup className="text-3xl text-gray-600" />
              <p className="text-md text-gray-700 font-semibold self-center">
                Departments
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Organize agents and tickets by department
            </p>
          </Link>
          <Link
            href={"/a/admin/roles"}
            className="flex flex-col gap-1 hover:bg-slate-100 hover:rounded-md p-5"
          >
            <div className="flex gap-5">
              <div className="flex">
                <GoPerson className="text-3xl text-gray-600" />
                <IoSettingsOutline className="text-xl text-green-500  border-2 border-white mt-4 ml-[-6px] rounded-full" />
              </div>
              <p className="text-md text-gray-700 font-semibold self-center">
                Roles and Permission
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Provide access and priveleges for your agents
            </p>
          </Link>{" "}
          <Link
            href={"/a/admin/agent_shift"}
            className="flex flex-col gap-1 hover:bg-slate-100 hover:rounded-md p-5"
          >
            <div className="flex gap-5">
              <div className="flex">
                <GoPerson className="text-3xl text-gray-600" />
                <BiTime className="text-xl text-green-500  border-2 border-white mt-4 ml-[-6px] rounded-full" />
              </div>
              <p className="text-md text-gray-700 font-semibold self-center">
                Agents shift
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Provide access and priveleges for your agents
            </p>
          </Link>{" "}
          <Link
            href={""}
            className="flex flex-col gap-1 hover:bg-slate-100 hover:rounded-md p-5"
          >
            <div className="flex gap-5">
              <div className="flex">
                <RiAccountBoxLine className="text-3xl text-gray-600" />
                <BsInfoCircle className="text-xl text-green-500  border-2 border-white mt-4 ml-[-6px] rounded-full" />
              </div>
              <p className="text-md text-gray-700 font-semibold self-center">
                Account's Details
              </p>
            </div>
            <p className="text-sm text-gray-500">View your account details</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
