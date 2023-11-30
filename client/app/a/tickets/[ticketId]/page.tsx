"use client";
import EditTicket from "@/Components/EditTicket";
import NavbarAgent from "@/Components/NavbarAgent";
import { TicketNavbarButtons } from "@/Components/TicketButton";
import TicketContactInfo from "@/Components/TicketContactInfo";
import TicketContentBody from "@/Components/TicketContentBody";
import TicketDetailInfo from "@/Components/TicketDetailInfo";
import TicketForwardBody from "@/Components/TicketForwardBody";
import {
  Ticket,
  selectAgentTicket,
} from "@/app/Redux/features/agentTicketSlice";
import { user } from "@/app/Redux/features/userSlice";
import { Dialog } from "@headlessui/react";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import { useSelector } from "react-redux";

const api =
  process.env.NEXT_PUBLIC_REACT_ENV === "PRODUCTION"
    ? "https://kns-support-api.onrender.com"
    : "http://localhost:8000";
const TicketPage = ({ params }: { params: { ticketId: string } }) => {
  const { AgentTickets, Contact, Loading, error } =
    useSelector(selectAgentTicket);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [user, setUser] = useState<user | null>(null);
  const [OpenReply, setOpenReply] = useState(false);
  const [OpenNote, setOpenNote] = useState(false);
  const [OpenForward, setOpenForward] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [OpenContact, setOpenContact] = useState(true);
  const [OpenReplyWarning, setReplyWarning] = useState(false);
  const [OpenEditTicket, setOpenEditTicket] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `${api}/ticket/agent/${params.ticketId}`
        );
        const data = await response.data;
        setTicket(data.Ticket);
        setUser(data.Contact);
      } catch (e) {}
    };
    if (AgentTickets.length === 0) {
      fetchTicket();
    } else {
      const Ticket = AgentTickets.filter(
        (ticket) => ticket.Id === params.ticketId
      );
      const contact = Contact.filter((user) => user.Id === Ticket[0].UserId);
      setTicket(Ticket[0]);
      setUser(contact[0]);
    }
  }, []);
  const handleReplyClick = () => {
    setOpenReply(true);
    const element = document.getElementsByClassName("ql-editor").item(0);
    if (element && element instanceof HTMLElement) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      element.style.height = "400px";
      element.style.overflow = "auto";
      element.focus();
    }
  };
  return (
    <>
      <div className="relative">
        <NavbarAgent
          currentPage={params.ticketId}
          link={[{ name: "All tickets", href: "/a/tickets/filter/alltickets" }]}
        />
        {ticket && (
          <>
            <TicketNavbarButtons
              setOpenForward={setOpenForward}
              setOpenReply={setOpenReply}
              setIsClosed={setIsClosed}
              setIsDeleted={setIsDelete}
              setIsMore={setIsMore}
              setOpenContact={setOpenContact}
              OpenContact={OpenContact}
              OpenForward={OpenForward}
            />
            <div className="flex bg-white h-full w-full ">
              <TicketContentBody
                ticket={ticket}
                contact={user}
                OpenReply={OpenReply}
                OpenNote={OpenNote}
                OpenForward={OpenForward}
                setOpenNote={setOpenNote}
                setOpenForward={setOpenForward}
                setOpenReply={setOpenReply}
                ReplyHandler={handleReplyClick}
                setReplyWarning={setReplyWarning}
                setOpenEditTicket={setOpenEditTicket}
              />
              <div className="relative flex gap-3 max-w-[100%] object-cover overflow-clip">
                {OpenForward ? (
                  <TicketForwardBody setOpenForward={setOpenForward} />
                ) : (
                  <>
                    <TicketDetailInfo ticket={ticket} />
                    {OpenContact && <TicketContactInfo contact={user} />}
                  </>
                )}
              </div>
            </div>
          </>
        )}
        {OpenReplyWarning && (
          <Dialog
            open={OpenReplyWarning}
            onClose={() => {}}
            className={
              "bg-[#0000002a] w-full h-full flex justify-center align-middle absolute top-0 z-[50] "
            }
          >
            <Dialog.Panel
              className={
                "bg-white border rounded-md shadow-lg w-[40%] h-[28%]  flex flex-col gap-5 md:animate-toptoplace"
              }
            >
              <div className="flex justify-between pt-10 px-5">
                <Dialog.Title className={"text-md font-medium text-gray-900 "}>
                  Discard Changes
                </Dialog.Title>
                <button
                  className="text-lg text-gray-800 font-medium"
                  onClick={() => setReplyWarning(false)}
                >
                  <MdClose />
                </button>
              </div>
              <Dialog.Description
                className={"text-sm text-gray-600 font-medium px-10 "}
              >
                You're changes will be discarded.Are you sure?
              </Dialog.Description>
              <div className="border bg-slate-50 py-3 px-5 flex md:justify-end align-middle gap-5 rounded-b-md">
                <button
                  className="bg-white border py-1 px-3 shadow-sm text-gray-700 rounded-lg font-medium w-[70px]"
                  onClick={() => setReplyWarning(false)}
                >
                  No
                </button>
                <button
                  className="bg-[#224667] border py-1 px-3 shadow-sm text-white font-medium rounded-lg w-[70px]"
                  onClick={() => {
                    setReplyWarning(false);
                    setOpenReply(false);
                  }}
                >
                  Yes
                </button>
              </div>
            </Dialog.Panel>
          </Dialog>
        )}
      </div>
      {OpenEditTicket && (
        <EditTicket
          open={OpenEditTicket}
          setOpen={setOpenEditTicket}
          Ticket={ticket}
        />
      )}
    </>
  );
};

export default TicketPage;
