"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";

const DepartmentsPage = () => {
  return (
    <div>
      <NavbarAgent currentPage="Department" />
      <div className="p-5  ">
        <div className="p-12 bg-white flex flex-col gap-10 h-[calc(100vh-100px)] ">
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
          <GeneralEdit />
        </div>
      </div>
    </div>
  );
};

const GeneralEdit = () => {
  return (
    <div>
      <form action="" className="flex flex-col gap-3">
        <label className="text-gray-700 text-sm">Desciription</label>
        <textarea
          cols={3}
          rows={3}
          defaultValue={"describe your department"}
          className="hover:border-gray-800 outline-blue-700 border border-gray-400 p-5 w-1/2 rounded-md"
        ></textarea>

        <div className="flex gap-5 pt-5">
          <button className="text-sm text-white p-2 px-5 text-center bg-[#123d52] rounded-md">
            save
          </button>{" "}
          <button className="text-sm text-gray-700 p-2 px-5 text-center bg-slate-50 border rounded-md">
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentsPage;
