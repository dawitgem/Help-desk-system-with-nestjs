"use client";
import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import TextEditor from "@/Components/TextEditor";
import React from "react";
import { PiTicket } from "react-icons/pi";

const TicketSubmissionPage = () => {
  return (
    <div>
      <div className="bg-[#063750] h-[250px] flex flex-col  gap-40">
        <div className="bg-[#063750] fixed z-[5] md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 ">
          <LinkTrack
            Links={[{ link: "Home", href: "./support/" }]}
            currentLink="New ticket..."
          />

          <Searchbox
            postionStyle="float-left"
            iconstyle="w-[40px]"
            width="md:w-[40%] w-[90%] "
            height="h-[50px]"
            inputstyle="placeholder:text-md"
          />
        </div>
        <div className="md:p-32 pt-32 flex gap-5  break-words w-[90%] ">
          <PiTicket className="md:text-5xl text-2xl text-slate-50" />
          <h1 className="text-white md:text-5xl text-2xl font-bold w-full break-words  ">
            Submit ticket
          </h1>
        </div>
      </div>
      <TextEditor />
    </div>
  );
};

export default TicketSubmissionPage;
