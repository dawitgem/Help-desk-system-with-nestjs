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
          className=" self-center p-5 border w-[90%] rounded-md hover:border-blue-800 flex justify-between"
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold text-gray-700">
              {ticket.Subject}
            </h1>
            <p className="text-md text-gray-400">
              {formatDistanceToNow(new Date(ticket.CreatedAt))} Ago
            </p>
          </div>
          <div className="flex gap-1">
            <span className="m-1 w-[20px] h-[20px] text-blue border-inherit border bg-green-600 rounded-md"></span>
            <h1 className="text-lg text-gray-600">Open</h1>
          </div>
        </Link>
      ))}
    </>
  );
};

export default TicketList;
