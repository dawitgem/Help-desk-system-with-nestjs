"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import noResultImage from "@/public/asset/no-results.png";
import axios from "axios";
import Link from "next/link";
import { BsTicket } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import PageHero from "@/Components/PageHero";
import { useDispatch, useSelector } from "react-redux";
import { searchStart, selectSearch } from "@/app/Redux/features/searchSlice";
import { CircularProgress } from "@mui/material";
import { Ticket } from "@/app/Redux/features/ticketSlice";

const SearchPage = ({ params }: { params: { searchType: string } }) => {
  const searchQuery = useSearchParams();
  const { search, Loading, error } = useSelector(selectSearch);
  const query: string | any = searchQuery.get("term");
  const [noResult, setNoResult] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const type = params.searchType.includes("solutions") ? "articles" : "tickets";

  useEffect(() => {
    console.log(type);
    if (query) dispatch(searchStart({ type, query }));
  }, []);
  return (
    <div>
      <PageHero
        pageTitle={`Search  for "${query}"`}
        currentLink="search..."
        Links={[{ link: "Home", href: "/support/" }]}
      />
      <div className="p-20 w-full h-full flex flex-col gap-10 ">
        <div className="flex gap-2  w-[200px]">
          <button
            className={`${
              params.searchType.includes("solutions")
                ? "bg-[#063750] text-white "
                : "bg-inherit hover:bg-white text-gray-700"
            } border h-full p-3 text-sm font-medium rounded-md`}
            onClick={() =>
              router.push(`/support/search/solutions?term=${search}`)
            }
          >
            Articles
          </button>
          <button
            className={`${
              params.searchType.includes("tickets")
                ? "bg-[#063750] text-white "
                : "bg-inherit hover:bg-white text-gray-700"
            } border h-full p-3 text-sm font-medium rounded-md`}
            onClick={() =>
              router.push(`/support/search/tickets?term=${search}`)
            }
          >
            Tickets
          </button>
        </div>
        {Loading ? (
          <CircularProgress />
        ) : (
          <>
            {search.Ticket.length !== 0 ? (
              <div className="flex flex-col gap-4 p-5">
                {params.searchType.includes("solutions") ? (
                  <>
                    <h1 className="text-lg font-semibold text-gray-700">
                      Articles :{" "}
                    </h1>
                    {search.Article?.map((data: any) => (
                      <div
                        key={data?.id}
                        className="flex flex-col p-5 bg-white border rounded-lg shadow-md"
                      >
                        <Link
                          href={`/support/solutions/articles/${data.id}`}
                          className="p-4 hover:bg-slate-50 flex gap-4"
                        >
                          <FiFileText className="text-lg text-gray-600 self-center" />
                          <p className="text-blue-600">{data.title}</p>
                          <p className="p-1 px-4 text-sm font-medium border border-blue-300 rounded-md bg-blue-200 text-blue-600">
                            {data.folder}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <h1 className="text-lg font-semibold text-gray-700">
                      Tickets :{" "}
                    </h1>{" "}
                    {search.Ticket.map((ticket: Ticket) => (
                      <div
                        key={ticket.Subject}
                        className="flex flex-col p-5 bg-white border rounded-lg shadow-md"
                      >
                        <Link
                          href={`support/tickets/${ticket.Id}`}
                          className="p-4 hover:bg-slate-50 flex gap-4"
                        >
                          <BsTicket className="text-lg text-gray-600 self-center" />
                          <p className="text-blue-600">{ticket.Subject}</p>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Image
                  src={noResultImage}
                  alt="no result image"
                  className="w-[150px] h-[150px] self-center"
                />
                <p className="text-gray-600 self-center text-sm">
                  Sorry ! nothing found for{" "}
                </p>
                <p className="text-gray-700 self-center text-sm font-semibold">
                  {query}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
