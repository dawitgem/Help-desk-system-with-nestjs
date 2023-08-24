import FetchedFolder from "@/Components/FetchedFolder";
import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import React from "react";

import { PiStackBold } from "react-icons/pi";
import { folders } from "@/app/sample";

const CategoryPage = ({ params }: { params: { categoryid: string } }) => {
  return (
    <>
      <div className="bg-[#063750] h-[250px] flex flex-col  gap-40">
        <div className="bg-[#063750] fixed z-10 md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 ">
          <LinkTrack
            Links={[
              { link: "Home", href: "../support/" },
              { link: "knowledge...", href: "../solutions" },
            ]}
            currentLink="category..."
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
          <PiStackBold className="md:text-5xl text-2xl text-slate-50" />
          <h1 className="text-white md:text-5xl text-2xl font-bold w-full break-words  ">
            categoryName
          </h1>
        </div>
      </div>
      <FetchedFolder Folders={folders} />
    </>
  );
};

export default CategoryPage;
