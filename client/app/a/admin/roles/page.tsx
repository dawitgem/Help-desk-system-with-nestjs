"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";

const RolesPage = () => {
  return (
    <div>
      <NavbarAgent
        currentPage="Roles"
        link={{ name: "Admin", href: "/a/admin" }}
      />
      <div className="p-5 ">
        <div className="bg-white p-5 h-[calc(100vh-120px)] overflow-auto rounded-md shadow-sm flex flex-col gap-5">
          <div className="flex justify-between p-5">
            <h1 className="text-gray-700 text-xl font-semibold">Agent Roles</h1>
            <Link
              href={"/a/admin/roles/new"}
              className="mr-20 text-sm text-white border bg-[#123e54] p-2 px-5 rounded-md"
            >
              New Role
            </Link>
          </div>
          <div className="flex flex-col gap-4  bg-slate-50 border rounded-md">
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
            <div className="flex justify-between pr-40 border-b-2 ">
              <div className="flex flex-col gap-2 p-5 flex-1 break-words">
                <Link
                  href={"/a/admin/roles/myrole/edit"}
                  className="text-blue-600 text-md font-semibold"
                >
                  Account Adminstrator
                </Link>
                <p className="text-sm text-gray-500 w-3/4 break-words">
                  Has complete control over the help desk and the organisation
                  including access to Account or Billing related information,
                  and receives Invoices.
                </p>
              </div>
              <button className="text-sm text-blue-600 self-center font-normal hover:text-blue-900">
                1 Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPage;
