"use client";
import Editor from "@/Components/Editor";
import LinkTrack from "@/Components/LinkTrack";
import PageHero from "@/Components/PageHero";
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
      <PageHero
        pageTitle="Ticket"
        currentLink="ticketTitle"
        Links={[
          { link: "Home", href: "/support/" },
          { link: "tickets", href: "/support/tickets" },
        ]}
        Icon={<BsTicket className="md:text-5xl text-2xl text-slate-50" />}
      />
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
            {/* <Editor
              modules={readonlymodules}
              readonly={true}
              style={"w-full"}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketIdPage;
