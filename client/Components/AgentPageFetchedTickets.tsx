"use client";
import { Avatar, Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent } from "react";
import { BsGlobe, BsPhone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import AgentPageTicketsFilterForm from "./AgentPageTicketsFilterForm";
import {
  Ticket,
  selectAgentTicket,
} from "@/app/Redux/features/agentTicketSlice";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import TicketOptions from "./TicketOptions";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface AgentPageFetchedTicketProp {
  onCheck: (i: number, e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean[];
  tickets: any[];
}
const AgentPageFetchedTickets = ({
  onCheck,
  checked,
  tickets,
}: AgentPageFetchedTicketProp) => {
  
  const ReportedVia = (ticket: Ticket) => {
    if (ticket.ReportedVia === "Web")
      return <BsGlobe className="self-center text-gray-500 text-sm" />;
    if (ticket.ReportedVia === "Email")
      return <MdOutlineMail className="self-center text-gray-500 text-sm" />;
    if (ticket.ReportedVia === "Phone")
      return <BsPhone className="self-center text-gray-500 text-sm" />;
  };

  return (
    <div className="flex gap-2 w-full ">
      <div className="flex flex-col gap-2 flex-[3] p-4 w-full h-[calc(100vh-112px)] overflow-auto">
        {tickets.map((ticket, i) => (
          <div
            key={ticket.Ticket.Id}
            className="bg-white p-4 flex gap-3 w-full rounded-md shadow-md border border-gray-300 "
          >
            <div className="flex justify-between  w-full">
              <div className="self-center flex gap-3">
                <FormControlLabel
                  label=""
                  control={
                    <Checkbox
                      checked={checked[i]}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                        },
                      }}
                      className="text-gray-200"
                      onChange={(e) => onCheck(i, e)}
                    />
                  }
                />
                <Avatar
                  src={ticket?.Contact.Image || " "}
                  alt="profile pic"
                  className="w-[40px] h-[40px] bg-slate-400 rounded-lg shadow-md"
                >
                  {ticket?.Contact.UserName?.slice(0, 1)}
                </Avatar>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/a/tickets/${ticket.Ticket.Id}`}
                    className=" text-gray-900 font-bold text-sm hover:text-blue-700"
                  >
                    {ticket?.Ticket.Subject}
                  </Link>
                  <div className="flex gap-2">
                    {ReportedVia(ticket.Ticket)}
                    <Link
                      href={`/a/contact/${ticket.Contact.Id}`}
                      className="text-gray-800 text-[13px] hover:text-blue-500"
                    >
                      {ticket.Contact.UserName}
                    </Link>
                    <p className="text-gray-500 text-[13px] ">
                      {formatDistanceToNow(new Date(ticket.Ticket.CreatedAt)).replace(
                        "about",
                        ""
                      )}{" "}
                      Ago
                    </p>
                    <p className="text-gray-500 text-[13px]">
                      Resolution Due :
                      {formatDistanceToNow(new Date(ticket.Ticket.ResolutionDue))}
                    </p>
                  </div>
                </div>
              </div>
              <TicketOptions ticket={ticket.Ticket} />
            </div>
          </div>
        ))}
      </div>
      <AgentPageTicketsFilterForm />
    </div>
  );
};

export default AgentPageFetchedTickets;
