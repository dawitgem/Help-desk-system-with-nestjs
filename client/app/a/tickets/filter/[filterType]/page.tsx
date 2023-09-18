"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { BsChevronDown, BsPersonAdd, BsTrash } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import AgentPageFetchedTickets from "@/Components/AgentPageFetchedTickets";
import { FormControlLabel } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const tickets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const FilterTicketPage = () => {
  const [checked, setChecked] = React.useState(tickets.map((ticket) => false));
  return (
    <div>
      <NavbarAgent currentPage="All tickets" />
      <div className="sticky z-[1] top-14 p-4 h-14 bg-slate-50 border flex justify-between">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <FormControlLabel
              label=""
              control={
                <Checkbox
                  checked={!checked.includes(false)}
                  onChange={(event) => {
                    setChecked(tickets.map((ticket) => event.target.checked));
                  }}
                  className=" text-gray-200"
                />
              }
            />

            {checked.includes(true) ? (
              <>
                <div className="flex gap-2">
                  <button className="border border-gray-300  flex justify-center align-middle gap-1 p-2 h-8  text-gray-800 bg-slate-100 hover:bg-slate-200 rounded-md ">
                    <BsPersonAdd className="self-center text-[12px]" />
                    <p className="self-center text-sm ">Assign</p>
                  </button>
                  <button className="border border-gray-300  flex justify-center align-middle gap-1 p-2 h-8  text-gray-800 bg-slate-100 hover:bg-slate-200 rounded-md ">
                    <FiCheckCircle className="self-center text-[12px]" />
                    <p className="self-center text-sm ">Close</p>
                  </button>{" "}
                  <button className="border border-gray-300  flex justify-center align-middle gap-1 p-2 h-8  text-gray-800 bg-slate-100 hover:bg-slate-200 rounded-md ">
                    <AiOutlineStop className="self-center text-[12px]" />
                    <p className="self-center text-sm ">Spam</p>
                  </button>{" "}
                  <button className="border border-gray-300  flex justify-center align-middle gap-1 p-2 h-8  text-gray-800 bg-slate-100 hover:bg-slate-200 rounded-md ">
                    <BsTrash className="self-center text-[12px]" />
                    <p className="self-center text-sm ">Delete</p>
                  </button>{" "}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">Sort by :</p>
                <button className="self-center flex gap-2">
                  <p className="text-sm text-gray-800">Due Date</p>
                  <BsChevronDown className="text-[8px] text-black self-center" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <AgentPageFetchedTickets
        setChecked={setChecked}
        checked={checked}
        tickets={tickets}
      />
    </div>
  );
};

export default FilterTicketPage;
