"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import { MyListbox } from "./Listbox";
import { Ticket } from "@/app/Redux/features/agentTicketSlice";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import { setPriority } from "os";

const Type = [
  { id: 1, name: "--" },
  { id: 2, name: "Question" },
  { id: 3, name: "Incident" },
  { id: 4, name: "Problem" },
  { id: 5, name: "Request" },
];
const Priority = [
  { id: 1, name: "Low", color: "green" },
  { id: 2, name: "Medium", color: "yellow" },
  { id: 3, name: "High", color: "orange" },
  { id: 4, name: "Urgent", color: "red" },
];
const Status = [
  { id: 1, name: "Open" },
  { id: 2, name: "Pending" },
  { id: 3, name: "Resolved" },
  { id: 4, name: "Closed" },
];
interface TicketDetailInfo {
  ticket: Ticket | null;
}
const TicketDetailInfo = ({ ticket }: TicketDetailInfo) => {
  const [change, setChange] = useState(false);
  const [selectedType, setSelectedType] = useState<any[]>(
    Type.filter((type: any) => ticket?.Type.includes(type.name))
  );
  const [selectedPriority, setSelectedPriority] = useState<any[]>(
    Priority.filter((Priority) => ticket?.Priority.includes(Priority.name))
  );
  const [selectedStatus, setSelectedStatus] = useState<any>(
    Status.filter((status) => ticket?.Status.includes(status.name))
  );

  const PropertyRef = useRef<HTMLParagraphElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const handleChange = () => {
    setChange(true);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const DueDateColor = (dueDate: any) => {
    const date = new Date(dueDate);
    if (isBefore(date, Date.now())) return "red";
    if (isAfter(date, Date.now())) return "green";
    if (isEqual(date, Date.now())) return "red";
  };
  console.log(selectedStatus)
  return (
    <div
      className="px-2 border-2 shadow-inner w-[300px] h-[calc(100vh-56px-56px-5px)] overflow-auto sticky top-[112px] flex flex-col gap-4 "
      ref={divRef}
    >
      <p className="p-5 text-gray-700 text-xl font-medium">{ticket?.Status}</p>
      <div className="px-4 flex gap-2 py-1 ">
        <div
          className={`mt-1 rounded-full border border-${DueDateColor(
            ticket?.FirstResponseDue
          )}-500 w-[13px] h-[13px]`}
        >
          <div
            className={`rounded-full border border-white w-full h-full bg-${DueDateColor(
              ticket?.FirstResponseDue
            )}-500`}
          ></div>
        </div>
        <div className="self-center flex flex-col gap-2">
          <p className="text-[13px] text-gray-700">FIRST RESPONSE DUE</p>
          <p className="-ml-5 text-sm text-gray-900">
            by{" "}
            <span className="text-gray-800 px-2 font-medium">
              {format(
                new Date(
                  ticket?.FirstResponseDue
                    ? ticket.FirstResponseDue
                    : Date.now()
                ),
                "EEE, MMM dd, yyyy hh:mm a"
              )}
            </span>{" "}
          </p>
        </div>
      </div>{" "}
      <div className="px-4 flex gap-2 py-1 ">
        <div
          className={`mt-1 rounded-full border border-${DueDateColor(
            ticket?.ResolutionDue
          )}-500 w-[13px] h-[13px]`}
        >
          <div
            className={`rounded-full border border-white w-full h-full bg-${DueDateColor(
              ticket?.ResolutionDue
            )}-500`}
          ></div>
        </div>
        <div className="self-center flex flex-col gap-2">
          <p className="text-[13px] text-gray-700">RESOLUTION DUE</p>
          <p className="-ml-5 text-sm text-gray-900">
            by{" "}
            <span className="text-gray-800 px-2 font-medium">
              {format(
                new Date(
                  ticket?.ResolutionDue ? ticket.ResolutionDue : Date.now()
                ),
                "EEE, MMM dd, yyyy hh:mm a"
              )}
            </span>{" "}
          </p>
        </div>
      </div>
      <form
        className="pt-4  border-t flex flex-col gap-4  relative"
        onSubmit={handleSubmit}
      >
        <p
          className="px-5 pb-4 text-[13px] text-gray-700 sticky top-[0px] bg-white shadow-md shadow-white "
          ref={PropertyRef}
        >
          PROPERTIES
        </p>
        <div className="px-5 flex flex-col gap-1 ">
          <label className="text-gray-700 text-sm "> Type</label>

          <div className="relative">
            {/* {selectedType && (
              <MyListbox
                Lists={Type}
                value={selectedType[0]}
                setValue={setSelectedType}
                handleChange={handleChange}
              />
            )} */}
          </div>
        </div>
        <div className="px-5 flex flex-col gap-1">
          <label className="text-gray-700 text-sm ">
            {" "}
            Status <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <MyListbox
              Lists={Status}
              value={selectedStatus[0]}
              setValue={setSelectedStatus}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="px-5 flex flex-col gap-1 ">
          <label className="text-gray-700 text-sm "> Priority</label>
          <div className="relative">
            <MyListbox
              Lists={Priority}
              value={selectedPriority[0]}
              setValue={setSelectedPriority}
              handleChange={handleChange}
            />
          </div>
        </div>{" "}
        <div className="px-5 flex flex-col gap-1">
          <label className="text-gray-700 text-sm ">Department</label>

          <div className="relative">
            <MyListbox
              Lists={Priority}
              value={selectedPriority[0]}
              setValue={setSelectedPriority}
              handleChange={handleChange}
            />
          </div>
        </div>{" "}
        <div className="px-5 flex flex-col gap-1">
          <label className="text-gray-700 text-sm ">Agent</label>
          <div className="relative">
            <MyListbox
              Lists={Priority}
              value={selectedPriority[0]}
              setValue={setSelectedPriority}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="justify-self-end sticky bottom-[0px]  w-full bg-white py-4 px-2 ">
          <button
            className={` w-full  text-white font-medium py-1 rounded-md bg-[#103549] ${
              change
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-60"
            }`}
            type="submit"
            disabled={!change}
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketDetailInfo;
