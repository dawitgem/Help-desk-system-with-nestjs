import { getTickets } from "@/utils/QueryActions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const DashboardTicketReportCard = () => {
  const {
    data: AgentTickets,
    isError,
    isLoading: Loading,
    isSuccess,
    error,
  } = useQuery({ queryKey: ["agentTickets"], queryFn: getTickets });

  const TicketStatus = [
    {
      status: "unresolved",
      amount: AgentTickets?.reduce(
        (count: any, current: any, i: number, array: any[]) => {
          if ((current.Status = "unresolved")) count++;
          return count;
        },
        [0]
      ),
    },
    {
      status: "overDue",
      amount: 1,
    },
    {
      status: "Due today",
      amount: 1,
    },
    {
      status: "Open",
      amount: 1,
    },
    {
      status: "On hold",
      amount: 1,
    },
    {
      status: "Unassigned",
      amount: 1,
    },
  ];

  return (
    <div className="flex gap-5">
      {TicketStatus.map((ticket, i) => (
        <Link
          key={i}
          href={"/a"}
          className="p-4 bg-white  shadow-sm w-[195px] h-[110px] rounded-md flex flex-col gap-5 hover:text-blue-600 text-gray-800"
        >
          <p className="text-sm">{ticket.status}</p>
          <p className=" font-bold text-2xl">{ticket.amount}</p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardTicketReportCard;
