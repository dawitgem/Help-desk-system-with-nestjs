"use client";
import React, { ReactComponentElement } from "react";
import { BsBell, BsChevronDown, BsPlusSquare } from "react-icons/bs";
import { BiFilterAlt, BiMessageAlt, BiSearch } from "react-icons/bi";
import { CgMenuLeft } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { JsxElement } from "typescript";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";

interface NavbarAgentProps {
  currentPage: string;
  filterComponent?: JsxElement;
  link?: { name: string; href: string };
}
const NavbarAgent = ({
  currentPage,
  filterComponent,
  link,
}: NavbarAgentProps) => {
  return (
    <div className="p-4  sticky  top-0 z-10 h-14 bg-white flex justify-between ">
      <div className="flex gap-5">
        {filterComponent && (
          <button className="bg-slate-100 px-1 py-2 border border-gray-400 rounded-md flex">
            <BiFilterAlt className="self-center text-gray-500" />
            <CgMenuLeft className="text-gray-500 text-[10px]" />
          </button>
        )}
        <div className="flex gap-2">
          {link && (
            <div className="flex gap-2">
              <Link
                href={link.href}
                className="text-blue-600 font-medium self-center hover:underline"
              >
                {link.name}
              </Link>
              <AiOutlineRight className="text-gray-800  text-sm self-center " />
            </div>
          )}
          <h1 className="text-gray-800 font-medium">{currentPage}</h1>
        </div>
      </div>
      <div className="flex h-[30px] divide gap-5 ">
        <button className="px-2  bg-slate-50 border-gray-400 border rounded-md flex gap-2">
          <BsPlusSquare className="text-md text-gray-600 self-center" />
          <p className="text-gray-800 text-sm self-center">New</p>
          <BsChevronDown className="text-[10px] text-gray-900 self-center" />
        </button>
        <button className="px-2  flex border gap-1 rounded-md ">
          <BiSearch className="self-center text-gray-600 text-xl" />
          <p className="self-center text-gray-400">Search</p>
        </button>
        <button className="relative">
          <p className="w-3 h-3 rounded-full bg-red-800 absolute top-0 left-[60%] border-2 border-white"></p>
          <BsBell className="text-gray-700 text-2xl" />
        </button>
        <button className="relative">
          <p className="w-3 h-3 rounded-full bg-red-800 absolute top-0 left-[60%] border-2 border-white"></p>
          <BiMessageAlt className="text-gray-600 text-2xl" />
        </button>
        <button className="w-[35px] h-[35px] rounded-full bg-slate-500"></button>
      </div>
    </div>
  );
};

export default NavbarAgent;
