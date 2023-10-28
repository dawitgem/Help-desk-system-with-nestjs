"use client";
import { selectSearch } from "@/app/Redux/features/searchSlice";
import { Ticket } from "@/app/Redux/features/ticketSlice";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
interface SearchListProps {
  searchType: string;
}
const SearchList = ({ searchType }: SearchListProps) => {
  const { search, error } = useSelector(selectSearch);

  return (
    <div className="flex flex-col gap-5">
      {searchType === "all" && (
        <>
          {/* {search.Article.length !== 0 && (
        <div className="flex flex-col gap-1 ">
          <p className="text-gray-700 text-md font-semibold">Tickets</p>
          {search.Article.map((article, i) => (
            <div key={i}></div>
          ))}
        </div>
      )}{" "} */}
          {search.Ticket.length !== 0 && (
            <div className="flex flex-col gap-1 ">
              <p className="text-gray-700 text-md font-semibold">Tickets</p>
              {search.Ticket.map((ticket: Ticket, i) => (
                <Link
                  href={`/support/tickets/${ticket.Id}`}
                  key={ticket.Subject}
                  className="p-3 hover:bg-slate-50"
                >
                  <p>{ticket.Subject}</p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
      {searchType === "articles" && (
        <>
          {/* {search.Article.length !== 0 && (
        <div className="flex flex-col gap-1 ">
          <p className="text-gray-700 text-md font-semibold">Tickets</p>
          {search.Article.map((article, i) => (
            <div key={i}></div>
          ))}
        </div>
      )}{" "} */}
        </>
      )}{" "}
      {searchType === "tickets" && (
        <>
          {search.Ticket.length !== 0 && (
            <div className="flex flex-col gap-1 ">
              <p className="text-gray-700 text-md font-semibold">Tickets</p>
              {search.Ticket.map((ticket: Ticket, i) => (
                <Link
                  href={`/support/tickets/${ticket.Id}`}
                  key={ticket.Subject}
                  className="p-3 hover:bg-slate-50"
                >
                  <p>{ticket.Subject}</p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchList;
