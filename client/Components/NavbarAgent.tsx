import Image from "next/image";
import React from "react";
import logo from "@/public/logo.svg";
import {
  BsBell,
  BsChevronDown,
  BsFilterRight,
  BsPlusSquare,
} from "react-icons/bs";
import { BiFilterAlt, BiMessageAlt, BiSearch } from "react-icons/bi";
import { CgMenuLeft } from "react-icons/cg";

const NavbarAgent = () => {
  return (
    <div className="p-4  sticky  top-0 z-10 h-14 bg-white flex justify-between ">
      <div className="flex gap-5">
        <button className="bg-slate-100 px-1 py-2 border border-gray-400 rounded-md flex">
          <BiFilterAlt className="self-center text-gray-500" />
          <CgMenuLeft className="text-gray-500 text-[10px]" />
        </button>
        <h1 className="text-gray-800 font-medium">My Dashboard</h1>
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
