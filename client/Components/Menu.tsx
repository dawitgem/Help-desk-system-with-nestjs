"use client";
import {  Backdrop } from "@mui/material";
import React, {
  useState,
} from "react";
import { FaTimes } from "react-icons/fa";
import { LiaHomeSolid } from "react-icons/lia";
import { BsBook } from "react-icons/bs";
import { RiTicket2Line } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuRight } from "react-icons/cg";
import { UserProfilePopOver } from "./Listbox";
import { user } from "@/app/Redux/features/userSlice";

interface MenuProps {
  user: user;
}
const Menu = ({ user }: MenuProps) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
    <button
          className="md:hidden   text-2xl mt-6   "
          onClick={() => setOpenMenu(true)}
        >
          <CgMenuRight />
        </button>

    <div className="md:hidden block">
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          height: "100vh",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
        open={openMenu}
      >
        <div className="flex w-[230px] h-full  ">
          <button
            className="bg-slate-50 w-[40px] h-[40px] border border-gray-200 flex flex-col p-1 rounded-bl-md"
            onClick={() => setOpenMenu(false)}
          >
            <FaTimes className="text-gray-700 text-2xl self-center" />
          </button>
          <div className="w-full h-full flex flex-col gap-4 bg-white ">
            {user  && user.Verified ? (              
                  <UserProfilePopOver
                    top={40}
                    right={195}
                    width={120}
                    avatar={false}
                  />
            ) : (
              <div className="flex text-gray-700 text-sm font-medium gap-2 bg-slate-50 p-4 h-14">
                <Link
                  href={"/support/login"}
                  className=""
                  onClick={() => setOpenMenu(false)}
                >
                  Login
                </Link>
                <Link
                  href={"/support/signup"}
                  className="border-l border-gray-300 px-2"
                  onClick={() => setOpenMenu(false)}
                >
                  signup
                </Link>
              </div>
            )}
            <div className="bg-white w-full h-full flex flex-col gap-4 px-2 pt-4">
              <Link
                href={"/support/"}
                className={`flex gap-2  p-3 font-medium  text-[17px]  ${
                  pathname === "/support"
                    ? "bg-[#186085] text-white "
                    : " text-gray-700 "
                }`}
                onClick={() => setOpenMenu(false)}
              >
                <LiaHomeSolid className="self-center text-2xl " />
                <p className="self-center text-md font-medium">Home</p>
              </Link>
              <Link
                href={"/support/solutions"}
                className={`flex gap-2  p-3 font-medium  text-[17px]  ${
                  pathname.includes("/support/solutions")
                    ? "bg-[#186085] text-white "
                    : " text-gray-700 "
                }`}
                onClick={() => setOpenMenu(false)}
              >
                <BsBook className="self-center text-2xl " />
                <p className=" self-center text-md ">Knowledgebase</p>
              </Link>
              {user && (
                <Link
                  href={"/support/tickets"}
                  className={`flex gap-2  p-3 font-medium  text-[17px]  ${
                    pathname.includes("/support/tickets")
                      ? "bg-[#186085] text-white "
                      : " text-gray-700 "
                  }`}
                  onClick={() => setOpenMenu(false)}
                >
                  <RiTicket2Line className="self-center text-2xl " />
                  <p className=" self-center text-md ">Tickets</p>
                </Link>
              )}

              <Link
                href="/support/tickets/new"
                className=" w-full border border-gray-300 rounded-md p-3 bg-slate-50   text-gray-700  text-md-[17px]  font-medium text-center "
                onClick={() => setOpenMenu(false)}
              >
                Submit a ticket
              </Link>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
    </>
  );
};

export default Menu;



