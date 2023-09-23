"use client";
import LinkTrack from "@/Components/LinkTrack";
import PageHero from "@/Components/PageHero";
import Searchbox from "@/Components/Searchbox";
import TextEditor from "@/Components/TextEditor";
import React from "react";
import { PiTicket } from "react-icons/pi";

const TicketSubmissionPage = () => {
  return (
    <div>
      <PageHero
        pageTitle="Submit ticket"
        currentLink="ticketTitle"
        Links={[{ link: "Home", href: "/support/" }]}
        Icon={<PiTicket className="md:text-5xl text-2xl text-slate-50" />}
      />
      <TextEditor />
    </div>
  );
};

export default TicketSubmissionPage;
