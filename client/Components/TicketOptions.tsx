import {
  Ticket,
  selectAgentTicket,
} from "@/app/Redux/features/agentTicketSlice";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsCheck, BsChevronDown, BsGlobe, BsPhone } from "react-icons/bs";
import { MdOutlineMail, MdPersonAddAlt } from "react-icons/md";
import { PiPulseDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
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
interface TicketOptionsProps {
  ticket: Ticket;
}
const priorityOptions = ["Low", "Medium", "High", "Urgent"];
const statusOptions = ["Open", "Pending", "Resolved", "Closed"];
const TicketOptions = ({ ticket }: TicketOptionsProps) => {
  const { AgentTickets, Loading, error } = useSelector(selectAgentTicket);
  const [priority, setPriority] = useState(ticket.Priority);
  const [status, setStatus] = useState(ticket.Status);
  const [department, setDepartment] = useState(ticket.DepartmentId);
  const [OpenPriorityModal, setOpenPriorityModal] = useState(false);
  const [OpenDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [OpenStatusModal, setStatusModal] = useState(false);
  const PriorityRef = useRef<HTMLDivElement>(null);
  const DepartmentRef = useRef<HTMLDivElement>(null);
  const StatusRef = useRef<HTMLDivElement>(null);
  const Priority = (ticket: Ticket) => {
    if (priority === "Low") return "bg-green-500";
    if (priority === "High") return "bg-orange-500";
    if (priority === "Medium") return "bg-yellow-500";
    if (priority === "Urgent") return "bg-red-500";
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        PriorityRef.current &&
        !PriorityRef.current.contains(e.target as Node)
      )
        setOpenPriorityModal(false);
      if (
        DepartmentRef.current &&
        !DepartmentRef.current.contains(e.target as Node)
      )
        setOpenDepartmentModal(false);
      if (StatusRef.current && !StatusRef.current.contains(e.target as Node)) {
        setStatusModal(false);
      }
    };
    document.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      handleClickOutside(e);
    });
    return document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div className="pr-20 flex flex-col gap-3 justify-self-end">
      <div className="flex relative flex-col " id="priority" ref={PriorityRef}>
        <BootstrapTooltip
          title="Priority"
          placement="left-start"
          className="z-[0]"
        >
          <button
            className="flex gap-2"
            onClick={() => setOpenPriorityModal((prevState) => !prevState)}
          >
            <span
              className={`self-center w-3 h-3 rounded-sm ${Priority(ticket)}`}
            ></span>
            <p className="self-center  text-[13px]">{priority}</p>
            <BsChevronDown className="self-center text-[10px]" />
          </button>
        </BootstrapTooltip>
        {OpenPriorityModal && (
          <div className="bg-white rounded-md border  shadow-sm absolute left-0 top-[100%] w-full p-1 flex flex-col gap-1 text-sm text-gray-600 z-40">
            {priorityOptions.map((option: string, i: number) => (
              <button
                key={i}
                onClick={() => setPriority(option)}
                className={`${
                  priority.includes(option)
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-600 hover:bg-slate-100"
                }  self-start w-full flex justify-between px-2 z-50`}
              >
                <p>{option}</p>
                {priority.includes(option) && (
                  <BsCheck className="text-sm text-blue-700" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <div
        className="relative flex  flex-col z-30"
        id="department"
        ref={DepartmentRef}
      >
        <BootstrapTooltip
          title="Assign to Department and Agent"
          placement="left-start"
          className="z-[0]"
        >
          <button className="flex gap-2">
            <MdPersonAddAlt className="text-gray-600" />
            <p className="self-center  text-[13px]">Department</p>
            <BsChevronDown className="self-center text-[10px]" />
          </button>
        </BootstrapTooltip>
      </div>
      <div className="relative flex  flex-col " ref={StatusRef}>
        <BootstrapTooltip
          title="Status"
          placement="left-start"
          className="z-[0]"
        >
          <button
            className="flex gap-2"
            onClick={() => setStatusModal((prevState) => !prevState)}
          >
            <PiPulseDuotone className="text-gray-600" />
            <p className="self-center  text-[13px]">{status}</p>
            <BsChevronDown className="self-center text-[10px]" />
          </button>
        </BootstrapTooltip>
        {OpenStatusModal && (
          <div className="bg-white rounded-md border  shadow-sm absolute left-0 top-[100%] w-full p-1 flex flex-col gap-1 text-sm text-gray-600 z-50">
            {statusOptions.map((option: string, i: number) => (
              <button
                key={i}
                onClick={() => setStatus(option)}
                className={`${
                  status.includes(option)
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-600 hover:bg-slate-100"
                }  self-start w-full flex justify-between px-2 z-40`}
              >
                <p>{option}</p>
                {status.includes(option) && (
                  <BsCheck className="text-sm text-blue-700" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketOptions;
