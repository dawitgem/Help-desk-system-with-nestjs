"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useMemo, useState } from "react";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CgShortcut } from "react-icons/cg";
import Editor from "@/Components/Editor";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#123d52",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#123d52",
  },
}));

const ArticlePage = () => {
  return (
    <div>
      <NavbarAgent currentPage="Knowledge base" />
      <div className="sticky z-10 top-14 px-10 py-[8px] h-14 bg-slate-50  border  shadow-sm">
        <div className="float-right flex gap-4">
          <button className=" px-8 h-8 text-sm text-gray-600 border border-slate-300 bg-[#ffffffd6] hover:bg-slate-50 rounded-md shadow-sm">
            Edit
          </button>
          <BootstrapTooltip title="View in portal" placement="bottom">
            <Link
              href={"/support/solutions/articles/153000004168-title"}
              className="p-2 h-8  border border-slate-300 bg-[#ffffffd6] hover:bg-slate-50 rounded-md shadow-sm"
            >
              <CgShortcut className="text-gray-600" />
            </Link>
          </BootstrapTooltip>
        </div>
      </div>
      <div className="flex gap-4">
        <Article />
        <ArticleDetail />
      </div>
    </div>
  );
};

export default ArticlePage;
export const modules = {
  toolbar: [],
};

const Article = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="p-4 flex-1">
      <div className="bg-white p-10  border-t-4 border-green-800 ">
        <h1>Title</h1>
        <Editor modules={modules} />
      </div>
    </div>
  );
};

const ArticleDetail = () => {
  return <div className="bg-white p-4">Article detail</div>;
};
