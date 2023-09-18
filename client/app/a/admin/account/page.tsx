"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, green } from "@mui/material/colors";
import { GoMail, GoMegaphone } from "react-icons/go";
import { PiPhoneThin } from "react-icons/pi";
import EditAccountDetail from "@/Components/EditAccountDetail";

const AccountPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <NavbarAgent
        currentPage="Account"
        link={[{ name: "Admin", href: "/a/admin" }]}
      />
      <div className="p-5 ">
        <div className="bg-white p-5 h-[calc(100vh-120px)] overflow-auto rounded-md shadow-sm flex flex-col gap-5">
          <div className="flex justify-between p-5">
            <h1 className="text-gray-700 text-3xl font-semibold">
              Account Settings{" "}
            </h1>
          </div>
          <div className="p-10 border rounded-md flex gap-20 ">
            <Avatar
              src=""
              variant="rounded"
              className="w-[100px] h-[100px] bg-slate-300"
            >
              N
            </Avatar>
            <div className="flex flex-col gap-5">
              <h1 className="text-xl text-gray-800 font-medium">Admin Name</h1>
              <div className="flex gap-5">
                <GoMail className="text-2xl text-gray-700 " />
                <p className="text-gray-800">Adminemail@gmail.com</p>
              </div>{" "}
              <div className="flex gap-5">
                <PiPhoneThin className="text-2xl text-gray-700 " />
                <p className="text-gray-800">0913176534</p>
              </div>{" "}
              <button
                className="border p-2 bg-slate-50 rounded-md shadow-sm text-gray-600 w-[70px] "
                onClick={() => setOpen(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && <EditAccountDetail open={open} setOpen={setOpen} />}
    </div>
  );
};

export default AccountPage;
