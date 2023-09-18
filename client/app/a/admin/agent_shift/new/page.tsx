"use client";
import AgentShiftNewForm from "@/Components/AgentShiftNewForm";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useState } from "react";

const shifts = [1, 2, 3, 4, 5, 6];

const NewAgentShiftPage = () => {
  const [isMouseOver, setIsMouseOver] = useState(shifts.map((shift) => false));
  const [isGeneral, setIsGeneral] = useState(true);

  return (
    <div>
      <NavbarAgent
        link={[{ name: "Admin", href: "/a/admin" }]}
        currentPage="Agent shifts"
      />
      <div className="p-2 ">
        <div className="bg-white p-10 h-[calc(100vh-75px)] overflow-auto rounded-md shadow-sm flex flex-col gap-5">
          <h1 className="text-gray-700 text-2xl font-semibold">
            Create New Shift
          </h1>
          <div className="mt-5 ">
            <AgentShiftNewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAgentShiftPage;
