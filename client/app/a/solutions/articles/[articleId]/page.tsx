"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useMemo, useState } from "react";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CgShortcut } from "react-icons/cg";
import { BsEye, BsInfoCircle } from "react-icons/bs";
import { BiDislike, BiLike } from "react-icons/bi";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

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
      <div className="sticky z-[1] top-14 px-10 py-[8px] h-14 bg-slate-50  border  shadow-sm">
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
          <BootstrapTooltip
            title={`${"Analytics Collapse"}`}
            placement="bottom"
          >
            <button className="p-2 h-8  border border-slate-300 bg-[#ffffffd6] hover:bg-slate-50 rounded-md shadow-sm">
              {/* <TbLayoutSidebarLeftCollapse className="text-gray-600" /> */}
              <TbLayoutSidebarRightCollapse className="text-gray-600" />
            </button>
          </BootstrapTooltip>
        </div>
      </div>
      <div className="flex gap-4">
        <Article />
        <ArticleDetail />
        <ArticleAnalytics />
      </div>
    </div>
  );
};

export default ArticlePage;

const Article = () => {
  return (
    <div className="p-4 flex-1 flex flex-col gap-5">
      <div className="bg-white p-10  border-t-4 border-green-800 flex-1 flex flex-col gap-5">
        <h1 className="text-3xl text-gray-800 border-b">Title</h1>
        {/* <Editor modules={modules} /> */}
      </div>
    </div>
  );
};

const ArticleDetail = () => {
  return (
    <div className="bg-white p-10 w-[300px] h-[calc(100vh-120px)] overflow-auto border drop-shadow-sm flex flex-col gap-5">
      <div className="flex gap-5 ">
        <BsInfoCircle className="text-lg text-gray-600 self-center" />
        <h1 className="text-lg text-gray-700 font-bold border-b text-center uppercase">
          Article Details
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        <p className="p-[2px] border border-green-200 text-green-700 bg-green-100 text-center text-sm rounded-md ">
          status
        </p>
        <div className="text-sm text-gray-500 md:border-dashed border-t border-gray-400">
          <p className="mt-1">published by agent name</p>
          <p>on sat 12 aug 2023 at 10:36 pm</p>
        </div>
        <div className="text-sm text-gray-500 md:border-dashed border-t border-gray-400">
          <h1 className="mt-1 text-md text-gray-700 font-bold">Author</h1>
          <Link href={""} className="text-blue-800 hover:underline">
            agent name
          </Link>
        </div>
        <div className="text-sm text-gray-500 md:border-dashed border-t border-gray-400">
          <h1 className="mt-1 text-md text-gray-700 font-bold">Location</h1>
          <p className=" mt-2 text-sm text-gray-700 ">category</p>
          <Link href={""} className="text-blue-800 hover:underline">
            category
          </Link>{" "}
          <p className=" mt-2 text-sm text-gray-700 ">folder</p>
          <Link href={""} className="text-blue-800 hover:underline">
            folder
          </Link>
        </div>{" "}
        <div className="text-sm text-gray-500 md:border-dashed border-t border-gray-400">
          <h1 className="mt-1 text-md text-gray-700 font-bold">Title</h1>
          <p className=" mt-2 text-sm text-gray-700 ">Article Title</p>

          <h1 className="mt-4 text-md text-gray-700 font-bold border-t border-dashed border-gray-400">
            Description
          </h1>

          <p className=" mt-2 text-sm text-gray-700 ">Description</p>
        </div>
      </div>
    </div>
  );
};

const ArticleAnalytics = () => {
  return (
    <div className=" bg-white p-5 flex gap-10">
      <div className="  flex flex-col gap-5">
        <h1 className="text-gray-600 text-lg font-bold border-b border-dashed self-center">
          Analytics
        </h1>
        <div className="flex gap-5 ">
          <div className="flex gap-2">
            <BsEye className="text-xl text-gray-600" />
            <p className="text-sm">Views</p>
          </div>
        </div>
        <div className="flex gap-5 ">
          <div className="flex gap-2">
            <BiLike className="text-xl text-gray-600" />
            <p className="text-sm">Helpful</p>
          </div>
        </div>
        <div className="flex gap-5 ">
          <div className="flex gap-2">
            <BiDislike className="text-xl text-gray-600" />
            <p className="text-sm">Not Helpful</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-5 mt-[45px] text-sm text-gray-600 font-bold">
        <p>12</p>
        <p>12</p>
        <p>12</p>
      </div>
    </div>
  );
};
