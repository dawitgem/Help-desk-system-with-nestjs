import Link from "next/link";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const RecentlySearched: string[] = [];

export default function SearchModal() {
  const options = [
    { label: "All", value: "all" },
    { label: "Tickets", value: "tickets" },
    { label: "Contacts", value: "contacts" },
    { label: "Solutions", value: "solutions" },
  ];
  const [SelectedSearchValue, setSelectedSearchValue] = useState("all");

  return (
    <div className="w-[500px] max-h-[400px]  bg-slate-50  rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-0 right-0 flex flex-col gap-2">
      <form className="relative w-full h-10 bg-white ">
        <BsSearch className="absolute top-3 left-2 rounded-md" />
        <input
          type="text"
          className="p-2 border hover:border-black outline-blue-600 w-full px-10 rounded-md placeholder:text-sm placeholder:space-x-1 text-gray-700"
          placeholder="Search Tickets , Contacts and Solutions"
          autoFocus
          onChange={(e) => {
            RecentlySearched.push(e.target.value);
            if (RecentlySearched.length > 5) RecentlySearched.pop();
          }}
        />
      </form>
      <div className="w-full max-h-full   bg-white border rounded-md p-2 flex flex-col gap-5">
        <div className="flex gap-2 px-5 py-2 border-b">
          {options.map((option) => (
            <button
              key={option.label}
              className={`text-sm rounded-full border px-[9px] py-[7px] ${
                SelectedSearchValue.includes(option.value)
                  ? "bg-[#0000fffd] text-white transition-colors duration-75 ease-in"
                  : "bg-inherit text-gray-700"
              }`}
              onClick={() => setSelectedSearchValue(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {RecentlySearched.length != 0 && (
          <>
            <div className="flex justify-between px-5">
              <p className="text-sm text-gray-500">Recently searched</p>
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => (RecentlySearched.length = 0)}
              >
                Clear
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {RecentlySearched.map((search: string, i: number) => (
                <div key={i} className="flex gap-1 hover:bg-slate-100 p-3">
                  <BsSearch className="self-center" />
                  <Link href={""} className="text-sm text-gray-700">
                    {search}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
