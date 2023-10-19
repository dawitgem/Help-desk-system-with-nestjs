"use client";
import FetchedTickets from "@/Components/FetchedTickets";
import PageHero from "@/Components/PageHero";
import {
  fetchAttachmentStart,
  fetchTicketStart,
  selectTicket,
} from "@/app/Redux/features/ticketSlice";
import { getProfileStart, selectUser } from "@/app/Redux/features/userSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiTicket } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import noResultImage from "@/public/asset/no-results.png";
import { CircularProgress } from "@mui/material";

const ArticlePage = () => {
  const { Tickets, Loading, error } = useSelector(selectTicket);
  const { user, isAuth } = useSelector(selectUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchUser = () => {
  //     dispatch(getProfileStart());
  //   };
  //   fetchUser();
  // }, []);
  useEffect(() => {
    if (user) {
      dispatch(fetchTicketStart(user.Id));
      dispatch(fetchAttachmentStart());
    }
  }, [user]);
  useEffect(() => {
    if (Loading) setIsLoaded(false);
    if (Tickets) setIsLoaded(true);
  }, [error, Loading]);
  return (
    <>
      <div className="flex flex-col ">
        <PageHero
          pageTitle="Tickets"
          currentLink="tickets"
          Links={[{ link: "Home", href: "/support/" }]}
          Icon={<PiTicket className="md:text-5xl text-2xl text-slate-50" />}
        />
        {Loading ? (
          <div className="p-10 flex flex-col">
            <CircularProgress className="self-center text-3xl  " />
          </div>
        ) : (
          <>
            {Tickets.length !== 0 ? (
              <FetchedTickets />
            ) : (
              <div className="flex flex-col gap-4 self-center p-10">
                <Image
                  src={noResultImage}
                  alt="no result image"
                  className="w-[150px] h-[150px] self-center"
                />
                <p className="text-gray-600 self-center text-sm">
                  Sorry ! You haven't issued any Ticket Yet!!!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ArticlePage;
