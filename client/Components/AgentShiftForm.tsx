import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekday = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AgentShiftForm = () => {
  const [startTime, setStartTime]: any = useState([]);
  const [CopyToAll, setCopyToAll]: any = useState("");
  const [EndTime, setEndTime] = useState([]);
  const [isSelected, setIsSelected] = useState(
    weekdays.map((day) => {
      if (day === "Sun" || day === "Sat") return false;
      else return true;
    })
  );
  console.log(startTime);
  return (
    <div>
      <form action="" className="flex flex-col gap-5">
        <label htmlFor="" className="text-sm text-gray-700">
          Shift Name
        </label>
        <input
          type="text"
          defaultValue={"shift name"}
          className="py-1 px-2 w-1/2 text-sm font-medium text-gray-700 border rounded-md hover:border-black outline-blue-600 "
        />
        <label htmlFor="" className="text-md text-gray-800 font-medium">
          Select Working Days
        </label>
        <div className="flex gap-5">
          {weekdays.map((day, i) => (
            <button
              key={day}
              className={` text-sm p-2 px-4 border rounded-3xl font-semibold shadow-md ${
                isSelected[i]
                  ? "bg-blue-50 border-blue-600 text-blue-700"
                  : "bg-white  border-gray-200 text-gray-700"
              }`}
              type="button"
              onClick={() => {
                setIsSelected(
                  isSelected.map((select, s) => {
                    if (s == i) select = !select;
                    return select;
                  })
                );
              }}
            >
              {day}
            </button>
          ))}
          <p className="self-center text-gray-500">
            {" "}
            (
            {isSelected.reduce((count, currentValue, c) => {
              if (currentValue === true) count++;
              return count;
            }, 0)}
            days selected)
          </p>
        </div>
        <label htmlFor="" className="text-sm text-gray-600">
          Enter shit timings
        </label>
        <div className="flex flex-col relative gap-5 border-b pb-5">
          {weekday.map((day, i) => (
            <div className="flex gap-20 relative" key={i}>
              <label
                htmlFor=""
                className="w-[100px] text-sm text-gray-800 font-bold"
              >
                {day}
              </label>
              <div className="flex  gap-3  px-5 ">
                <div className="self-center w-1/2">
                  <input
                    type="text"
                    className="p-2   w-[150px] border border-gray-300 rounded-md outline-blue-600 text-sm text-gray-600"
                    placeholder="Start Time"
                    defaultValue={`${CopyToAll ? CopyToAll : "4:20 AM"}`}
                    onChange={(e) => {
                      setStartTime((prevState: any) => {
                        startTime[i] = e.target.value;
                        return prevState;
                      });
                      e.target.value = CopyToAll ? CopyToAll : e.target.value;
                    }}
                  />
                </div>
                <span className="self-center text-gray-700">to</span>

                <div className="self-center  ">
                  <input
                    type="text"
                    className="p-2  w-[150px]   border border-gray-300 rounded-md outline-blue-600 text-sm text-gray-600"
                    placeholder="End Time"
                    defaultValue={"4:20 AM"}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="p-2 text-blue-500 flex gap-2 hover:bg-blue-100 text-sm font-semibold rounded-md absolute top-[-10px] left-[50%] "
            type="button"
            onClick={() => setCopyToAll(startTime[0])}
          >
            <MdContentCopy className="self-center text-gray-700  " />
            <p className="self-center "> Copy to all</p>
          </button>
        </div>
        <div className="p-10 flex gap-2 self-center">
          <button
            className="text-sm text-gray-700 p-1 px-2 border bg-slate-50 rounded-md shadow-sm"
            type="button"
            disabled={false}
          >
            Cancel
          </button>
          <button
            className="bg-[#123e54] text-sm text-white p-1 px-2 border rounded-md shadow-sm cursor-not-allowed opacity-70"
            disabled={true}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentShiftForm;
