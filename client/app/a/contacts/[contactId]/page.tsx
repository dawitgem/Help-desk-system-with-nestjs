import NavbarAgent from "@/Components/NavbarAgent";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GrTicket } from "react-icons/gr";
import { RiTicket2Line } from "react-icons/ri";
import { TiInfoLarge } from "react-icons/ti";

const ContactDetailPage = ({ params }: { params: { contactId: string } }) => {
  return (
    <div>
      <NavbarAgent
        currentPage={params.contactId}
        link={[{ name: "Contacts", href: "/a/contacts/filter/alltickets" }]}
      />
      <div className="sticky z-[1] top-14 p-4 h-14 bg-slate-50 border flex gap-2">
        <button className="border border-gray-300 bg-white px-5 text-sm hover:bg-slate-50 text-gray-700 rounded-md shadow-sm font-medium h-8 flex gap-2 align-middle justify-center">
          <FiEdit className="self-center" />
          <p className="self-center">Edit</p>
        </button>
        <button className="border border-gray-300 bg-white px-5 text-sm hover:bg-slate-50 text-gray-700 rounded-md shadow-sm font-medium h-8 flex gap-2 align-middle justify-self-center">
          <BiTrash className="self-center" />
          <p className="self-center">Delete</p>
        </button>
      </div>
      <div className="p-3 flex gap-5">
        <div className="flex-1">
          <div className="bg-white flex flex-col border rounded-md shadow-md">
            <div className="flex justify-between p-10">
              <div className="flex gap-5 flex-1 pb-5">
                <Avatar
                  variant="square"
                  className="w-[120px] h-[120px] bg-slate-400 rounded-md shadow-md"
                >
                  N
                </Avatar>
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-xl text-gray-700 font-bold  w-full ">
                    Contacts Name
                  </h1>
                </div>
              </div>
              <button className="p-1 px-4 bg-slate-50 border self-start text-sm  text-gray-700 hover:bg-slate-100 hover:border-gray-300 rounded-md shadow-sm">
                + New ticket
              </button>
            </div>
            <div className="bg-slate-200 ">
              <p className="ml-5 p-2 text-blue-700 font-medium border-b-2 border-blue-500">
                Tickets
              </p>
            </div>
          </div>
          <div className="flex flex-col p-5 gap-5   ">
            <div className="flex  gap-10 bg-white p-5 shadow-md ">
              <RiTicket2Line className="text-gray-400  text-3xl self-center" />
              <div className="flex flex-col gap-3">
                <Link href={""} className="text-gray-700 hover:text-blue-600 ">
                  ticket subject
                </Link>
                <div className="flex flex-col gap-2  ">
                  <div className="flex gap-3 text-gray-500 text-sm self-center">
                    <p className="self-center">Status : open</p>
                    <p>
                      <span className="text-lg font-bold px-2">.</span>{" "}
                      Department : Department1
                    </p>{" "}
                    <p>
                      <span className="text-lg font-bold px-2">.</span>{" "}
                      Department : Department1
                    </p>
                  </div>
                  <div className="flex gap-3 text-gray-500 text-sm ">
                    <p className="self-center">Created : days ago</p>
                    <p>
                      {" "}
                      <span className="text-lg font-bold px-2">.</span> First
                      Response Due in : a day{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-[200px] h-[350px] border rounded-md flex flex-col gap-3 ">
          <div className="p-2 bg-slate-50 flex gap-2 rounded-md">
            <TiInfoLarge className="text-gray-500 font-bold text-xl" />
            <p className="text-gray-700 font-medium text-sm">Contact Detail</p>
          </div>
          <div className="text-[13px] text-gray-500 px-3 ">
            <p className="text-[13px] text-gray-500  ">Emails</p>
            <p className="pt-2 text-gray-700 font-semibold">. Emails</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
