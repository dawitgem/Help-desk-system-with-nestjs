"use client";
import React from "react";
import { HiOutlinePrinter } from "react-icons/hi";

const SelectedArticleDetail = () => {
  return (
    <div className="bg-slate-200 p-5 rounded-r-[20px] flex-[1] break-words ">
      <button
        className="border bg-slate-50 p-2 flex gap-3 rounded-lg"
        onClick={() => {
          const printwindow = window.open("", "_blank");
          const printContent: any =
            document.getElementById("printContent")?.textContent;
          printwindow?.document.write(printContent);
          printwindow?.document.close();
          printwindow?.print();
        }}
      >
        <HiOutlinePrinter className="text-2xl" />
        <p className="text-gray-500 text-md">print</p>
      </button>
    </div>
  );
};

export default SelectedArticleDetail;
