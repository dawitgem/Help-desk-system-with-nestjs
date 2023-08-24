"use client";
import React, { useState } from "react";
import {
  HiOutlineEmojiHappy,
  HiOutlineEmojiSad,
  HiOutlinePrinter,
} from "react-icons/hi";
import HelpfulFeedBackResponse from "./HelpfulFeedBackResponse";
import SelectedArticleDetail from "./SelectedArticleDetail";

const SelectedArticle = () => {
  const [helpfull, setHelpFul] = useState(false);
  const [nothelpfull, setNotHelpFul] = useState(false);
  return (
    <div className="w-full sm:p-10 p-2 ">
      <div className="md:flex   shadow-lg sm:rounded-[20px] ">
        <div className=" sm:p-10 p-2 flex-[2] bg-white sm:rounded-l-[20px] ">
          <article id="printContent" className="m-5 w-full break-words">
            lkasdlfkjalskfjlkasjdf
          </article>
          <div className="p-10 border-t md:flex gap-5">
            {helpfull && <HelpfulFeedBackResponse />}
            {nothelpfull && <div>give us ur comment</div>}
            {!helpfull && !nothelpfull && (
              <div className="sm:flex gap-5 ">
                <p className="md:text-xl text-bold">was this helpful?</p>
                <button
                  className="px-3 py-2 border flex gap-2 rounded-md hover:bg-slate-100"
                  onClick={() => setHelpFul(true)}
                >
                  <HiOutlineEmojiHappy className="text-green-500 text-3xl text-center" />
                  <p className="text-green-500 text-lg font-bold">Yes</p>
                </button>{" "}
                <button
                  className="px-3 py-2 border flex gap-2 rounded-md hover:bg-slate-100"
                  onClick={() => setNotHelpFul(true)}
                >
                  <HiOutlineEmojiSad className="text-red-500 text-3xl text-center" />
                  <p className="text-red-500 text-xl font-bold">No</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <SelectedArticleDetail />
      </div>
    </div>
  );
};

export default SelectedArticle;
