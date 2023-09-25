import React, { Component, ReactNode } from "react";
import LinkTrack from "./LinkTrack";
import Searchbox from "./Searchbox";
import { BsPersonCircle } from "react-icons/bs";
import { IconTypeMap } from "@mui/material";

interface PageHeroProps {
  pageTitle: string;
  currentLink: string;
  Links: { link: string; href: string }[];
  Icon?: ReactNode;
  p?: string;
}

const PageHero = ({ pageTitle, currentLink, Links, Icon,p }: PageHeroProps) => {
  return (
    <div className="bg-[#063750] h-[250px] flex flex-col  gap-40">
      <div className="bg-[#063750] fixed z-[5] md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 ">
        <LinkTrack Links={Links} currentLink={currentLink} />

        <Searchbox
          iconstyle="w-[60px]"
          width="md:w-[40%] w-[90%] "
          height="h-[50px]"
          inputstyle="placeholder:text-md"
        />
      </div>
      <div className="md:p-32 pt-32 flex gap-5 ">
        {Icon}
        <div>
          <h1 className="text-white md:text-5xl text-2xl font-bold  overflow-x-clip">
            {pageTitle}
          </h1>
          <p className="text-slate-400 mt-3 w-full overflow-clip">{p}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHero;
