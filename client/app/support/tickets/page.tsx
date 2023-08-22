import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import SelectedArticle from "@/Components/SelectedArticle";
import Link from "next/link";
import React, { useRef } from "react";
import { BsFillFileEarmarkTextFill, BsTicket } from "react-icons/bs";
const ArticlePage = () => {
  return (
    <div>
      <div className="bg-[#063750] h-[250px] flex flex-col  gap-40">
        <div className="bg-[#063750] fixed z-10 md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 ">
          <LinkTrack
            Links={[{ link: "Home", href: "../support/" }]}
            currentLink="tickets"
          />

          <Searchbox
            iconstyle="w-[60px]"
            width="md:w-[40%] w-[90%] "
            height="h-[50px]"
            inputstyle="placeholder:text-md"
          />
        </div>
        <div className="md:p-32 pt-32 flex gap-5 ">
          <BsTicket className="md:text-5xl text-2xl text-slate-50" />
          <div>
            <h1 className="text-white md:text-5xl text-2xl font-bold  overflow-x-clip">
              Tickets
            </h1>
          </div>
        </div>
      </div>
      <div className="p-20 flex  ">
        <div className="h-[500px] bg-white rounded-l-lg flex-[2] shadow-md flex flex-col">
          <Link href="./tickets/1212">ticket i</Link>
        </div>
        <div className="bg-slate-300 rounded-r-lg flex-[1] shadow-md">
          alskdjflkasj
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
