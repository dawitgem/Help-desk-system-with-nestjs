import { countTickets, getTickets } from "@/utils/QueryActions";
import Link from "next/link";
import React from "react";



const DashboardTicketReportCard =async () => {
  const data=await countTickets()
  
  const TicketStatus = [
    {
      status: "unresolved",
      amount: data?.unresolved,
    },
    {
      status: "overDue",
      amount: data?.overdue,
    },
    {
      status: "Due today",
      amount: data?.duedate,
    },
    {
      status: "Open",
      amount: data?.open,
    },
    {
      status: "On hold",
      amount: data?.onhold,
    },
    {
      status: "Unassigned",
      amount: data?.unassigned,
    },
  ];

  return (
    <div className="flex gap-5">
      {TicketStatus.map((ticket, i) => (
        <Link
          key={i}
          href={"/a"}
          className="p-4 bg-white  shadow-md w-[195px] h-[110px] rounded-md flex flex-col gap-5 hover:text-blue-600 text-gray-800 border border-gray-300 "
        >
          <p className="text-sm">{ticket.status}</p>
          <p className={` font-bold text-2xl ${ticket.amount===0?"text-gray-400":""}`}>{ticket.amount}</p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardTicketReportCard;
