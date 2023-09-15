"use client";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";
import {
  MdOutlineDashboard,
  MdOutlineSettings,
  MdPersonOutline,
} from "react-icons/md";
import { RiTicket2Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";

const NavLinks = [
  {
    link: "dashboard",
    href: "/a/dashboard/default",
    component: MdOutlineDashboard,
  },
  {
    link: "tickets",
    href: "/a/tickets/filter/alltickets",
    component: RiTicket2Line,
  },
  {
    link: "contacts",
    href: "/a/contacts/filter/allcontacts",
    component: MdPersonOutline,
  },
  { link: "solutions", href: "/a/solutions", component: IoBookOutline },
  { link: "admin", href: "/a/admin", component: MdOutlineSettings },
];

const SideBarTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#123d52",
    color: "white",
    boxShadow: theme.shadows[1],
    fontSize: 12,
    textTransform: "capitalize",
    alignSelf: "center",
    justifySelf: "center",
  },
}));

const Navigation = ({ NavLinks }: any) => {
  const pathname = usePathname();

  return (
    <>
      {NavLinks.map((link: any, i: any) => {
        const isActive = pathname.replace("/a/", "/");

        return (
          <div key={i}>
            {link.link === "admin" ? (
              <SideBarTooltip key={i} title="Admin" placement="right-start">
                <Link className="relative flex" href={link.href}>
                  <div
                    className={`${
                      isActive.includes(link.href.replace("/a/", "/"))
                        ? "bg-[#ffffff2c] text-slate-50"
                        : "hover:bg-[#ffffff2c] "
                    }    p-2 
             self-center text-slate-400 text-2xl hover:text-slate-100 rounded-lg `}
                  >
                    <link.component />
                  </div>
                </Link>
              </SideBarTooltip>
            ) : (
              <SideBarTooltip key={i} title={link.link} placement="left-end">
                <Link className="relative flex" href={link.href}>
                  <div
                    className={`${
                      isActive.includes(link.href.replace("/a/", "/"))
                        ? "bg-[#ffffff2c] text-slate-50"
                        : "hover:bg-[#ffffff2c] "
                    }    p-2 
         self-center text-slate-400 text-2xl hover:text-slate-100 rounded-lg `}
                  >
                    <link.component />
                  </div>
                </Link>
              </SideBarTooltip>
            )}
          </div>
        );
      })}
    </>
  );
};

const SideBar = () => {
  return (
    <div className="sticky top-0  bg-[#123d52] h-screen flex flex-col gap-5 w-[50px] z-30">
      <Link
        href={"/a/dashboard/default"}
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
      <div className="flex flex-col  gap-8 pt-8 px-1">
        {NavLinks.map((Navlink, i) => (
          <Navigation NavLinks={[Navlink]} key={i} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
