"use client";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TicketList from "./TicketList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTicketStart,
  selectTicket,
} from "@/app/Redux/features/ticketSlice";
import { selectUser } from "@/app/Redux/features/userSlice";

interface AutocompleteOption {
  label: string;
}

const options = [
  {
    option: [
      { label: "Open or Pending", id: 1 },
      { label: "Resolved or Closed", id: 2 },
    ],
    label: "Status",
  },
  {
    option: [
      { label: "Date created", id: 1 },
      { label: "Last Modified", id: 2 },
      { label: "Priority", id: 3 },
      { label: "Status", id: 4 },
    ],
    label: "Sort by",
  },
];
interface FetchedTicketsProps {
  handleClick: () => void;
}

const FetchedTickets = ({ handleClick }: FetchedTicketsProps) => {
  const { Tickets, hasMore, Loading } = useSelector(selectTicket);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="md:p-20">
      <div className="p-5 bg-white flex flex-col gap-10 shadow-md rounded-lg">
        <button className="lg:hidden   text-2xl   float-right self-end  ">
          <BsThreeDotsVertical className="text-gray-500" />
        </button>
        <div className="hidden md:flex bg-white  px-16  justify-end  gap-5">
          {options.map((option, i) => (
            <Autocomplete
              key={i}
              className="w-[20%]  "
              disablePortal
              id={`combo-box-demo${i + 1}`}
              options={option.option}
              renderInput={(params) => (
                <TextField
                  key={i}
                  {...params}
                  sx={{ height: "20px" }}
                  label={option.label}
                  className="text-blue-500"
                />
              )}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <TicketList />
          {hasMore && (
            <div className="border rounded-md md:mx-[60px] mx-[20px] p-3 hover:bg-slate-50   shadow-sm">
              <button
                className={` w-full  flex gap-5 justify-center align-middle ${
                  Loading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer opacity-100"
                }`}
                disabled={Loading}
                onClick={handleClick}
              >
                {Loading && (
                  <CircularProgress
                    className="self-center"
                    size={30}
                    thickness={3}
                  />
                )}
                <p className="text-center text-md text-gray-700 font-semibold">
                  Load more...
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchedTickets;
