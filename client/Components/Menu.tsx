import { Avatar, Backdrop } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import dawit from "@/public/asset/download.png";
import { LiaHomeSolid } from "react-icons/lia";
import { BsBook } from "react-icons/bs";
import { RiTicket2Line } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/Redux/features/userSlice";

interface MenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const Menu = ({ open, setOpen }: MenuProps) => {
  const pathname = usePathname();
  const { user, isAuth, error } = useSelector(selectUser);

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
        <div className="flex w-[300px] h-full  ">
          <button
            className="bg-slate-50 w-[40px] h-[40px] border border-gray-200 flex flex-col p-1 rounded-bl-md"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="text-gray-700 text-2xl self-center" />
          </button>
          <div className="w-full h-full flex flex-col gap-4 bg-white ">
            {user && (
              <div className="bg-slate-100 p-4 h-14">
                <Avatar
                  src={user?.Profile}
                  alt="profile pic"
                  className="w-[20px] h-[20px] bg-slate-400 rounded-full shadow-md"
                >
                  N
                </Avatar>
              </div>
            )}
            <div className="bg-white w-full h-full flex flex-col gap-4 px-4 pt-4">
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
