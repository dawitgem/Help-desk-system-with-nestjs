import Link from 'next/link';
import React from 'react'
import { BsCheck2 } from 'react-icons/bs';

export const DashboardView = (ActiveLink:string) => {
  
    return (
      <div className="bg-white flex flex-col gap-3 p-2 h-1/2">
        <Link
          href={"/a/dashboard/default"}
          className={`hover:bg-slate-100 text-sm  font-medium p-2 rounded-md ${
            ActiveLink.includes("default")
              ? "text-blue-600 flex justify-between"
              : "text-gray-700"
          }`}
        >
          <p> My dashboard </p>
          {ActiveLink.includes("default") && <BsCheck2 className="self-center" />}
        </Link>
        <Link
          href={"/a/dashboard/solution"}
          className={`hover:bg-slate-100 text-sm font-medium p-2 rounded-md   ${
            ActiveLink.includes("solution")
              ? "text-blue-600 flex justify-between"
              : "text-gray-700"
          }`}
        >
          <p> Knowledgebase Dashboard</p>
          {ActiveLink.includes("solution") && (
            <BsCheck2 className="self-center" />
          )}
        </Link>
      </div>
    );
  };