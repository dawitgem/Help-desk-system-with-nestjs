"use client";
import React, {
  Dispatch,
  SetStateAction,
} from "react";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { getProfileStart, selectUser } from "@/app/Redux/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/utils/QueryActions";
import NewPopOver, { NewSearchPopOver, NotificationPopOver, ProfilePopOver } from "./Listbox";

interface NavbarAgentProps {
  currentPage: string;
  FilterComponent?: JSX.Element;
  link?: [{ name: string; href: string }] | any;
  tooltipTitle?: string;
  setAction?: Dispatch<SetStateAction<boolean>> | any;
}

const notifcation1 = false;
const NavbarAgent = ({ currentPage, link}: NavbarAgentProps) => {
  return (
    <>
      <div className="p-4  sticky  top-0 z-10 h-14 bg-white flex justify-between  ">
        <div className="flex gap-5">
          <div className="flex gap-2">
            {link && (
              <>
                {link.map(({ href, name }: any) => (
                  <div className="flex gap-2" key={href}>
                    <Link
                      href={href}
                      className="text-blue-600 font-medium self-center hover:underline"
                    >
                      {name}
                    </Link>
                    <AiOutlineRight className="text-gray-800  text-sm self-center " />
                  </div>
                ))}
              </>
            )}
            <h1 className="text-gray-800 font-medium">{currentPage}</h1>
          </div>
        </div>
        <div className="flex h-[30px] divide gap-5 relative">
         <NewPopOver/>
         <NewSearchPopOver/> 
         <NotificationPopOver/>
         <ProfilePopOver/>
        </div>
      </div>
    </>
  );
};

export default NavbarAgent;
