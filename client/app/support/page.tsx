"use client";
import React, { useEffect } from "react";
import Header from "../../Components/Header";
import Searchbox from "@/Components/Searchbox";

import { PiStackBold } from "react-icons/pi";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import Link from "next/link";
import UserOptions from "@/Components/UserOptions";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/features/userSlice";

const Home = () => {
  const { user } = useSelector(selectUser);
  return (
    <>
      <div className="bg-[#063750] h-[350px] flex flex-col align-middle justify-center gap-10 md:p-2 p-5  ">
        <h1 className="md:text-4xl text-xl text-white font-black self-center">
          Hi, how can we help you?
        </h1>
        <Searchbox />
      </div>
      <UserOptions />
      <div className="md:p-10 p-3 flex flex-col gap-10">
        <div className="self-center flex flex-col gap-3">
          <h1 className="md:text-4xl text-xl font-bold text-gray-700 ">
            Knowledge base
          </h1>
          <Link
            className="md:text-blue-900 text-md self-center hover:text-black"
            href="/support/solutions"
          >
            view all articles
          </Link>
        </div>
        <div className="w-full  md:flex md:flex-row justify-center flex flex-col gap-10 ">
          <Link
            href={"/support/solutions/2"}
            className="self-center p-4 flex flex-col justify-center align-middle md:w-[300px] w-[95%] bg-white shadow-lg gap-5 rounded-lg"
          >
            <PiStackBold className=" xsm:self-center sm:text-5xl text-3xl text-gray-700 " />
            <h1 className="self-center text-lg font-bold text-gray-700 xsm:w-auto w-[90%] break-words">
              Category name
            </h1>
            <p className="self-center text-md xsm:w-auto w-[90%] break-words  ">
              category descriptions
            </p>
          </Link>
          <Link
            href={"/support/solutions/2"}
            className="self-center p-4 flex flex-col  md:w-[300px] w-[95%] bg-white shadow-lg gap-5 rounded-lg"
          >
            <PiStackBold className=" xsm:self-center sm:text-5xl text-3xl text-gray-700 " />
            <h1 className="self-center text-lg font-bold text-gray-700 xsm:w-auto w-[90%] break-words">
              Category name
            </h1>
            <p className="self-center text-md xsm:w-auto w-[90%] break-words ">
              category descriptions
            </p>
          </Link>
        </div>
        <div className="bg-white md:p-10 sm:p-4 font-medium md:m-8 w-full">
          <div className=" ">
            <div className="md:flex justify-between w-full break-words">
              <h1 className="md:text-xl font-bold ">Most popular articles</h1>
              <Link
                className="text-blue-600 hover:text-black"
                href={"./support/solutions"}
              >
                view all articles
              </Link>
            </div>
            <Link href={"/support/solutions/articles/2"} className=" sm:p-10 ">
              <div className="md:flex gap-10">
                <BsFillFileEarmarkTextFill className="md:text-3xl text-gray-600" />
                <h1 className="text-blue-600 hover:text-black  text-md w-auto break-words">
                  {" "}
                  Article title
                </h1>
              </div>
              <p className="text-slate-500 text-sm sm:ml-[70px] w-auto break-words">
                modified by abebe wondwosen on 12 Aug 2023 4:00 pm
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
