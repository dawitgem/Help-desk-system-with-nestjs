import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import logo from "../public/logo.svg";
const Header = () => {
  return (
    <header className="flex w-full sm:h-[80px] bg-slate-50 align-middle justify-between md:px-[80px] px[20px] sticky top-0 z-10 ">
      <div className="flex overflow-clip gap-6 pt-2">
        <Image
          src={logo}
          alt="logo"
          width={20}
          height={20}
          className="md:w-[60px] md:h-[60px] "
        />
        <h1 className="md:text-xl  text-center text-gray-600 font-medium pt-5 ">
          KNS Support Service
        </h1>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
