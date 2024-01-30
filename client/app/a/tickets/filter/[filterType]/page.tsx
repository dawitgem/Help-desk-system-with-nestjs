"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  AgentfetchTicketStart,
  AgentfetchTicketSuccess,
  selectAgentTicket,
} from "@/app/Redux/features/agentTicketSlice";
import TicketCheckBoxOptions from "@/Components/TicketCheckBoxOptions";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/utils/QueryActions";
import { MdBusAlert } from "react-icons/md";

const FilterTicketPage = ({ params }: { params: { filterType: string } }) => {
  const dispatch = useDispatch();
  const {
    data: AgentTickets,
    isError,
    isLoading: Loading,
    isSuccess,
    error,
  } = useQuery({ queryKey: ["agentTickets"], queryFn: ()=>getTickets() });
  const [checked, setChecked] = useState<any[]>([]);
  console.log(AgentTickets)
  useEffect(() => {
    if (AgentTickets && isSuccess)
      dispatch(AgentfetchTicketSuccess(AgentTickets));
  }, [AgentTickets, isSuccess]);

  return (
    <div className="flex flex-col ">
      <NavbarAgent currentPage="Tickets" />
      {isError && (
        <div className="w-full h-full flex flex-col p-10">
          <div className="w-full p-4 bg-[#ff00005e] flex gap-5 justify-center align-middle items-center">
            <MdBusAlert className="text-2xl text-red-600 self-center" />
            <p className="font-bold text-md text-red-600 self-center">
              {error.message}
            </p>
          </div>
        </div>
      )}

      {Loading && <CircularProgress className="self-center" />}
      {AgentTickets&&AgentTickets.length > 0 && <TicketCheckBoxOptions />}
    </div>
  );
};

export default FilterTicketPage;
