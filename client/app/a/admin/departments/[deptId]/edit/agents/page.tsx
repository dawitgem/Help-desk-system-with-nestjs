"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { BsFilter, BsPencil, BsSearch, BsTrash } from "react-icons/bs";

const DepartmentsPage = () => {
  const AgentEdit = useMemo(
    () => dynamic(() => import("@/Components/DeptAgentEdit"), { ssr: false }),
    []
  );
  return (
    <div>
      <NavbarAgent currentPage="Department" />
      <div className="p-5  ">
        <div className="p-12 bg-white flex flex-col gap-10  ">
          <div className="flex gap-2">
            <h1
              className="text-2xl font-bold text-gray-700 self-center
            "
            >
              Department Name
            </h1>
            <button className="hover:bg-slate-100 rounded-md p-2 text-gray-600 text-md">
              <BsPencil />
            </button>
          </div>
          <div className="flex gap-10  border-b">
            <Link
              href={"/a/admin/departments/alskdfjlksf/edit/generalsetting"}
              className="text-gray-600 border-b-4  border-b-blue-800 p-2"
            >
              General Settings
            </Link>{" "}
            <Link
              href={"/a/admin/departments/alskdfjlksf/edit/agents"}
              className="text-gray-600 border-b-4  border-b-blue-800 p-2"
            >
              Agents
            </Link>{" "}
            <Link
              href={"/a/admin/departments/alskdfjlksf/edit/deactivatedagents"}
              className="text-gray-600 border-b-4 border-b-blue-800 p-2"
            >
              DeactivatedAgents
            </Link>
          </div>
          <div className="flex justify-between px-5">
            <form action="" className="border relative rounded-md w-1/4">
              <BsSearch className="text-sm text-gray-500 absolute top-3 left-2" />
              <input
                type="text"
                placeholder="search departments"
                className="w-full h-full outline-blue-500 rounded-md hover:border-black border p-2 pl-8 "
              />
            </form>
            <button className="bg-[#123d52] p-2 px-4 text-white text-sm rounded-md border">
              Add Agent
            </button>
          </div>
          <AgentEdit />
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;
