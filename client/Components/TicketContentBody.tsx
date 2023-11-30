import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { CgMailForward } from "react-icons/cg";
import { HiReply } from "react-icons/hi";
import { IoMailOutline } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";
import { PiPencilLine } from "react-icons/pi";
import {
  Alert,
  Avatar,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import { Ticket } from "@/app/Redux/features/agentTicketSlice";
import { user } from "@/app/Redux/features/userSlice";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import ReplyBody from "./ReplyBody";
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#123d52",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#123d52",
  },
}));

interface TicketContentBodyProps {
  ticket: Ticket | null;
  contact: user | null;
  OpenReply: boolean;
  setOpenReply: Dispatch<SetStateAction<boolean>>;
  OpenNote: boolean;
  setOpenNote: Dispatch<SetStateAction<boolean>>;
  OpenForward: boolean;
  setOpenForward: Dispatch<SetStateAction<boolean>>;
  ReplyHandler: () => void;
  setReplyWarning: Dispatch<SetStateAction<boolean>>;
  setOpenEditTicket: Dispatch<SetStateAction<boolean>>;
}
const TicketContentBody = ({
  ticket,
  contact,
  OpenReply,
  OpenNote,
  OpenForward,
  setOpenForward,
  ReplyHandler,
  setOpenEditTicket,
  setOpenReply,
  setReplyWarning,
}: TicketContentBodyProps) => {
  let sanitizeHtml;
  if (ticket?.Content) {
    sanitizeHtml = DOMPurify.sanitize(ticket?.Content);
  }

  const Replyref = useRef<HTMLDivElement>(null);

  const scrollToComponent = () => {
    if (Replyref.current) {
      Replyref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    scrollToComponent();
  }, []);
  return (
    <>
      <div className="flex flex-col flex-1 h-full   relative">
        <div className="py-4 px-20 border-b w-full">
          <p className="px-1 border border-green-500 text-green-800 bg-green-100 rounded-[4px] text-center w-[60px] font-medium text-[13px] ">
            New
          </p>
        </div>
        <div className="px-10 z-40 flex gap-5 sticky top-[110px]   bg-white py-2 ">
          <IoMailOutline className="w-[40px]  self-center text-2xl text-gray-600" />
          <p className="self-center text-xl text-gray-700 font-semibold ">
            {ticket?.Subject}
          </p>
        </div>
        <div className="px-10 flex justify-between">
          <div className="flex gap-5">
            <Avatar
              src={" "}
              alt="profile pic"
              className="w-[40px] h-[40px] bg-slate-400 rounded-md "
            >
              {contact?.FullName?.slice(0, 1)}
            </Avatar>

            <div>
              <span>
                <Link
                  href={`/a/contacts/${contact?.Id}`}
                  className="text-md font-semibold text-blue-700"
                >
                  {contact?.UserName}
                </Link>
              </span>
              <span className="px-2 text-sm  text-gray-800">
                reported via {ticket?.ReportedVia.toLowerCase()}
              </span>
              <p className="py-1 text-[13px] italic text-gray-500">
                {formatDistanceToNow(
                  new Date(ticket?.CreatedAt ? ticket.CreatedAt : Date.now()),
                  { addSuffix: true }
                )}
              </p>
            </div>
          </div>
          <div className="flex divide-x  rounded-lg">
            <BootstrapTooltip
              title="Edit"
              placement="top-start"
              className="z-40"
            >
              <button
                className="w-[35px] h-[35px] text-gray-600  font-medium px-3 shadow-sm shadow-blue-400 bg-slate-50 border border-gray-200 hover:border hover:border-blue-500 rounded-l-lg    hover:bg-[#f2f2f2bd]"
                onClick={() => setOpenEditTicket(true)}
              >
                <PiPencilLine className="text-gray-700 text-lg self-center" />
              </button>
            </BootstrapTooltip>
            <BootstrapTooltip
              title="Forward"
              placement="top-start"
              className="z-40"
            >
              <button
                className="w-[35px] h-[35px] text-gray-600  font-medium px-3 shadow-sm shadow-blue-400 bg-slate-50  border border-gray-200    hover:border hover:border-blue-500 rounded-r-lg  outline-blue-500  hover:bg-[#f2f2f2bd]"
                onClick={() => setOpenForward(true)}
              >
                <CgMailForward className="text-gray-700 text-lg" />
              </button>
            </BootstrapTooltip>
          </div>
        </div>
        <div
          className="px-14  h-full "
          dangerouslySetInnerHTML={{ __html: sanitizeHtml ? sanitizeHtml : "" }}
        ></div>

        {OpenReply ? (
          <div className="px-10 py-5">
            <ReplyBody
              setOpenForward={setOpenForward}
              ticket={ticket}
              contact={contact}
              setOpenReply={setOpenReply}
              OpenReply={OpenReply}
              setReplyWarning={setReplyWarning}
            />
          </div>
        ) : (
          <div className="flex gap-2 bg-slate-200 rounded-lg px-10 py-3 ">
            <Avatar
              src={" "}
              alt="profile pic"
              className="w-[35px] h-[35px] bg-slate-400 rounded-md"
            >
              {contact?.FullName?.slice(0, 1)}
            </Avatar>
            <button
              className="border-gray-300 border bg-[#ffffffb7] rounded-lg text-gray-600 text-[14px] font-medium p-[6px] shadow-sm  flex gap-1 align-middle justify-center  hover:bg-[#f2f2f2bd]"
              onClick={ReplyHandler}
            >
              <HiReply className="self-center" />
              <p className="self-center">Reply</p>
            </button>

            <button
              className="border-gray-300 border bg-[#ffffffb7] rounded-lg text-gray-600 text-[14px] font-medium px-3 shadow-sm  flex gap-1 align-middle justify-center  hover:bg-[#f2f2f2bd]"
              onClick={() => setOpenForward(true)}
            >
              <CgMailForward className="self-center text-lg" />
              <p className="self-center">Forward</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketContentBody;
