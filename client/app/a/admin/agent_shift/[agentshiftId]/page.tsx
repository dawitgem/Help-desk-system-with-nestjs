"use client";
import AgentShiftForm from "@/Components/AgentShiftForm";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const shifts = [1, 2, 3, 4, 5, 6];

const AgentShiftPage = () => {
  const [isMouseOver, setIsMouseOver] = useState(shifts.map((shift) => false));
  console.log(isMouseOver);
  const [isGeneral, setIsGeneral] = useState(true);

  return (
    <div>
      <NavbarAgent currentPage="Admin" />
      <div className="p-5 ">
        <div className="bg-white p-10 h-[calc(100vh-120px)] overflow-auto rounded-md shadow-sm flex flex-col gap-5">
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
            {isGeneral ? <AgentShiftForm /> : <>come on man</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentShiftPage;
