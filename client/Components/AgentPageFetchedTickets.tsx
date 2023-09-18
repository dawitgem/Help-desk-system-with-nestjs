"use client";
import {
  Checkbox,
  FormControlLabel,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { MdOutlineMail, MdPersonAddAlt } from "react-icons/md";
import { PiPulseDuotone } from "react-icons/pi";
import AgentPageTicketsFilterForm from "./AgentPageTicketsFilterForm";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#123d52",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#123d52",
  },
}));

interface AgentPageFetchedTicketProp {
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  checked: boolean[];
  tickets: number[];
}
const AgentPageFetchedTickets = ({
  setChecked,
  checked,
  tickets,
}: AgentPageFetchedTicketProp) => {
  return (
    <div className="flex gap-2 w-full ">
      <div className="flex flex-col gap-2 flex-[3] p-4 w-full h-[calc(100vh-112px)] overflow-auto">
        {tickets.map((ticket, i) => (
          <div
            key={i}
            className="bg-white p-4 flex gap-3 w-full rounded-md shadow-sm"
          >
            <div className="flex justify-between  w-full">
              <div className="self-center flex gap-3">
                <FormControlLabel
                  label=""
                  control={
                    <Checkbox
                      checked={checked[i]}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                        },
                      }}
                      className="text-gray-200"
                      onChange={(event) =>
                        setChecked(
                          checked.map((check: any, c: number) => {
                            if (c === i) check = event.target.checked;
                            return check;
                          })
                        )
                      }
                    />
                  }
                />
                <div className="w-[40px] h-[40px] rounded-lg bg-slate-400">
                  {/* <Image src="" alt="profilepic" /> */}
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={"/a/tickets/122"}
                    className=" text-gray-900 font-bold text-sm hover:text-blue-700"
                  >
                    Ticket Subject
                  </Link>
                  <div className="flex gap-2">
                    <MdOutlineMail className="self-center text-gray-500 text-sm" />
                    <Link
                      href={"/a/contacts/als"}
                      className="text-gray-800 text-[13px]"
                    >
                      ContactName
                    </Link>
                    <p className="text-gray-500 text-[13px]">
                      .created : 12 days ago{" "}
                    </p>
                    <p className="text-gray-500 text-[13px]">
                      .if over due: by 12 days{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pr-20 flex flex-col gap-3 justify-self-end">
                <BootstrapTooltip title="Priority" placement="left-start">
                  <button className="flex gap-2">
                    <span className=" self-center w-3 h-3 rounded-sm bg-green-500"></span>
                    <p className="self-center  text-[13px]">Priority</p>
                    <BsChevronDown className="self-center text-[10px]" />
                  </button>
                </BootstrapTooltip>
                <BootstrapTooltip
                  title="Assign to Department and Agent"
                  placement="left-start"
                >
                  <button className="flex gap-2">
                    <MdPersonAddAlt className="text-gray-600" />
                    <p className="self-center  text-[13px]">Department</p>
                    <BsChevronDown className="self-center text-[10px]" />
                  </button>
                </BootstrapTooltip>
                <BootstrapTooltip title="Status" placement="left-start">
                  <button className="flex gap-2">
                    <PiPulseDuotone className="text-gray-600" />
                    <p className="self-center  text-[13px]">Status</p>
                    <BsChevronDown className="self-center text-[10px]" />
                  </button>
                </BootstrapTooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AgentPageTicketsFilterForm />
    </div>
  );
};

export default AgentPageFetchedTickets;
