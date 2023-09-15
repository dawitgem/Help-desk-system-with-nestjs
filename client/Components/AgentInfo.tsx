import { Avatar } from "@mui/material";
import Link from "next/link";
import React, { Component, ReactComponentElement } from "react";
import { JsxElement } from "typescript";

interface AgentInfo {}

const AgentInfo = () => {
  return (
    <div className="flex gap-2 hover:bg-slate-50 py-2">
      <Avatar
        variant="square"
        alt="image"
        className="w-[30px] h-[30px] bg-slate-400 rounded-md shadow-md"
      >
        N
      </Avatar>
      <div className="flex flex-col ">
        <Link
          href={"/a/admin/agents/dawit"}
          className="text-sm text-gray-700 font-medium hover:text-blue-500 "
        >
          AgentName
        </Link>
        <p className="text-[12px] text-gray-600">agentEmail@gmail.com</p>
      </div>
    </div>
  );
};

export default AgentInfo;
