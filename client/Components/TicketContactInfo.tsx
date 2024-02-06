import { Ticket } from "@/app/Redux/features/agentTicketSlice";
import { user } from "@/app/Redux/features/userSlice";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BsInfo } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
interface TicketContactInfoProps {
  // ticket:Ticket[]
  contact: user | null;
}
const TicketContactInfo = ({ contact }: TicketContactInfoProps) => {
  const subject =
    "laksjdflaksjd;flaksjlfkjaslfkjalskdfjlaksdjflaskdclaksdnflasndflaksdnflaskdnflaksdnf";
  console.log(subject.length > 50);
  return (
    <div className="w-[250px] sticky top-[112px] border hover:border-black rounded-md h-[calc(100vh-56px-56px-5px)] bg-white overflow-auto flex flex-col gap-4 shadow-sm">
      <div className="p-2 px-5 bg-slate-100 flex gap-1 w-full">
        <BsInfo className="text-2xl text-gray-700" />
        <p className="text-[13px] text-gray-800 font-medium self-center">
          CONTACT DETAILS
        </p>
        <button className=" px-2 border-l text-[12.5px] hover:underline text-blue-500">
          Edit
        </button>
      </div>
      <div className="flex gap-2 p-2 px-3 w-full">
        <Avatar
          src={" "}
          alt="profile pic"
          className="w-[40px] h-[40px] bg-slate-400 rounded-md "
        >
          {contact?.UserName?.slice(0, 1)}
        </Avatar>
        <Link
          href={`/a/contacts/${contact?.Id}`}
          className="text-blue-600 text-sm font-medium"
        >
          <p className="break-words">{contact?.UserName}</p>{" "}
        </Link>
      </div>
      <div className="px-3 pb-3 w-[90%]">
        <p className="text-[13px] text-gray-600 py-2">Email</p>
        <p className="text-sm text-gray-900 w-full break-words">
          {contact?.Email}
        </p>
      </div>
      <Link
        href={`/a/contacts/${contact?.Id}`}
        className="text-blue-600 text-sm font-normal flex gap-2 px-5 "
      >
        <FaExternalLinkAlt className="self-center" />
        <p>view more info</p>
      </Link>
      <div className="pt-3 flex flex-col px-3 ">
        <p className="text-sm text-gray-600 font-normal">Timeline</p>
        <div className="px-2 w-full flex gap-1">
          <span className="bg-slate-100 w-[30px] h-[30px] rounded-full f;ex flex-col p-[6px] ">
            <IoMailOutline className="w-full h-full self-center text-md text-gray-600" />
          </span>
          <Link
            href={`/a/tickets/123123123`}
            className="text-sm font-[500] text-gray-700 w-[80%]"
          >
            <p className="w-full break-words ">
              {subject.length > 48
                ? subject.substring(0, 48).concat("...")
                : subject}
              {/* {ticket.Subject} */}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketContactInfo;
