import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import logo from "../public/logo.svg";
const Header = () => {
  return (
    <header className="flex h-[80px] bg-slate-50 align-middle justify-between md:px-[80px] px[20px] sticky top-0 z-10 ">
      <div className="flex gap-6 ">
        <Image src={logo} alt="logo" width={40} height={40} />
        <h1 className="md:text-xl  text-center text-gray-600 font-medium mt-8">
          KNS Support Service
        </h1>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
