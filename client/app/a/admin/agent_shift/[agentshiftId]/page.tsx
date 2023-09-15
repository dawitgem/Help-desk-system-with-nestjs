"use client";
import AgentList from "@/Components/AgentList";
import AgentShiftForm from "@/Components/AgentShiftForm";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useState } from "react";

const AgentShiftPage = () => {
  const [isGeneral, setIsGeneral] = useState(true);

  return (
    <div>
      <NavbarAgent
        currentPage="Agent shifts"
        link={{ name: "Admin", href: "/a/admin" }}
      />
      <div className="p-2 ">
        <div className="bg-white p-10 h-[calc(100vh-75px)] overflow-auto rounded-md shadow-sm flex flex-col gap-5">
          <h1 className="text-gray-700 text-xl font-semibold">Shift Name</h1>
          <div className="flex gap-5 border-b">
            <button
              className={`p-2 text-sm  hover:border-b-4  ${
                isGeneral
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : " text-gray-700"
              }`}
              onClick={() => {
                setIsGeneral(true);
              }}
            >
              General Setting
            </button>
            <button
              className={`p-2 text-sm   hover:border-b-4  ${
                !isGeneral
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : " text-gray-700"
              }`}
              onClick={() => {
                setIsGeneral(false);
              }}
            >
              Agent List
            </button>
          </div>
          <div className="mt-5 ">
            {isGeneral ? <AgentShiftForm /> : <AgentList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentShiftPage;
