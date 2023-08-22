import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import SelectedArticle from "@/Components/SelectedArticle";
import React, { useRef } from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
const ArticlePage = () => {
  return (
    <div>
      <div className="bg-[#063750] h-[250px] flex flex-col  gap-40">
        <div className="bg-[#063750] fixed z-10 md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 ">
          <LinkTrack
            Links={[
              { link: "Home", href: "../support/" },
              { link: "knowledge...", href: "../solutions" },
              { link: "category...", href: "../12312" },
              { link: "folder...", href: "../12312" },
            ]}
            currentLink="article name"
          />

          <Searchbox
            iconstyle="w-[60px]"
            width="md:w-[40%] w-[90%] "
            height="h-[50px]"
            inputstyle="placeholder:text-md"
          />
        </div>
        <div className="md:p-32 pt-32 flex gap-5 ">
          <BsFillFileEarmarkTextFill className="md:text-5xl text-2xl text-slate-50" />
          <div>
            <h1 className="text-white md:text-5xl text-2xl font-bold  overflow-x-clip">
              Articles name
            </h1>
            <p className="text-slate-400 mt-3 w-full overflow-clip">
              created by abebe wondwosen,at 12:00 pm 12 aug
            </p>
          </div>
        </div>
      </div>
      <SelectedArticle />
    </div>
  );
};

export default ArticlePage;
