"use client";
import Editor from "@/Components/Editor";
import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import { readonlymodules } from "@/Inputs";
import React from "react";
import {
  BsPencil,
  BsPencilFill,
  BsThreeDotsVertical,
  BsTicket,
  BsTrash,
} from "react-icons/bs";

const TicketIdPage = () => {
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="bg-[#063750] h-[250px] flex flex-col  gap-40">
        <div className="bg-[#063750] fixed z-10 md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 ">
          <LinkTrack
            Links={[
              { link: "Home", href: "../../support/" },
              { link: "tickets", href: "../../support/tickets" },
            ]}
            currentLink="tickets"
          />

          <Searchbox
            iconstyle="w-[60px]"
            width="md:w-[40%] w-[90%] "
            height="h-[50px]"
            inputstyle="placeholder:text-md"
          />
        </div>
        <div className="md:p-32 pt-32 flex gap-5 ">
          <BsTicket className="md:text-5xl text-2xl text-slate-50" />
          <h1 className="text-white md:text-5xl text-2xl font-bold  overflow-x-clip">
            Ticket name
          </h1>
        </div>
      </div>
      <div className="md:px-20 h-full md:p-10 p-2 ">
        <div className="bg-white md:p-10 rounded-lg ">
          <div className="flex  float-right">
            <button className=" md:flex gap-2 border-blue-300 border hover:shadow-sm hover:shadow-blue-400 bg-slate-50 p-2 rounded-l-lg ">
              <BsPencil className="md:text-xl text-sm text-gray-500" />
            </button>
            <button className=" md:flex gap-2 border-blue-300 border hover:shadow-sm hover:shadow-blue-400 bg-slate-50 p-2 rounded-r-lg ">
              <BsTrash className="md:text-xl text-sm text-gray-500" />
            </button>
          </div>
          <div className="pt-12 self-center w-full">
            <Editor
              modules={readonlymodules}
              readonly={true}
              style={"w-full"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketIdPage;
