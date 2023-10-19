"use client";
import PageHero from "@/Components/PageHero";
import DOMPurify, { SanitizeElementHookEvent } from "dompurify";
import {
  Attachement,
  Ticket,
  fetchAttachmentStart,
  fetchTicketStart,
  selectTicket,
} from "@/app/Redux/features/ticketSlice";
import { selectUser } from "@/app/Redux/features/userSlice";
import React, { useEffect, useState } from "react";
import { BsLink, BsPencil, BsTicket, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
let sanitaizeContent: string;
const TicketIdPage = ({ params }: { params: { ticketid: string } }) => {
  const { Tickets, Attachement } = useSelector(selectTicket);
  const { user } = useSelector(selectUser);
  const [ticket, setTicket] = useState<Ticket | undefined>({
    Id: "",
    IssueType: "",
    Email: user?.Email,
    Subject: "",
    Content: "",
    Priority: "",
    UserId: user?.Id,
    CreatedAt: new Date(),
  });
  const [attachment, setAttachment] = useState<Attachement[]>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchTicketStart(user.Id));
      dispatch(fetchAttachmentStart());
    }
  }, [user]);
  useEffect(() => {
    if (Tickets.length !== 0) {
      const ticket = Tickets.find((ticket) => ticket.Id === params.ticketid);
      setTicket(ticket);
      if (ticket) sanitaizeContent = DOMPurify.sanitize(ticket?.Content);
    }
    if (Attachement.length !== 0 && Attachement) {
      const attachment = Attachement.filter(
        (file) => file.TicketId === params.ticketid
      );
      setAttachment(attachment);
    }
  }, [Tickets, Attachement]);
  console.log(params.ticketid);
  console.log(attachment);

  return (
    <div className="w-full h-full flex flex-col ">
      <PageHero
        pageTitle="Ticket"
        currentLink="ticketTitle"
        Links={[
          { link: "Home", href: "/support/" },
          { link: "tickets", href: "/support/tickets" },
        ]}
        Icon={<BsTicket className="md:text-5xl text-2xl text-slate-50" />}
      />
      <div className="md:px-20 h-full md:p-10 p-2 ">
        <div className="bg-white md:p-10 rounded-lg flex flex-col gap-5 ">
          <div className="flex  self-end">
            <button className=" md:flex gap-2 border-blue-300 border hover:shadow-sm hover:shadow-blue-400 bg-slate-50 p-2 rounded-l-lg ">
              <BsPencil className="md:text-xl text-sm text-gray-500" />
            </button>
            <button className=" md:flex gap-2 border-blue-300 border hover:shadow-sm hover:shadow-blue-400 bg-slate-50 p-2 rounded-r-lg ">
              <BsTrash className="md:text-xl text-sm text-gray-500" />
            </button>
          </div>
          <div className="p-3 border">
            <p className="text-xl text-gray-800 text-center font-bold underline">
              {ticket?.Subject}
            </p>
            <div dangerouslySetInnerHTML={{ __html: sanitaizeContent }}></div>
          </div>
          {attachment && attachment.length !== 0 && (
            <div className="flex flex-col gap-5 p">
              <p className="text-sm font-semibold text-gray-700 self-center">
                Attachments
              </p>
              <>
                {attachment.map((file) => (
                  <div className="flex gap-5">
                    <BsLink className="text-xl text-gray-600" />
                    <a
                      href={`${file.FilePath}`}
                      download={file.FileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-500 hover:text-gray-600"
                    >
                      {file.FileName}
                    </a>
                  </div>
                ))}
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketIdPage;
