import Link from "next/link";
import React from "react";

const TicketList = () => {
  return (
    <>
      <Link
        href={"../support/tickets/alskdflkj"}
        className=" self-center p-5 border w-[90%] rounded-md hover:border-blue-800 flex justify-between"
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold text-gray-700">Ticket name</h1>
          <p className="text-md text-gray-400">created date: 12 Aug 2001</p>
        </div>
        <div className="flex gap-1">
          <span className="m-1 w-[20px] h-[20px] text-blue border-inherit border bg-green-600 rounded-md"></span>
          <h1 className="text-lg text-gray-600">Open</h1>
        </div>
      </Link>
      <Link
        href={"../support/tickets/alskdflkj"}
        className=" self-center p-5 border w-[90%] rounded-md hover:border-blue-800 flex justify-between"
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold text-gray-700">Ticket name</h1>
          <p className="text-md text-gray-400">created date: 12 Aug 2001</p>
        </div>
        <div className="flex gap-1">
          <span className="m-1 w-[20px] h-[20px] text-blue border-inherit border bg-green-600 rounded-md"></span>
          <h1 className="text-lg text-gray-600">Open</h1>
        </div>
      </Link>
    </>
  );
};

export default TicketList;
