"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { BsCheck, BsChevronDown, BsPersonAdd, BsTrash } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";
import AgentPageFetchedTickets from "@/Components/AgentPageFetchedTickets";
import { FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAgentTicket } from "@/app/Redux/features/agentTicketSlice";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/utils/QueryActions";

const TicketCheckBoxOptions = () => {
  const {
    data: AgentTickets,
    isError,
    isLoading: Loading,
    isSuccess,
    error,
  } = useQuery({ queryKey: ["agentTickets"], queryFn: ()=>getTickets() });
  console.log(AgentTickets)
  const [checked, setChecked] = useState<any[]>(AgentTickets.map(() => false));
  const handleCheckboxChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = e.target.checked;
    setChecked(updatedChecked);
  };

  return (
    <>
      <div className="sticky z-[1] top-14 p-4 h-14 bg-slate-50 border flex justify-between">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <FormControlLabel
              label=""
              control={
                <Checkbox
                  checked={!checked.includes(false)}
                  onChange={(event) => {
                    setChecked(
                      AgentTickets.map(() => event.target.checked)
                    );
                  }}
                  className=" text-gray-200"
                />
              }
            />

            {checked.includes(true) ? (
              <CheckboxOptionButtons />
            ) : (
              <SortOptions />
            )}
          </div>
        </div>
      </div>
      <AgentPageFetchedTickets
        onCheck={handleCheckboxChange}
        checked={checked}
        tickets={AgentTickets}
      />
    </>
  );
};

export default TicketCheckBoxOptions;

function CheckboxOptionButtons() {
  return (
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
  );
}

const sortOptions = ["Due Date", "Status", "Last Update"];
function SortOptions() {
  const sortRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortModalOpen(false);
      }
    };

    document.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      handleClickOutside(e);
    });
    return document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col" ref={sortRef}>
      <div className="flex gap-1 ">
        <p className="text-sm text-gray-500">Sort by : </p>
        <button
          className="self-center flex gap-2"
          onClick={() => setSortModalOpen((prevState) => !prevState)}
        >
          <p className="text-sm text-gray-800"> {sortBy}</p>
          <BsChevronDown className="text-[8px] text-black self-center" />
        </button>
      </div>
      {sortModalOpen && (
        <div className="bg-white border rounded-md shadow-md md:absolute left-0 w-[150px] top-full z-50 flex flex-col gap-1 p-2 ">
          {sortOptions.map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`${
                sortBy.includes(sort)
                  ? "bg-blue-100 text-blue-500"
                  : "text-gray-600 hover:bg-slate-100"
              }  self-start w-full flex justify-between px-2 z-50 text-sm `}
            >
              <p>{sort}</p>
              {sortBy.includes(sort) && (
                <BsCheck className="text-sm text-blue-700" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
