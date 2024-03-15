"use client";
import {useEffect, useState} from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { io } from "socket.io-client";
import dotenv from "dotenv"
dotenv.config()

const uData = [
  0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
  0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
];
const pData = [
  0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
  0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
];
const xLabels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export function Chart() {
  const [ticketCounts,setTicketCounts]=useState<any>({
    previousDay: [],
    currentDay: [],
  })
  useEffect(()=>{
    const socket = io(process.env.NEXT_PUBLIC_API_URL||"");
    console.log(socket.connected)

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit('getTicketsCount');

    socket.on('ticketCounts', ({ previousDay, currentDay }) => {
      setTicketCounts({previousDay,currentDay});
    });

    return () => {
      socket.disconnect();
    };

  },[])
  console.log(ticketCounts)
  
  return (
    <div className="p-5 bg-white  rounded-md ">
      <p className="text-sm text-gray-900">Today's trend</p>
      <p className="text-[12px] text-gray-500">as of 25th Aug 2023,8:30 PM</p>

      <LineChart
        width={750}
        height={300}
        series={[
          { data: ticketCounts.currentDay, label: "today", color: "#0ea2c7" },
          { data: ticketCounts.previousDay, label: "yesterday", color: "#575f61" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
}

const DashboardChartReport = () => {
  return (
    <div className="flex  bg-white rounded-md shadow-md border border-300">
      <Chart />
      <div className="pt-20 flex flex-col gap-5">
        <div className="border-l-4 p-3 flex flex-col">
          <h1 className="text-xl text-gray-600">Received</h1>
          <h1 className="self-center text-2xl text-gray-400">0</h1>
        </div>
        <div className="border-l-4 p-3 flex flex-col">
          <h1 className="text-xl text-gray-600">Resolved</h1>
          <h1 className="self-center text-2xl text-gray-400">0</h1>
        </div>
      </div>
    </div>
  );
};
export default DashboardChartReport;
