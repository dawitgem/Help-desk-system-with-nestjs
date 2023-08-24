"use client";
import Image from "next/image";
import React, { Children, useState } from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import {
  MdOutlineDashboard,
  MdOutlineSettings,
  MdPersonOutline,
} from "react-icons/md";
import { RiTicket2Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";

import { usePathname } from "next/navigation";
const NavLinks = [
  { link: "dashboard", href: "/a", component: MdOutlineDashboard },
  { link: "tickets", href: "/a/tickets", component: RiTicket2Line },
  { link: "contacts", href: "/a/contacts", component: MdPersonOutline },
  { link: "solutions", href: "/a/solutions", component: IoBookOutline },
  { link: "admin", href: "/a/settings", component: MdOutlineSettings },
];

const Navigation = ({ NavLinks }: any) => {
  const pathname = usePathname();
  const [isMouseOver, setIsMouseOver] = useState(false);
  console.log(isMouseOver);

  return (
    <>
      {NavLinks.map((link: any, i: any) => {
        const isActive = pathname.replace("/a/", "/");

        return (
          <Link
            className="relative flex p-2"
            href={link.href}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            <div
              className={`${
                isActive.includes(link.href.replace("/a/", "/"))
                  ? "bg-[#ffffff2c] text-slate-50"
                  : "hover:bg-[#ffffff2c] "
              }    p-2 
              self-center text-slate-400 text-2xl hover:text-slate-100 rounded-lg `}
            >
              <link.component />
              {isMouseOver}
            </div>
            {isMouseOver && link.href.includes(link.link) && (
              <div className="absolute top-3 left-full text-[14px] capitalize h-8 p-2  bg-[#123d52] text-white w-auto ">
                {link.link}
              </div>
            )}
            {isMouseOver && link.link === "dashboard" && (
              <div className="absolute top-3 left-full text-[14px] capitalize h-8 p-2 bg-[#123d52] text-white w-auto md:transition duration-200 ease-out ">
                Dashboard
                {isMouseOver}
              </div>
            )}{" "}
            {isMouseOver && link.link === "admin" && (
              <div className="absolute top-3 left-full text-[14px] capitalize h-8 p-2 bg-[#123d52] text-white ">
                admin
              </div>
            )}
          </Link>
        );
      })}
    </>
  );
};

const SideBar = () => {
  return (
    <div className="  bg-[#123d52] h-screen flex flex-col gap-5 w-[70px]">
      <Link
        href={"/a"}
        className=" bg-[#082433] w-full justify-items-center p-2 "
      >
        <Image
          src={logo}
          alt="logo"
          width={10}
          height={10}
          className="w-[40px] h-[40px] "
        />
      </Link>
      <div className="flex flex-col  gap-5 pt-5">
        {NavLinks.map((Navlink) => (
          <Navigation NavLinks={[Navlink]} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
