import React from "react";
import Header from "../../Components/Header";
import Searchbox from "@/Components/Searchbox";
import { MdPersonOutline } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BsQuestionCircle } from "react-icons/bs";
import { FaTicketAlt } from "react-icons/fa";
import { PiStackBold } from "react-icons/pi";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import Link from "next/link";

const Home = () => {
  const user = true;
  return (
    <>
      <div className="bg-[#063750] h-[350px] flex flex-col align-middle justify-center gap-10 relative ">
        <h1 className="md:text-4xl text-xl text-white font-black self-center">
          Hi, how can we help you?
        </h1>
        <Searchbox />
        <Link
          href="./support/tickets/new"
          className=" hidden md:block absolute top-10 left-[80%] bg-slate-50 p-3 rounded-lg"
        >
          Submit Ticket
        </Link>
      </div>
      <div className="px-[50px] mt-[-20px] md:flex md:flex-row flex flex-col  align-middle justify-center gap-10 relative">
        <Link
          href="./support/tickets/new"
          className="md:w-[300px] p-5 bg-white rounded-md border  gap-2 justify-center shadow-lg  w-[90%]  md:flex  "
        >
          <div className="flex">
            <MdPersonOutline className="text-6xl text-gray-600" />
            <BsQuestionCircle
              className="text-2xl text-green-500 
            rounded-full"
            />
          </div>
          <div className="md:w-[60%] w-full break-words">
            <h1 className=" mb-4 text-xl text-gray-700 font-bold">
              Submit ticket
            </h1>

            <p className="text-md text-gray-800">
              Describe your issue by filling up the support ticket form{" "}
            </p>
          </div>
        </Link>

        <Link
          href="./support/solutions"
          className="md:w-[300px] w-[90%] p-5 bg-white rounded-md border md:flex gap-5 justify-center shadow-lg "
        >
          <div className="flex">
            <HiOutlineLightBulb className="text-5xl text-gray-500" />
          </div>
          <div className="md:w-[60%] break-words">
            <h1 className=" mb-4 text-xl text-gray-700 font-bold">
              Browse articles
            </h1>

            <p className="text-md text-gray-800">
              Explore how to's and best practices from our knowledge{" "}
            </p>
          </div>
        </Link>
        {user && (
          <Link
            href="./support/tickets"
            className="md:w-[300px] w-[90%] p-5 bg-white rounded-md border md:flex gap-2 justify-center shadow-lg "
          >
            <div className="flex align-middle">
              <FaTicketAlt className="text-5xl p-1 " color="gray" />
            </div>
            <div className="md:w-[60%] break-words">
              <h1 className=" mb-4 text-xl text-gray-700 font-bold">
                View tickets
              </h1>

              <p className="text-md text-gray-800">
                Track your tickets's status and progress here{" "}
              </p>
            </div>
          </Link>
        )}
      </div>
      <div className="m-8 flex flex-col gap-10 ">
        <div className="self-center flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-gray-700">Knowledge base</h1>
          <Link
            className="md:text-blue-900 text-md self-center hover:text-black"
            href="./support/solutions"
          >
            view all articles
          </Link>
        </div>
        <div className="self-center md:flex gap-10">
          <Link
            href={"./support/solutions/2"}
            className="p-4 flex flex-col justify-center align-middle w-[300px] bg-white shadow-lg gap-5 rounded-lg"
          >
            <PiStackBold className=" self-center text-5xl text-gray-700 " />
            <h1 className="self-center text-lg font-bold text-gray-700 ">
              Category name
            </h1>
            <p className="self-center text-md  ">category descriptions</p>
          </Link>
          <Link
            href={"./support/solutions/2"}
            className="p-4 flex flex-col justify-center align-middle w-[300px] bg-white shadow-lg gap-5 rounded-lg"
          >
            <PiStackBold className=" self-center text-5xl text-gray-700 " />
            <h1 className="self-center text-lg font-bold text-gray-700">
              Category name
            </h1>
            <p className="self-center text-md  ">category descriptions</p>
          </Link>
        </div>
        <div className="bg-white p-10 font-medium m-8">
          <div className=" ">
            <div className="flex justify-between ">
              <h1 className="text-xl font-bold ">Most popular articles</h1>
              <Link
                className="text-blue-600 hover:text-black"
                href={"./support/solutions"}
              >
                view all articles
              </Link>
            </div>
            <Link href={"./support/solutions/articles/2"} className=" p-10 ">
              <div className="flex gap-10">
                <BsFillFileEarmarkTextFill className="text-3xl text-gray-600" />
                <h1 className="text-blue-600 hover:text-black  text-md">
                  {" "}
                  Article title
                </h1>
              </div>
              <p className="text-slate-500 text-sm ml-[70px]">
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
