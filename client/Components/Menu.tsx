"use client";
import { Avatar, Backdrop } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaTimes } from "react-icons/fa";
import { LiaHomeSolid } from "react-icons/lia";
import { BsBook } from "react-icons/bs";
import { RiTicket2Line } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/Redux/features/userSlice";
import { UserProfileModal } from "./Navbar";

interface MenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const Menu = ({ open, setOpen }: MenuProps) => {
  const pathname = usePathname();
  const { user, isAuth, error } = useSelector(selectUser);
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
    document.addEventListener("click", (e: MouseEvent) => {
      handleClickOutside(e);
    });
    return document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div className="md:hidden block">
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          height: "100vh",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
        open={open}
      >
        <div className="flex w-[230px] h-full  ">
          <button
            className="bg-slate-50 w-[40px] h-[40px] border border-gray-200 flex flex-col p-1 rounded-bl-md"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="text-gray-700 text-2xl self-center" />
          </button>
          <div className="w-full h-full flex flex-col gap-4 bg-white ">
            {user && isAuth ? (
              <div className="bg-slate-100 p-2 h-14" ref={ProfilemodalRef}>
                <div className="flex gap-10">
                  <button
                    className="w-[40px] h-[40px] rounded-full bg-slate-800"
                    onClick={() => {
                      setOpenProfileModal((prevState) => !prevState);
                    }}
                  >
                    <Avatar
                      src={user?.Image || ""}
                      alt="profile pic"
                      className="w-full h-full bg-slate-400 rounded-full shadow-md"
                    >
                      {user.FullName?.slice(0, 1)}
                    </Avatar>
                  </button>
                  <p className="text-md text-gray-700 font-semibold self-center">
                    {user.UserName}
                  </p>
                </div>
                {openProfileModal && (
                  <UserProfileModal
                    setOpen={setOpenProfileModal}
                    top={40}
                    right={195}
                    width={120}
                    avatar={false}
                    setOpenMenu={setOpen}
                  />
                )}
              </div>
            ) : (
              <div className="flex text-gray-700 text-sm font-medium gap-2 bg-slate-50 p-4 h-14">
                <Link
                  href={"/support/login"}
                  className=""
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href={"/support/signup"}
                  className="border-l border-gray-300 px-2"
                  onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                >
                  <RiTicket2Line className="self-center text-2xl " />
                  <p className=" self-center text-md ">Tickets</p>
                </Link>
              )}

              <Link
                href="/support/tickets/new"
                className=" w-full border border-gray-300 rounded-md p-3 bg-slate-50   text-gray-700  text-md-[17px]  font-medium text-center "
                onClick={() => setOpen(false)}
              >
                Submit a ticket
              </Link>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default Menu;
