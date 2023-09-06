import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React from "react";

const AgentDetailPage = () => {
  return (
    <div>
      <NavbarAgent currentPage="Agent" />
      <div className="p-3 ">
        <div className="bg-white p-10 h-[calc(100vh-98px)]">
          <div className="flex justify-between">
            <div className="flex gap-5 flex-1 border-b-2 pb-5">
              <div className="w-[120px] h-[120px] bg-gray-600 rounded-md shadow-lg"></div>
              <div className="flex flex-col gap-4 w-full">
                <h1 className="text-xl text-gray-700 font-normal  w-full border-b">
                  Agent Name
                </h1>
                <p className=" text-gray-800 font-semibold">
                  Agent information
                </p>
                <div className="grid grid-cols-2 w-1/4 gap-3">
                  <p className="text-gray-600 font-semibold text-sm">Email</p>
                  <p className="text-gray-800 font-normal text-sm">
                    agentemail@gmail.com
                  </p>
                  <p className="text-gray-600 font-semibold text-sm">
                    Phone number
                  </p>
                  <p className="text-gray-800 font-normal text-sm">
                    091314151617
                  </p>
                  <p className="text-gray-600 font-semibold text-sm">
                    Department
                  </p>
                  <p className="text-gray-800 font-normal text-sm">
                    Department
                  </p>
                </div>
              </div>
            </div>
            <button className="p-1 px-4 bg-slate-50 border self-start text-sm  text-gray-700 hover:bg-slate-100 hover:border-gray-300 rounded-md shadow-sm">
              Edit Agent
            </button>
          </div>
          <div className="flex flex-col p-5 gap-5">
            <h1>Recently assigned tickets (open and pending)</h1>
            <div className="flex flex-col gap-1">
              <Link href={""} className="text-blue-300 hover:text-blue-500">
                ticket name
              </Link>
              <div className="flex gap-1 divide-x border-b">
                <p className="text-[12px] text-gray-500">Tue 5 2023 5:30pm </p>
                <p className="text-[12px] text-gray-500 px-2">Status open</p>
              </div>
            </div>{" "}
            <div className="flex flex-col gap-1">
              <Link href={""} className="text-blue-300 hover:text-blue-500">
                ticket name
              </Link>
              <div className="flex gap-1 divide-x border-b">
                <p className="text-[12px] text-gray-500">Tue 5 2023 5:30pm </p>
                <p className="text-[12px] text-gray-500 px-2">Status open</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;
