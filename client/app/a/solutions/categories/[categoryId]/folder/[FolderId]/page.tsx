"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useMemo, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  BsChevronBarDown,
  BsChevronDown,
  BsChevronUp,
  BsFillCaretDownFill,
  BsFolder,
  BsPlus,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { Box, FormControlLabel, dividerClasses } from "@mui/material";
import dynamic from "next/dynamic";
import {
  IoFileTrayFullOutline,
  IoFileTrayStacked,
  IoFileTrayStackedOutline,
} from "react-icons/io5";
import Link from "next/link";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const contacts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CategoryDetailPage = () => {
  const [checked, setChecked] = useState(contacts.map((contact) => false));

  const FetchedContacts = useMemo(
    () => dynamic(() => import("@/Components/FetchedContacts"), { ssr: false }),
    []
  );
  return (
    <div>
      <NavbarAgent currentPage="Knowledge base" />
      <div className="sticky z-[1] top-14 p-4 h-14 bg-slate-50  border flex justify-between shadow-sm">
        <div className="flex border h-8 bg-white  gap-1 :outline-blue-500 rounded-md hover:border-gray-900 relative">
          <BsSearch className="text-[13px] absolute left-1 top-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search all Articles"
            className="w-[450px]   placeholder:text-sm  p-2 pl-6 rounded-md outline-blue-600"
          />
        </div>
        <div className="self-center flex shadow-sm   bg-[#184e6a] text-slate-50 h-8 rounded-[7px]">
          <button className="self-center flex gap-1 bg-[#184e6a] hover:bg-[#194256]  p-1 rounded-l-[7px] ">
            <BsPlus className="text-2xl" />
            New Article
          </button>
          <button className="border border-[#0e1c31]   p-1 bg-[#184e6a] hover:bg-[#194256] rounded-r-[7px] h-full">
            <BsFillCaretDownFill />
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex bg-white">
          <div className="flex flex-col border-r-2 ">
            <div className="bg-slate-50 p-4 h-[54px] border-b">
              <p className="text-sm text-gray-600">Categories And Folders</p>
            </div>
            <BasicSelect />
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;

const Categories = [1, 2, 3, 4];
const Folders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function BasicSelect() {
  const [isClicked, setIsClicked] = useState(
    Categories.map((category) => false)
  );
  const [isHover, setIsHover] = useState(Categories.map((category) => false));
  const [isFolderHover, setFolderIsHover] = useState(
    Folders.map((folder) => false)
  );

  const [showFolders, setShowFolders] = useState(
    Categories.map((category) => false)
  );

  return (
    <div className="h-[calc(100vh-112px-54px-30px)] overflow-auto">
      {Categories.map((category, i) => (
        <>
          <div
            key={i}
            className="relative hover:bg-slate-50 "
            onMouseEnter={() =>
              setIsHover(
                isClicked.map((click, c) => {
                  if (c === i) click = true;
                  else click = false;
                  return click;
                })
              )
            }
            onMouseLeave={() =>
              setIsHover(
                isClicked.map((click, c) => {
                  if (c === i) click = false;
                  else click = false;
                  return click;
                })
              )
            }
          >
            <button
              className={`flex  justify-between p-4 cursor-pointer  w-[400px] hover:bg-slate-50 ${
                isClicked[i]
                  ? "border-l-4 border-blue-800 "
                  : " border  border-gray-200 "
              } ${showFolders[i] && "shadow-md"} `}
              onClick={() => {
                setIsClicked(
                  isClicked.map((click, c) => {
                    if (c === i) click = true;
                    else click = false;
                    return click;
                  })
                );
                setShowFolders(
                  showFolders.map((click, c) => {
                    if (c === i) click = !click;
                    return click;
                  })
                );
              }}
            >
              <div className="flex gap-4">
                <IoFileTrayStackedOutline className="self-center text-xl font-bold" />
                <Link
                  href={""}
                  className="self-center text-md text-gray-800 font-medium"
                >
                  General
                </Link>
              </div>
              {showFolders[i] ? (
                <BsChevronUp className="self-center text-md font-bold" />
              ) : (
                <BsChevronDown className="self-center text-md font-bold" />
              )}
            </button>
            {isHover[i] && (
              <button
                className="absolute left-3/4 top-4 text-2xl z-20 text-gray-700"
                onClick={() => console.log("clicked")}
              >
                <LiaEdit />
              </button>
            )}
          </div>
          {showFolders[i] && (
            <div className="border ">
              {Folders.map((folder, f) => (
                <Link
                  href={""}
                  className="flex gap-3 p-5 hover:bg-slate-100"
                  key={f}
                  onMouseEnter={() =>
                    setFolderIsHover(
                      isFolderHover.map((hover, c) => {
                        if (c === f) hover = true;
                        else hover = false;
                        return hover;
                      })
                    )
                  }
                  onMouseLeave={() =>
                    setFolderIsHover(
                      isFolderHover.map((hover, c) => {
                        if (c === f) hover = false;
                        else hover = false;
                        return hover;
                      })
                    )
                  }
                >
                  <BsFolder className="text-gray-600 text-lg" />
                  <div className="self-center flex flex-col ">
                    <p className="self-center text-sm text-gray-700 font-medium hover:text-blue-700">
                      Folder Name
                    </p>
                    <p className="text-[12px] text-gray-400">1 Article</p>
                  </div>
                  {isFolderHover[f] && (
                    <button className="relative left-[50%] text-xl text-gray-600">
                      <PiPencilSimple className="text-gray-600 text-xl" />
                    </button>
                  )}
                </Link>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
}

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { LuFileText } from "react-icons/lu";
import { PiPencilSimple } from "react-icons/pi";

const folder1 = [1, 3, 4, 5, 4, 5, 6, 3, 5, 6, 4, 5, 6, 3, 6, 2, 2];

function DataTable() {
  const [checked, setChecked] = React.useState(folder1.map((folder) => false));
  const [isArticleHover, setIsArticleHover] = useState(
    folder1.map((folder) => false)
  );
  return (
    <div className="w-full flex flex-col">
      <div className="h-[54px] p-3 px-12 border-b  flex justify-between bg-slate-50 gap-10  ">
        <div className="self-center flex gap-2 flex-[2]">
          <FormControlLabel
            label=""
            control={
              <Checkbox
                checked={!checked.includes(false)}
                onChange={(event) => {
                  setChecked(folder1.map((folder) => event.target.checked));
                }}
                sx={{
                  "& .MuiSvgIcon-root": {
                    border: "none",
                    fontSize: 22,
                    color: "green",
                  },
                }}
              />
            }
          />
          <p className="self-center text-sm text-gray-600">
            Folders | Articles
          </p>
        </div>
        <p className="self-center text-sm text-gray-600">VIEWS</p>
        <p className="self-center text-sm text-gray-600">HELPFUL</p>
        <p className="self-center text-sm text-gray-600">NOTHELPFUL</p>
      </div>
      <div className="bg-white flex flex-col h-[calc(100vh-112px-54px-30px)] overflow-auto">
        {folder1.map((folder, i) => (
          <div
            className="p-3 px-12  relative flex justify-between gap-5  hover:bg-slate-50"
            onMouseEnter={() =>
              setIsArticleHover(
                isArticleHover.map((hover, c) => {
                  if (c === i) hover = true;
                  else hover = false;
                  return hover;
                })
              )
            }
            onMouseLeave={() =>
              setIsArticleHover(
                isArticleHover.map((hover, c) => {
                  if (c === i) hover = false;
                  else hover = false;
                  return hover;
                })
              )
            }
          >
            <div className="self-center flex gap-1 flex-[2] ">
              <FormControlLabel
                label=""
                control={
                  <Checkbox
                    checked={checked[i]}
                    onChange={(event) =>
                      setChecked(
                        checked.map((check: any, c: number) => {
                          if (c === i) check = event.target.checked;
                          return check;
                        })
                      )
                    }
                    sx={{
                      "& .MuiSvgIcon-root": {
                        border: "none",
                        fontSize: 18,
                        color: "green",
                      },
                    }}
                  />
                }
              />
              <LuFileText className="text-xl text-gray-500 self-center" />
              <div className="self-center flex flex-col ">
                <Link
                  href={"/a/solutions/articles/article"}
                  className="text-[13px] font-medium hover:underline hover:text-blue-500"
                >
                  Article Title
                </Link>
                <p className="text-[12px] text-gray-600">
                  Published by abebe 13 days ago
                </p>
              </div>
            </div>
            <div className="flex gap-20 flex-[1]">
              <p className="self-center text-sm text-gray-600">20.k</p>
              <p className="self-center text-sm text-gray-600">1k</p>
              <p className="self-center text-sm text-gray-600">500</p>
            </div>
            {isArticleHover[i] && (
              <button className="absolute left-[95%]">
                <PiPencilSimple className="text-gray-600 text-xl" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
