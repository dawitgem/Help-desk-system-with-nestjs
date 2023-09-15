import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
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
  const router = useRouter();
  const [shiftName, setShiftName] = useState("shift name");
  const [startTime, setStartTime]: any = useState(
    weekday.map((day) => "8:30 AM")
  );
  const [EndTime, setEndTime] = useState(weekday.map((day) => "5:30 PM"));
  const [isSelected, setIsSelected] = useState(
    weekdays.map((day) => {
      if (day === "Sun" || day === "Sat") return false;
      else return true;
    })
  );
  const [Disabled, setDisabled] = useState(true);
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (shiftName === "") setAlert(true);
    else {
      setAlert(false);
      setShiftName("");
    }
  };
  return (
    <div>
      <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label htmlFor="" className="text-sm text-gray-700">
          Shift Name
        </label>
        <input
          type="text"
          value={shiftName}
          className={`py-1 px-2 w-1/2 text-sm font-medium text-gray-700 border rounded-md ${
            alert
              ? "border-red-600 outline-none"
              : "hover:border-black outline-blue-600 "
          } `}
          onChange={(e) => {
            setShiftName(e.target.value);
            setDisabled(false);
          }}
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
                setDisabled(false);
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
                    value={startTime[i]}
                    onChange={(e) => {
                      const newStartTime = [...startTime];
                      newStartTime[i] = e.target.value;
                      setStartTime(newStartTime);
                      setDisabled(false);
                    }}
                  />
                </div>
                <span className="self-center text-gray-700">to</span>

                <div className="self-center  ">
                  <input
                    type="text"
                    className="p-2  w-[150px]   border border-gray-300 rounded-md outline-blue-600 text-sm text-gray-600"
                    placeholder="End Time"
                    value={EndTime[i]}
                    onChange={(e) => {
                      const newEndTime = [...EndTime];
                      newEndTime[i] = e.target.value;
                      setEndTime(newEndTime);
                      setDisabled(false);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="p-2 text-blue-500 flex gap-2 hover:bg-blue-100 text-sm font-semibold rounded-md absolute top-[-10px] left-[50%] "
            type="button"
            onClick={() => {
              const firstStartTime = startTime[0];
              const firstEndTime = EndTime[0];
              const newStartTime = [...startTime];
              const newEndTime = [...EndTime];

              for (let i = 1; i < weekday.length; i++) {
                newStartTime[i] = firstStartTime;
                newEndTime[i] = firstEndTime;
              }

              setStartTime(newStartTime);
              setEndTime(newEndTime);
            }}
          >
            <MdContentCopy className="self-center text-gray-700  " />
            <p className="self-center "> Copy to all</p>
          </button>
        </div>
        <div className="p-10 flex gap-2 self-center">
          <button
            className="text-sm text-gray-700 p-1 px-2 border bg-slate-50 rounded-md shadow-sm"
            type="button"
            onClick={() => router.push("/a/admin/agent_shift")}
          >
            Cancel
          </button>
          <button
            className={`bg-[#123e54] text-sm text-white p-1 px-2 border rounded-md shadow-sm ${
              Disabled && "opacity-70 cursor-not-allowed"
            }`}
            disabled={Disabled}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentShiftForm;
