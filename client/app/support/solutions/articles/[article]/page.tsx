import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import React from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";

const ArticlePage = () => {
  return (
    <>
      <div className="bg-[#063750] h-[250px] relative">
        <div className="bg-[#063750] fixed z-10 md:h-[40px] w-full md:px-20 py-4 md:flex gap-2 justify-between  md:py-10 overflow-visible ">
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
        <div className="flex gap-5 absolute top-[60%] left-[10%]">
          <BsFillFileEarmarkTextFill className="md:text-5xl text-2xl text-slate-50" />
          <div>
            <h1 className="text-white md:text-5xl text-2xl font-bold  overflow-x-clip">
              Articles name
            </h1>
            <p className="text-slate-400 mt-3">
              created by abebe wondwosen,at 12:00 pm 12 aug
            </p>
          </div>
        </div>
      </div>
      <div className=" w-ful py-10 px-20">
        <div className="md:flex  shadow-lg rounded-[20px] ">
          <div className=" p-10 flex-1 bg-white rounded-l-[20px] ">
            <article className="m-5 w-full break-words">
              lkasdlfkjalskfjlkasjdf
            </article>
            <div className="p-10 border-t md:flex gap-5">
              <p className="md:text-xl text-bold">was this helpful?</p>
              <div className="sm:flex gap-5 ">
                <button className="px-3 py-2 border flex gap-2 rounded-md hover:bg-slate-100">
                  <HiOutlineEmojiHappy className="text-green-500 text-3xl text-center" />
                  <p className="text-green-500 text-lg font-bold">Yes</p>
                </button>{" "}
                <button className="px-3 py-2 border flex gap-2 rounded-md hover:bg-slate-100">
                  <HiOutlineEmojiSad className="text-red-500 text-3xl text-center" />
                  <p className="text-red-500 text-xl font-bold">No</p>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-slate-200 p-5 rounded-r-[20px] w-auto break-wor ">
            kjhkjhkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
