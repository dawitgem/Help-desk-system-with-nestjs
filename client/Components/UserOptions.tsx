"use client";
import { selectUser } from "@/app/Redux/features/userSlice";
import { AppDispatch } from "@/app/Redux/store";
import { getProfileApi } from "@/utils/QueryActions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { FaTicketAlt } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdPersonOutline } from "react-icons/md";

const UserOptions = () => {
  const {data:user,isError,isSuccess}=useQuery({
    queryKey:["getUser"],
    queryFn:getProfileApi
  })
  return (
    <div className="md:px-[50px] px-4 md:mt-[-20px] mt-5 md:flex md:flex-row flex flex-col  align-middle justify-center gap-10 ">
      <Link
        href="/support/tickets/new"
        className="md:w-[300px] p-5 bg-white rounded-md border  gap-2 justify-center shadow-lg  w-[95%]  md:flex  "
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
        href="/support/solutions"
        className="md:w-[300px] w-[95%] p-5 bg-white rounded-md border md:flex gap-5 justify-center shadow-lg "
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
      {user && user?.Verified === true &&  (
        <Link
          href="/support/tickets"
          className="md:w-[300px] w-[95%] p-5 bg-white rounded-md border md:flex gap-2 justify-center shadow-lg "
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
  );
};

export default UserOptions;
