"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";

const RolesEditPage = () => {
  return (
    <div>
      <NavbarAgent currentPage="Admin" />
      <div className="p-3 ">
        <div className="bg-white p-5 h-[calc(100vh-75px)] overflow-auto rounded-md shadow-sm flex flex-col gap-5">
          <div className="p-10 flex flex-col gap-5 ">
            <h1 className="text-2xl text-gray-800 font-light">
              Account Adminstrator
            </h1>
            <form action="" className="flex flex-col gap-5">
              <ul className="flex flex-col gap-5 ">
                <li className="flex gap-40">
                  <label htmlFor="" className="font-semibold w-1/12">
                    Name <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={"Account Adminstrator"}
                    className="w-1/2 p-1 border outline-0 outline-gray-600 rounded-md text-sm text-gray-700"
                  />
                </li>{" "}
                <li className="flex gap-40">
                  <label htmlFor="" className="font-semibold  w-1/12">
                    Description
                  </label>
                  <textarea
                    cols={40}
                    rows={5}
                    defaultValue={"Account Adminstrator"}
                    className="w-1/2 p-1 border outline-0 outline-gray-600 rounded-md text-sm text-gray-700"
                  />
                </li>{" "}
                <li className="flex gap-40">
                  <label htmlFor="" className="font-semibold  w-1/12">
                    Agent Type
                  </label>
                  <input
                    type="text"
                    defaultValue={"Account Adminstrator"}
                    className="w-1/2 p-1 border outline-0 outline-gray-600 rounded-md text-sm text-gray-700"
                  />
                </li>
                <li className="flex gap-40 ">
                  <label htmlFor="" className="font-semibold  w-1/12">
                    Agent
                  </label>
                  <button className="text-blue-500 hover:text-blue-900 text-sm">
                    1 Agent
                  </button>
                </li>
              </ul>
              <div className="flex flex-col gap-5 border-t-2">
                <h1 className="text-3xl  font-light text-gray-700">
                  Permissions
                </h1>
                <ul className="flex gap-4 text-sm">
                  <li>Scroll to :</li>
                  <li>
                    <Link href={"#Tickets"} className="text-blue-500">
                      Tickets
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href={"#Solutions"} className="text-blue-500">
                      Solutions
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href={"#Customers"} className="text-blue-500">
                      Customers
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href={"#Admin"} className="text-blue-500">
                      Adminstration
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href={"#General"} className="text-blue-500">
                      General
                    </Link>
                  </li>{" "}
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesEditPage;
