"use client";
import Link from "next/link";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CgMenuRight } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, CircularProgress } from "@mui/material";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  LogoutSucess,
  getProfileStart,
  selectUser,
} from "@/app/Redux/features/userSlice";
import Cookies from "js-cookie";

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
  const { user, isAuth, error, Loading } = useSelector(selectUser);
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const ProfilemodalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="md:p-0 p-4">
        <nav className="hidden md:block">
          <ul className="flex lg:gap-8 md:gap-1 pt-[10px]">
            <Navigation
              NavLinks={[
                { link: "Home", href: "/support" },
                { link: "Knowledgebase", href: "/support/solutions" },
              ]}
            />

            {user && user?.Verified === true && isAuth ? (
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
                      src={user.Image || " "}
                      alt="image"
                      className="w-[50px] h-[50px] bg-slate-400 rounded-full shadow-md object-contain uppercase text-xl  "
                    >
                      {user.FullName?.slice(0, 1)}
                    </Avatar>
                  </button>
                  {openProfileModal && (
                    <UserProfileModal
                      setOpen={setOpenProfileModal}
                      top={72}
                      right={0}
                      width={150}
                      avatar={true}
                    />
                  )}
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
    </>
  );
};

export default Navbar;
interface UserProfileModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  top: number;
  right: number;
  width: number;
  avatar: boolean;
  setOpenMenu?: Dispatch<SetStateAction<boolean>>;
}
export function UserProfileModal({
  setOpen,
  top,
  right,
  width,
  avatar,
  setOpenMenu,
}: UserProfileModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isAuth } = useSelector(selectUser);
  return (
    <div
      className="bg-white   absolute  border rounded-md flex flex-col gap-3 z-20 "
      style={{ width: `${width}px`, top: `${top}px`, right: `${right}px` }}
    >
      {user && user?.Verified === true && (
        <>
          {avatar && (
            <div className="flex gap-4 p-2 border-b">
              <Avatar
                src={user?.Image || " "}
                alt="profile pic"
                className="w-[30px] h-[30px] bg-slate-400 rounded-full shadow-md"
              >
                {user.FullName?.slice(0, 1)}
              </Avatar>
              <h1 className="text-gray-700 text-sm font-semibold self-center ">
                {user.UserName}
              </h1>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {user && user?.Verified === true && user.UserType !== "Customer" ? (
              <>
                <Link
                  href={"/a/dashboard/default"}
                  className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
                  onClick={() => {
                    if (setOpenMenu) setOpenMenu(false);
                    setOpen(false);
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  href={"/support/profile/edit"}
                  className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
                  onClick={() => {
                    if (setOpenMenu) setOpenMenu(false);
                    setOpen(false);
                  }}
                >
                  MyProfile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/support/profile/edit"}
                  className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
                  onClick={() => {
                    if (setOpenMenu) {
                      console.log("come on man");
                      setOpenMenu(false);
                    }
                    setOpen(false);
                  }}
                >
                  My profile
                </Link>
              </>
            )}

            <button
              className="flex flex-col p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
              onClick={() => {
                if (setOpenMenu) {
                  setOpenMenu(false);
                }
                const cookieOptions = {
                  httpOnly: true,
                  secure: true,
                  SameSite: "None",
                  expires: new Date(Date.now() + 15 * 60 * 1000),
                  path: "/",
                };
                const cookieOptions2 = {
                  httpOnly: true,
                  secure: true,
                  SameSite: "None",
                  expires: new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000),
                  path: "/",
                };
                Cookies.remove("access_token", cookieOptions);
                Cookies.remove("refresh_token", cookieOptions);
                router.push("/support/");
                dispatch(LogoutSucess());
              }}
            >
              <p className="self-start">Sign out</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
