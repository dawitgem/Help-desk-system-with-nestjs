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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TicketList = () => {
  const { Tickets } = useSelector(selectTicket);
  const handleBackground = (Status: string) => {
    let background: string = "";
    if (Status === "Open") background = "bg-green-600";
    else if (Status === "Pending") background = "bg-gray-600";
    else if (Status === "Closed") background = "bg-red-600";
    else if (Status === "Resolved") background = "bg-blue-400";
    return background;
  };
  console.log(Tickets);
  return (
    <>
      {Tickets.map((ticket: Ticket, i) => (
        <Link
          key={i}
          href={`../support/tickets/${ticket.Id}`}
          className=" self-center py-2 px-5 border md:w-[90%] w-[100%] rounded-md hover:border-blue-800 flex flex-col gap-3 "
        >
          <div className="w-full flex justify-between ">
            <h1 className="text-xl font-bold text-gray-700 w-[85%] break-words">
              {ticket.Subject}
            </h1>
            <div className="flex gap-1">
              <span
                className={`self-center m-1 md:w-[15px] md:h-[15px] w-[10px] h-[10px] text-blue border-inherit border  md:rounded-md rounded-sm ${handleBackground(
                  ticket.Status
                )}`}
              ></span>
              <h1 className="md:text-lg text-sm text-gray-600 self-center font-medium">
                {ticket.Status}
              </h1>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-md text-gray-400">
              created :{" "}
              {formatDistanceToNow(new Date(ticket.CreatedAt)).replace(
                "about",
                ""
              )}{" "}
              Ago
            </p>
            {ticket.UpdatedAt && (
              <p className="text-md text-gray-400">
                updated :
                {formatDistanceToNow(new Date(ticket.UpdatedAt)).replace(
                  "about",
                  ""
                )}{" "}
                Ago
              </p>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default TicketList;
