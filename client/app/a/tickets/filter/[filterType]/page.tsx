"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  AgentfetchTicketStart,
  selectAgentTicket,
} from "@/app/Redux/features/agentTicketSlice";
import TicketCheckBoxOptions from "@/Components/TicketCheckBoxOptions";
import { CircularProgress } from "@mui/material";

const FilterTicketPage = ({ params }: { params: { filterType: string } }) => {
  const dispatch = useDispatch();
  const { AgentTickets, Loading, error } = useSelector(selectAgentTicket);
  const [checked, setChecked] = useState<any[]>([]);
  useEffect(() => {
    const getTickets = async () => {
      dispatch(AgentfetchTicketStart());
    };
    getTickets();
  }, []);

  return (
    <div className="flex flex-col ">
      <NavbarAgent currentPage="Tickets" />
      {Loading && <CircularProgress className="self-center" />}
      {AgentTickets.length > 0 && <TicketCheckBoxOptions />}
    </div>
  );
};

export default FilterTicketPage;
