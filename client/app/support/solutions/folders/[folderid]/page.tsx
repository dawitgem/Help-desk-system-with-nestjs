import FetchedArticles from "@/Components/FetchedArticles";
import FetchedFolder from "@/Components/FetchedFolder";
import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import { articles, folders } from "@/app/sample";
import React from "react";
import { BsFolder2Open } from "react-icons/bs";
import { PiStackBold } from "react-icons/pi";

const FolderPageId = () => {
  return (
    <>
      <div className="bg-[#063750] h-[250px] ">
        <div className="bg-[#063750] fixed z-10 md:h-[40px] w-full md:px-20 py-4 sm:flex gap-2 justify-between  md:py-10 flex-wrap ">
          <LinkTrack
            Links={[
              { link: "Home", href: "../support/" },
              { link: "knowledge...", href: "../solutions" },
              { link: "category...", href: "../12312" },
            ]}
            currentLink="Folder name"
          />

          <Searchbox
            postionStyle="float-left"
            iconstyle="w-[60px]"
            width="md:w-[40%] w-[90%] "
            height="h-[50px]"
            inputstyle="placeholder:text-md"
          />
        </div>
        <div className="flex flex-wrap gap-5 absolute top-[60%] left-[10%]">
          <BsFolder2Open className="md:text-5xl text-2xl text-slate-50" />
          <h1 className="text-white md:text-5xl text-2xl font-bold  overflow-x-clip ">
            FolderName
          </h1>
        </div>
      </div>
      <FetchedArticles Articles={articles} />
    </>
  );
};

export default FolderPageId;
