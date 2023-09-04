"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useMemo, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  BsChevronBarDown,
  BsChevronDown,
  BsFillCaretDownFill,
  BsFolder,
  BsPlus,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import { FormControlLabel } from "@mui/material";
import dynamic from "next/dynamic";
import { IoFileTrayFullOutline } from "react-icons/io5";
import Link from "next/link";
import NoFolder from "@/public/asset/emptyFolder.svg";
import Image from "next/image";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const contacts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SolutionPage = () => {
  const [checked, setChecked] = useState(contacts.map((contact) => false));

  const FetchedContacts = useMemo(
    () => dynamic(() => import("@/Components/FetchedContacts"), { ssr: false }),
    []
  );
  return (
    <div>
      <NavbarAgent currentPage="Knowledge base" />
      <div className="sticky z-10 top-14 p-4 h-14 bg-slate-50  border flex justify-between shadow-sm">
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
        <div className="bg-white p-10 flex flex-col gap-3">
          <p className="text-gray-700 text-medium">Categories</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="border w-[370px] h-[250px] border-slate-300 rounded-md hover:shadow-md p-5 flex flex-col gap-4 ">
              <div className="flex gap-2">
                <IoFileTrayFullOutline className="text-gray-600 text-2xl" />
                <Link
                  className="text-slate-600 text-md font-bold hover:text-blue-600"
                  href={"./solutions/categories/category/folder/folder"}
                >
                  Category Name
                </Link>
              </div>
              <div className="p-3 text-slate-600 flex flex-col gap-4 ">
                <Link href={""} className="p-3 hover:bg-slate-100 rounded-md">
                  <p>Folder name</p>
                </Link>
              </div>
            </div>
            <div className="border w-[370px] h-[250px] border-slate-300 rounded-md hover:shadow-md p-5 flex flex-col gap-4 ">
              <div className="flex gap-2">
                <IoFileTrayFullOutline className="text-gray-600 text-2xl" />
                <Link
                  className="text-slate-600 text-md font-bold hover:text-blue-600"
                  href={""}
                >
                  Category Name
                </Link>
              </div>
              <div className="p-4 text-slate-600 flex flex-col gap-4">
                <div className="flex flex-col">
                  <Image
                    src={NoFolder}
                    alt="no folder"
                    className="self-center justify-self-center"
                  />
                  <p className="self-center text-[10px]">
                    This category is empty
                  </p>
                </div>
                <button className="self-center text-sm text-gray-800 border bg-slate-50 hover:bg-slate-200 rounded-md  w-20 p-1">
                  Add folder
                </button>
              </div>
            </div>
            <div className="border w-[370px] h-[250px] border-slate-300 rounded-md hover:shadow-md p-5 flex flex-col gap-4 ">
              <div className="flex gap-2">
                <IoFileTrayFullOutline className="text-gray-600 text-2xl" />
                <Link
                  className="text-slate-600 text-md font-bold hover:text-blue-600"
                  href={""}
                >
                  Category Name
                </Link>
              </div>
              <div className="p-4 text-slate-600 flex flex-col gap-4">
                <div className="flex flex-col">
                  <Image
                    src={NoFolder}
                    alt="no folder"
                    className="self-center justify-self-center"
                  />
                  <p className="self-center text-[10px]">
                    This category is empty
                  </p>
                </div>
                <button className="self-center text-sm text-gray-800 border bg-slate-50 hover:bg-slate-100 rounded-md  w-20 p-1">
                  Add folder
                </button>
              </div>
            </div>
            <div className="border w-[370px] h-[250px] border-slate-300 rounded-md hover:shadow-md p-5 flex flex-col gap-4 ">
              <div className="flex gap-2">
                <IoFileTrayFullOutline className="text-gray-600 text-2xl" />
                <Link
                  className="text-slate-600 text-md font-bold hover:text-blue-600"
                  href={""}
                >
                  Category Name
                </Link>
              </div>
              <div className="p-4 text-slate-600 flex flex-col gap-4">
                <div className="flex flex-col">
                  <Image
                    src={NoFolder}
                    alt="no folder"
                    className="self-center justify-self-center"
                  />
                  <p className="self-center text-[10px]">
                    This category is empty
                  </p>
                </div>
                <button className="self-center text-sm text-gray-800 border bg-slate-50 hover:bg-slate-100 rounded-md  w-20 p-1">
                  Add folder
                </button>
              </div>
            </div>
            <div className="border w-[370px] h-[250px] border-slate-300 rounded-md hover:shadow-md p-5 flex flex-col gap-4 ">
              <div className="flex gap-2">
                <IoFileTrayFullOutline className="text-gray-600 text-2xl" />
                <Link
                  className="text-slate-600 text-md font-bold hover:text-blue-600"
                  href={""}
                >
                  Category Name
                </Link>
              </div>
              <div className="p-4 text-slate-600 flex flex-col gap-4">
                <div className="flex flex-col">
                  <Image
                    src={NoFolder}
                    alt="no folder"
                    className="self-center justify-self-center"
                  />
                  <p className="self-center text-[10px]">
                    This category is empty
                  </p>
                </div>
                <button className="self-center text-sm text-gray-800 border bg-slate-50 hover:bg-slate-100 rounded-md  w-20 p-1">
                  Add folder
                </button>
              </div>
            </div>
            <div className="border w-[370px] h-[250px] border-slate-300 rounded-md hover:shadow-md p-5 flex flex-col gap-4 ">
              <div className="flex gap-2">
                <IoFileTrayFullOutline className="text-gray-600 text-2xl" />
                <Link
                  className="text-slate-600 text-md font-bold hover:text-blue-600"
                  href={""}
                >
                  Category Name
                </Link>
              </div>
              <div className="p-4 text-slate-600 flex flex-col gap-4">
                <div className="flex flex-col">
                  <Image
                    src={NoFolder}
                    alt="no folder"
                    className="self-center justify-self-center"
                  />
                  <p className="self-center text-[10px]">
                    This category is empty
                  </p>
                </div>
                <button className="self-center text-sm text-gray-800 border bg-slate-50 hover:bg-slate-100 rounded-md  w-20 p-1">
                  Add folder
                </button>
              </div>
            </div>
            <div className="border w-[370px] h-[250px] border-slate-300 rounded-md hover:shadow-md p-5 flex flex-col gap-4 ">
              <div className="flex gap-2">
                <IoFileTrayFullOutline className="text-gray-600 text-2xl" />
                <Link
                  className="text-slate-600 text-md font-bold hover:text-blue-600"
                  href={""}
                >
                  Category Name
                </Link>
              </div>
              <div className="p-4 text-slate-600 flex flex-col gap-4">
                <div className="flex flex-col">
                  <Image
                    src={NoFolder}
                    alt="no folder"
                    className="self-center justify-self-center"
                  />
                  <p className="self-center text-[10px]">
                    This category is empty
                  </p>
                </div>
                <button className="self-center text-sm text-gray-800 border bg-slate-50 hover:bg-slate-100 rounded-md  w-20 p-1">
                  Add folder
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;
