"use client";
import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import logo from "../public/logo.svg";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/Redux/features/userSlice";
const Header = () => {
  const { user, isAuth, Loading } = useSelector(selectUser);

  return (
    <>
      <header className="flex w-full sm:h-[80px] bg-slate-50 align-middle justify-between lg:px-[60px] md:px-[30px] px-[10px] sticky top-0 z-10 ">
        <div className="flex overflow-clip gap-6 pt-2">
          <Image
            src={logo}
            alt="logo"
            width={20}
            height={20}
            className="md:w-[60px] md:h-[60px] md:ml-0 self-center "
          />
          <h1 className="md:text-xl  text-center text-gray-600 font-medium self-center ">
            KNS Support Service
          </h1>
        </div>
        <Navbar />
      </header>
    </>
  );
};

export default Header;
