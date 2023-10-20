"use client";
import { Ticket, selectTicket } from "@/app/Redux/features/ticketSlice";
import {
  differenceInDays,
  format,
  formatDistance,
  formatDistanceToNow,
  formatRelative,
  subDays,
} from "date-fns";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const TicketList = () => {
  const { Tickets } = useSelector(selectTicket);
  return (
    <>
      {Tickets.map((ticket: Ticket, i) => (
        <Link
          key={i}
          href={`../support/tickets/${ticket.Id}`}
          className=" self-center py-2 px-5 border md:w-[90%] w-[100%] rounded-md hover:border-blue-800 flex justify-between"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-gray-700">
              {ticket.Subject}
            </h1>
            <p className="text-md text-gray-400">
              {formatDistanceToNow(new Date(ticket.CreatedAt))} Ago
            </p>
          </div>
          <div className="flex gap-1">
            <span className="self-center m-1 md:w-[15px] md:h-[15px] w-[10px] h-[10px] text-blue border-inherit border bg-green-600 md:rounded-md rounded-sm"></span>
            <h1 className="md:text-lg text-sm text-gray-600 self-center font-medium">
              Open
            </h1>
          </div>
        </Link>
      ))}
    </>
  );
};

export default TicketList;
