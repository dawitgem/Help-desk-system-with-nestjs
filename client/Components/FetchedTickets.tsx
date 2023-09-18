"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TicketList from "./TicketList";

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
const FetchedTickets = () => {
  return (
    <div className="md:p-20 ">
      <div className="p-5 bg-white flex flex-col gap-2 shadow-md rounded-lg">
        <button className="lg:hidden   text-2xl   float-right self-end  ">
          <BsThreeDotsVertical className="text-gray-500" />
        </button>
        <div className="hidden md:flex bg-white p-10  justify-end  gap-5">
          {options.map((option, i) => (
            <Autocomplete
              key={i}
              className="w-[20%] "
              disablePortal
              id="combo-box-demo"
              options={option.option}
              renderInput={(params) => (
                <TextField
                  key={i}
                  {...params}
                  label={option.label}
                  className="text-blue-500"
                />
              )}
            />
          ))}
        </div>
        <TicketList />
      </div>
    </div>
  );
};

export default FetchedTickets;
