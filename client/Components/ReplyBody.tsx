"use client";
import { Ticket } from "@/app/Redux/features/agentTicketSlice";
import { selectUser, user } from "@/app/Redux/features/userSlice";
import { Listbox } from "@headlessui/react";
import { Avatar, Backdrop } from "@mui/material";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaChevronDown, FaRegTrashAlt } from "react-icons/fa";
import { MyListbox, NobuttonListbox } from "./Listbox";
import { ImAttachment } from "react-icons/im";
import { TicketReplyButton } from "./TicketButton";
import { PiBookOpenLight } from "react-icons/pi";
import { BsBook } from "react-icons/bs";
import { BiMessageAltCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import MyEditor from "./NewEditor";

interface ReplyBodyProps {
  ticket: Ticket | null;
  contact: user | null;
  OpenReply: boolean;
  setOpenReply: Dispatch<SetStateAction<boolean>>;
  setOpenForward: Dispatch<SetStateAction<boolean>>;
  setReplyWarning: Dispatch<SetStateAction<boolean>>;
}
const sendSet = [
  { id: 1, name: "send and set as pending" },
  { id: 2, name: "send and set as resolved" },
  { id: 3, name: "send and set as closed" },
];
const options = [
  { id: 1, name: "Reply" },
  { id: 2, name: "Forward" },
];

const ReplyBody = ({
  contact,
  OpenReply,
  setOpenReply,
  setOpenForward,
  setReplyWarning,
}: ReplyBodyProps) => {
  const { user, error } = useSelector(selectUser);
  const [ButtonOption, setButtonOption] = useState(options[0]);
  const [openSendAs, setOpenSendAs] = useState(false);
  const [sendAs, setSendAs] = useState(sendSet[0]);
  const [UnSavedChanged, setUnSavedChange] = useState();
  const Emails = [
    { id: 1, name: user?.Email },
    { id: 2, name: "knshelpdesk.abebe@gmail.com" },
  ];
  const [sendEmail, setSendEmail] = useState(
    Emails.filter((email) => email.name === user?.Email)
  );

  const [EditorValue, setEditorValue] = useState("");
  console.log("testing infinity2");
  const handleOptionListChange = () => {
    console.log(ButtonOption);
    if (ButtonOption.name === "Forward") setOpenForward(true);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("come on man");
  };

  return (
    <form
      className="w-full flex flex-col border border-gray-300 rounded-lg shadow-md bg-white md:divide-y"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4 py-2  px-10 bg-slate-100 relative">
        <Avatar
          src={" "}
          alt="profile pic"
          className=" self-center w-[30px] h-[30px] bg-slate-400 rounded-md "
        >
          {contact?.FullName?.slice(0, 1)}
        </Avatar>
        <NobuttonListbox
          style="flex gap-1"
          IconStyle="text-sm self-center text-gray-600 "
          ListOptionStyle="top-[80%] left-[5%] w-[150px] z-[2]"
          Lists={options}
          value={ButtonOption}
          setValue={setButtonOption}
          setOpenForward={setOpenForward}
        />
        <div className="flex gap-2 w-full border-l-2 p-1 px-2">
          <p className="  self-center text-md font-medium text-gray-500">
            From :{" "}
          </p>
          <div className=" flex-1 h-full relative p-1">
            <MyListbox
              value={sendEmail[0]}
              setValue={setSendEmail}
              Lists={Emails}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 py-2  px-10 bg-slate-50">
        <p className="text-gray-600 text-sm ">To : </p>
        <p className="text-gray-800 font-medium text-sm ">{contact?.Email}</p>
      </div>
      <MyEditor value={EditorValue} setValue={setEditorValue} />
      <div className="flex justify-between bg-slate-100 rounded-lg py-3 px-5">
        <div className="flex gap-1">
          <TicketReplyButton
            toolTipTitle="Attach files < 20MB"
            Icon={<ImAttachment className="text-gray-500   font-bold" />}
            clickHandler={() => {}}
          />
          <TicketReplyButton
            toolTipTitle="Canned Response"
            Icon={
              <BiMessageAltCheck className="text-gray-500  text-xl  font-bold" />
            }
            clickHandler={() => {}}
          />
          <TicketReplyButton
            toolTipTitle="Suggested Solutions"
            Icon={<BsBook className="text-gray-500   font-bold" />}
            clickHandler={() => {}}
          />
        </div>
        <div className="flex gap-2 relative">
          <button
            className="p-2 rounded-md border border-gray-400 hover:bg-gray-200 bg-white"
            type="button"
            onClick={() => {
              setReplyWarning(true);
            }}
          >
            <FaRegTrashAlt className="text-md text-gray-700" />
          </button>
          <div className="  flex  border rounded-md bg-[#224667] text-white">
            <button
              className="px-5 py-1  border-r-2 border-gray-800 hover:bg-[#12384d] rounded-l-md "
              type="submit"
            >
              Send
            </button>
            <NobuttonListbox
              Lists={sendSet}
              value={sendAs}
              setValue={setSendAs}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReplyBody;
