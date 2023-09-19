"use client";
import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import TextEditor from "@/Components/TextEditor";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiTicket } from "react-icons/pi";
import noResultImage from "@/public/asset/no-results.png";

const searchResults: any = [
  {
    type: "article",
    title: "bsreft",
  },
  {
    type: "article",
    title: "alsdkjflaksdjf",
  },
  {
    type: "ticket",
    title: ";k;lk;lk;lk",
  },
  {
    type: "ticket",
    title: "rytrytrytr",
  },
];

const SearchPage = () => {
  const searchQuery = useSearchParams();
  const search = searchQuery.get("term");
  const [noResult, setNoResult] = useState(true);
  useEffect(() => {}, []);
  return (
    <div>
      <div className="bg-[#063750] h-[250px] flex flex-col  gap-40">
        <div className="bg-[#063750] fixed z-[5] md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 ">
          <LinkTrack
            Links={[{ link: "Home", href: "./support/" }]}
            currentLink="search..."
          />

          <Searchbox
            postionStyle="float-left"
            iconstyle="w-[40px]"
            width="md:w-[40%] w-[90%] "
            height="h-[50px]"
            inputstyle="placeholder:text-md"
          />
        </div>
        <div className="md:p-32 pt-32 flex gap-5  break-words w-[90%] ">
          <h1 className="text-white md:text-5xl text-2xl font-bold w-full break-words  ">
            Search result for "{search}"
          </h1>
        </div>
      </div>
      <div className="p-20 w-full h-full flex flex-col gap-20 ">
        <div className="flex gap-2  w-[200px]">
          <button className="bg-slate-500 h-full p-3 text-sm font-medium rounded-md">
            Articles
          </button>
          <button className="bg-slate-500 h-full p-3 text-sm font-medium rounded-md hover:bg-white">
            Tickets
          </button>
        </div>
        {noResult && (
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
              {search}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
