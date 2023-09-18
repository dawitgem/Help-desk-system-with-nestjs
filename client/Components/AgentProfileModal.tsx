import Link from "next/link";
import React from "react";

const AgentProfileModal = () => {
    return (
        <div className=" bg-white w-[250px] h-[250px] border rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-[38px] right-0 flex flex-col gap-2">
          <div className="bg-slate-100 p-4 border-b flex flex-col gap-1">
            <h3 className="text-md text-gray-700 font-medium">Agent Name</h3>
            <p className="text-sm text-gray-500">agentEmail@gmail.com</p>
          </div>
          <div className="p-4 flex flex-col gap-1">
            <Link
              href={"/a/profile/dawit"}
              className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
            >
              Profile setting
            </Link>
            <Link
              href={"/support"}
              className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
            >
              Go to customer Portal
            </Link>
            <Link
              href={"/"}
              className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
            >
              Sign out
            </Link>
          </div>
        </div>
      );
};

export default AgentProfileModal;
