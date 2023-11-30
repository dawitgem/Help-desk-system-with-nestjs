import { Avatar } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BsBook, BsDash, BsPerson } from "react-icons/bs";
import { CgMailForward } from "react-icons/cg";
import { FiMaximize2 } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { MyCombobox, MyListbox } from "./Listbox";
import { TicketReplyButton } from "./TicketButton";
import { ImAttachment } from "react-icons/im";
import { BiMessageAltCheck } from "react-icons/bi";
import MyEditor from "./NewEditor";

const Emails = [
  { id: 1, name: "dawitgem@gmail.com" },
  { id: 2, name: "knshelpdesk.abebe@gmail.com" },
];

interface TicketForwardBodyProps {
  setOpenForward: Dispatch<SetStateAction<boolean>>;
}

const TicketForwardBody = ({ setOpenForward }: TicketForwardBodyProps) => {
  const [sendEmail, setSendEmail] = useState([Emails[0]]);
  const [addToolBar, setAddToolBar] = useState(false);
  const [value, setValue] = useState(
    "<p>Hi ther mother fucker would u look this ticket</p>"
  );
  return (
    <div className=" animate-reveal border-2  w-[500px] h-[calc(100vh-56px-56px-3px)] overflow-auto sticky top-[112px] flex-1 flex flex-col gap-3 px-3 ">
      <div className="md:justify-self-end self-end flex gap-1 p-2">
        <button className="p-1 hover:bg-slate-100 rounded-md">
          <BsDash className="text-lg text-gray-700" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-md">
          <FiMaximize2 className="text-sm text-gray-700" />
        </button>
        <button
          className="p-2 hover:bg-slate-100 rounded-md"
          onClick={() => {
            setOpenForward(false);
          }}
        >
          <IoCloseSharp className="text-lg text-gray-700" />
        </button>
      </div>
      <div className="px-5 flex gap-4">
        <div className="flex flex-col p-1 w-[40px] h-[40px] rounded-full bg-blue-500">
          <CgMailForward className="text-5xl text-white font-bold self-center justify-self-center" />
        </div>
        <p className="text-gray-700 text-lg font-medium self-center">Forward</p>
      </div>
      <div className="border rounded-md border-gray-300  flex flex-col">
        <div className="p-2 flex gap-2">
          <Avatar
            src={" "}
            alt="profile pic"
            className="self-center w-[40px] h-[40px] bg-slate-400 rounded-md "
          >
            c
          </Avatar>
          <div className=" self-center flex gap-2 w-full  p-1 px-2">
            <div className=" flex-1 h-full relative p-1">
              <MyListbox
                value={sendEmail[0]}
                setValue={setSendEmail}
                Lists={Emails}
              />
            </div>
          </div>
          <div className="flex justify-self-end">
            <button className="self-center flex  gap-1 w-[50px] h-[30px]  hover:bg-slate-100 rounded-sm align-middle justify-center">
              <BsPerson className="self-center   text-lg text-blue-500" />
              <p className="self-center text-blue-500 text-sm font-bold">0</p>
            </button>
            <div className="flex gap-1">
              <button className="self-center p-1 w-[40px] h-[30px] flex align-middle justify-center hover:bg-slate-100 rounded-sm">
                <BsDash className="self-center text-lg text-gray-700" />
              </button>
              <button className="self-center p-1 w-[40px] h-[30px] flex align-middle justify-center hover:bg-slate-100 rounded-sm">
                <FiMaximize2 className=" self-center text-sm text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        <div className="border flex-col  flex md:divide-y">
          <div className="flex gap-1 p-4">
            <p className="text-gray-500 font-medium text-sm">
              Subject :<span className="text-red-500 p-2">*</span>
            </p>
            <p className="text-sm text-gray-700 font-medium w-[80%] break-words">
              lskjdlakjsdlkajslkdjalksdjlkaj
            </p>
          </div>
          <div className="flex gap-1 p-2 px-4">
            <p className="pt-3 text-gray-500 font-medium text-sm">To :</p>
            <div className="self-center flex-1 h-full relative p-1">
              <MyCombobox />
            </div>
          </div>{" "}
          <div className="flex gap-1 p-2 px-4">
            <p className="pt-3 text-gray-500 font-medium text-sm">Cc :</p>
            <div className="self-center flex-1 h-full relative p-1">
              <MyCombobox />
            </div>
          </div>{" "}
          <div className="flex gap-1 p-2 px-4">
            <p className="pt-3 text-gray-500 font-medium text-sm">Bcc :</p>
            <div className="self-center flex-1 h-full relative p-1">
              <MyCombobox />
            </div>
          </div>
          <MyEditor value={value} setValue={setValue} />
          <div className="flex justify-between p-1">
            <div className="flex gap-1 ">
              <TicketReplyButton
                toolTipTitle="Attach files < 20MB"
                Icon={
                  <ImAttachment className="text-gray-500  text-sm  font-bold" />
                }
                clickHandler={() => {}}
              />
              <TicketReplyButton
                toolTipTitle="Canned Response"
                Icon={
                  <BiMessageAltCheck className="text-gray-500  text-md  font-bold" />
                }
                clickHandler={() => {}}
              />
              <TicketReplyButton
                toolTipTitle="Suggested Solutions"
                Icon={<BsBook className="text-gray-500  text-sm  font-bold" />}
                clickHandler={() => {}}
              />
            </div>
            <button className="py-1 px-3 hover:bg-slate-200 rounded-[5px] text-sm text-blue-500 font-medium">
              Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketForwardBody;
