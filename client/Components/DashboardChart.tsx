import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

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

export default function DashBoar() {
  return (
    <div className="p-5 bg-white  rounded-md ">
      <p className="text-sm text-gray-900">Today's trend</p>
      <p className="text-[12px] text-gray-500">as of 25th Aug 2023,8:30 PM</p>
      <div className="flex gap-5">
        <LineChart
          width={750}
          height={300}
          series={[
            { data: pData, label: "today", color: "#0ea2c7" },
            { data: uData, label: "yesterday", color: "#575f61" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
    </div>
  );
}
