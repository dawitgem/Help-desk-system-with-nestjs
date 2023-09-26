"use client";
import Link from "next/link";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { Avatar } from "@mui/material";
import dawit from "@/public/asset/download.png";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/Redux/features/userSlice";

const Navigation = ({ NavLinks }: any) => {
  const pathname = usePathname();

  return (
    <>
      {NavLinks.map((link: any, i: any) => {
        const isActive = pathname.replace("/support/", "/");

        return (
          <li className="mt-4" key={i}>
            <Link
              className={`${
                isActive.includes(link.href.replace("/support/", "/"))
                  ? "bg-[#186085] text-white font-medium text-[17px]"
                  : "hover:bg-white text-[17px] text-gray-700 font-medium "
              } p-4  `}
              href={link.href}
            >
              {link.link}
            </Link>
          </li>
        );
      })}
    </>
  );
};
const Navbar = () => {
  const { user, isAuth, error } = useSelector(selectUser);
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const ProfilemodalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ProfilemodalRef.current &&
        !ProfilemodalRef.current.contains(e.target as Node)
      )
        setOpenProfileModal(false);
    };
    document.addEventListener("mousedown", (e: MouseEvent) => {
      e.stopPropagation();
      handleClickOutside(e);
    });

    return document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useLayoutEffect(() => {}, []);
  return (
    <div className="md:p-0 p-4">
      <nav className="hidden md:block">
        <ul className="flex lg:gap-8 md:gap-1 pt-[10px]">
          <Navigation
            NavLinks={[
              { link: "Home", href: "/support" },
              { link: "Knowledgebase", href: "/support/solutions" },
            ]}
          />

          {user ? (
            <>
              <Navigation
                NavLinks={[{ link: "Ticket", href: "/support/tickets" }]}
              />
              <li className="mt-4 ">
                <Link
                  href="/support/tickets/new"
                  className=" lg:w-[80px] w-[20px] px-2 py-3 border  bg-white  rounded-lg text-gray-700  md:text-[15px] text-sm font-medium"
                >
                  Submit ticket
                </Link>
              </li>
              <div className="relative " ref={ProfilemodalRef}>
                <button
                  className=""
                  onClick={() => setOpenProfileModal(!openProfileModal)}
                >
                  <Avatar
                    src={dawit.src}
                    alt="image"
                    className="w-[50px] h-[50px] bg-slate-400 rounded-full shadow-md object-contain "
                  >
                    N
                  </Avatar>
                </button>
                {openProfileModal && <UserProfileModal />}
              </div>
            </>
          ) : (
            <>
              <li className="mt-4 ">
                <Link
                  href="/support/tickets/new"
                  className=" p-3 border  bg-white  rounded-lg text-gray-700 text-sm font-medium"
                >
                  Submit Ticket
                </Link>
              </li>
              <div className="flex divide-x divide-black gap-3">
                <li className="mt-4">
                  <Link
                    className="p-4 text-md text-gray-700 font-semibold"
                    href={"/support/login"}
                  >
                    Login
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    className="p-4 ml-2 text-md text-gray-700 font-semibold"
                    href={"/support/signup"}
                  >
                    Sign up
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
      <button
        className="md:hidden   text-2xl mt-6   "
        onClick={() => setOpenMenu(true)}
      >
        <CgMenuRight />
      </button>
      {openMenu && <Menu open={openMenu} setOpen={setOpenMenu} />}
    </div>
  );
};

export default Navbar;

function UserProfileModal() {
  const agent = false;
  return (
    <div className="bg-white w-[150px]  absolute top-[72px] right-0 border rounded-md flex flex-col gap-3 z-20">
      <div className="flex gap-4 p-2 border-b">
        <Avatar
          src={dawit.src}
          alt="profile pic"
          className="w-[30px] h-[30px] bg-slate-400 rounded-full shadow-md"
        >
          N
        </Avatar>
        <h1 className="text-gray-700 text-sm font-semibold self-center ">
          User Name
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        {agent ? (
          <>
            {" "}
            <Link
              href={"/a/dashboard/default"}
              className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
            >
              Dashboard
            </Link>
            <Link
              href={"/a/dashboard/default"}
              className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
            >
              MyProfile
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/support/profile/edit"}
              className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
            >
              My profile
            </Link>
          </>
        )}

        <Link
          href={"/a/dashboard/default"}
          className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
