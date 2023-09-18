"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsBell, BsChevronDown, BsPlusSquare, BsSearch } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { AiOutlineFieldTime, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { Avatar, Backdrop } from "@mui/material";
import { LiaTimesSolid } from "react-icons/lia";

const NewDropDownMenu = () => {
  const [openNewContact, setOpenNewContact] = useState(false);
  return (
    <>
      <ul className="p-4 bg-white w-[180px] h-[150px] border border-gray-400 rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-8 right-0">
        <li className="p-1 hover:bg-slate-100">
          <Link
            href={"/a/tickets/new"}
            className="w-52 text-gray-700 text-sm font-medium  p-2"
          >
            New Ticket
          </Link>
        </li>{" "}
        <li className="p-1 hover:bg-slate-100">
          <Link
            href={""}
            className="w-52 text-gray-700 text-sm font-medium hover:bg-slate-100 p-2"
            onClick={() => {
              setOpenNewContact(true);
            }}
          >
            New Contact
          </Link>
        </li>{" "}
        <li className="p-1 hover:bg-slate-100">
          <Link
            href={"/a/tickets/new"}
            className="w-52 text-gray-700 text-sm font-medium hover:bg-slate-100 p-2"
          >
            New Email
          </Link>
        </li>
      </ul>
      {openNewContact && (
        <NewContactsForm open={openNewContact} setOpen={setOpenNewContact} />
      )}
    </>
  );
};

export default NewDropDownMenu;

interface NewContactFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function NewContactsForm({ open, setOpen }: NewContactFormProps) {
  return (
    <div>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          height: "100vh",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
        open={open}
      >
        <div className="flex   border-t-2 border-[#102034] w-1/2 h-full justify-self-end self-start">
          <button
            className="bg-[#102034] text-white text-xl p-[2px] w-[25px] h-[25px]"
            onClick={() => setOpen(false)}
          >
            <LiaTimesSolid />
          </button>
          <div className="bg-white w-full h-full py-5 px-10 flex flex-col gap-20">
            <div className="flex gap-5">
              <AiOutlineFieldTime className="text-3xl text-gray-700 self-center border-2 border-white rounded-full" />

              <h2 className="text-xl text-gray-800 font-medium self-center">
                New Contact{" "}
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-b flex flex-col ">lskjdflaskdjf</div>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
