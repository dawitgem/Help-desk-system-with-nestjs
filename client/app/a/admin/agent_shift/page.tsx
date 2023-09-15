"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const shifts = [1, 2, 3, 4, 5, 6];

const AgentShiftsPage = () => {
  const [isMouseOver, setIsMouseOver] = useState(shifts.map((shift) => false));

  return (
    <div>
      <NavbarAgent
        currentPage="Agent shifts"
        link={{ name: "Admin", href: "/a/admin" }}
      />
      <div className="p-5 ">
        <div className="bg-white p-10 h-[calc(100vh-120px)] overflow-auto rounded-md shadow-sm flex flex-col gap-5">
          <div className="flex flex-col gap-10 p-5">
            <div className="flex flex-col gap-5">
              <h1 className="text-gray-700 text-2xl font-semibold">
                Agent Shifts
              </h1>
              <p className="w-1/2 text-sm text-gray-600 break-words">
                Create your team's schedules to make sure that no customer is
                missed when your teams go in and out of shifts.
              </p>
            </div>
            <div>
              <Link
                href={"/a/admin/agent_shift/new"}
                className="w-28 mr-20 text-sm text-white border bg-[#123e54] p-2 px-5 rounded-md"
              >
                New Shift
              </Link>
            </div>
            {shifts.map((shift, i) => (
              <div
                key={i}
                className="md:cursor-pointer p-5 w-2/3 border-2 hover:border-blue-500  rounded-md shadow-sm  relative"
                onMouseEnter={() =>
                  setIsMouseOver(
                    isMouseOver.map((hover, c) => {
                      if (c === i) hover = true;
                      else hover = false;
                      return hover;
                    })
                  )
                }
                onMouseLeave={() =>
                  setIsMouseOver(
                    isMouseOver.map((hover, c) => {
                      if (c === i) hover = false;

                      return hover;
                    })
                  )
                }
              >
                <Link
                  href={"/a/admin/agent_shift/myshift"}
                  className="ml-5  flex flex-col justify-between "
                >
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm text-gray-700 font-semibold">
                      Shift Name
                    </h3>
                    <p className="text-[13px] text-gray-500 font-light">
                      8:00 am - 5:00 pm Ethiopian local Time{" "}
                      <span className="font-bold text-lg">.</span>{" "}
                      <span>1 agent</span>
                    </p>
                  </div>
                </Link>
                {isMouseOver[i] && (
                  <button
                    className="absolute top-6 z-10 left-[90%] p-2 border shadow-sm rounded-md text-gray-600 hover:bg-slate-50"
                    onClick={() => console.log("delete shift")}
                  >
                    <BsTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentShiftsPage;
