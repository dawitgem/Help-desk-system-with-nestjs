"use client";
import React, {
  ReactComponentElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsBell, BsChevronDown, BsPlusSquare, BsSearch } from "react-icons/bs";
import { BiFilterAlt, BiMessageAlt, BiSearch } from "react-icons/bi";
import { CgMenuLeft } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { JsxElement } from "typescript";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { Avatar } from "@mui/material";

interface NavbarAgentProps {
  currentPage: string;
  filterComponent?: JsxElement;
  link?: [{ name: string; href: string }] | any;
}
const notifcation1 = false;
const NavbarAgent = ({
  currentPage,
  filterComponent,
  link,
}: NavbarAgentProps) => {
  const [IsNewModalOpen, setIsNewModalOpen] = useState(false);
  const [IsSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [IsProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [IsNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const NewDropDownRef = useRef(null);
  const SearchModalRef = useRef(null);
  const ProfileModalRef = useRef(null);
  const NotificationModalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (NewDropDownRef.current && !NewDropDownRef.current.contains(e.target))
        setIsNewModalOpen(false);

      if (SearchModalRef.current && !SearchModalRef.current.contains(e.target))
        setIsSearchModalOpen(false);
      if (
        ProfileModalRef.current &&
        !ProfileModalRef.current.contains(e.target)
      )
        setIsProfileModalOpen(false);
      if (
        NotificationModalRef.current &&
        !NotificationModalRef.current.contains(e.target)
      )
        setIsNotificationModalOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="p-4  sticky  top-0 z-10 h-14 bg-white flex justify-between  ">
        <div className="flex gap-5">
          {filterComponent && (
            <button className="bg-slate-100 px-1 py-2 border border-gray-400 rounded-md flex">
              <BiFilterAlt className="self-center text-gray-500" />
              <CgMenuLeft className="text-gray-500 text-[10px]" />
            </button>
          )}
          <div className="flex gap-2">
            {link && (
              <>
                {link.map(({ href, name }: any) => (
                  <div className="flex gap-2">
                    <Link
                      href={href}
                      className="text-blue-600 font-medium self-center hover:underline"
                    >
                      {name}
                    </Link>
                    <AiOutlineRight className="text-gray-800  text-sm self-center " />
                  </div>
                ))}
              </>
            )}
            <h1 className="text-gray-800 font-medium">{currentPage}</h1>
          </div>
        </div>
        <div className="flex h-[30px] divide gap-5 relative">
          <div className="h-full relative" ref={NewDropDownRef}>
            <button
              className="px-2 h-full bg-slate-50 border-gray-400 border rounded-md flex gap-2"
              onClick={() => setIsNewModalOpen((prevState) => !prevState)}
            >
              <BsPlusSquare className="text-md text-gray-600 self-center" />
              <p className="text-gray-800 text-sm self-center">New</p>
              <BsChevronDown className="text-[10px] text-gray-900 self-center" />
            </button>
            {IsNewModalOpen && <NewDropDownMenu />}
          </div>
          <div className="h-full relative" ref={SearchModalRef}>
            <button
              className="px-2 h-full flex border gap-1 rounded-md "
              onClick={() => setIsSearchModalOpen((prevState) => !prevState)}
            >
              <BiSearch className="self-center text-gray-600 text-xl" />
              <p className="self-center text-gray-400">Search</p>
            </button>
            {IsSearchModalOpen && <SearchModal />}
          </div>
          <div className="h-full relative" ref={NotificationModalRef}>
            <button
              className="relative"
              onClick={() =>
                setIsNotificationModalOpen((prevState) => !prevState)
              }
            >
              {notifcation1 && (
                <p className="w-3 h-3 rounded-full bg-red-800 absolute top-0 left-[60%] border-2 border-white"></p>
              )}

              <BsBell className="text-gray-700 text-2xl" />
            </button>
            {IsNotificationModalOpen && <NotificationModal />}
          </div>
          <div className="h-full relative" ref={ProfileModalRef}>
            <button
              className="w-[35px] h-[35px] rounded-full bg-slate-500"
              onClick={() => setIsProfileModalOpen((prevState) => !prevState)}
            >
              <Avatar
                variant="square"
                alt="image"
                className="w-[35px] h-[35px] bg-slate-400 rounded-full shadow-md"
              >
                N
              </Avatar>
            </button>
            {IsProfileModalOpen && <ProfileModal />}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarAgent;
const emails = ["username@gmail.com", "user02@gmail.com"];

function NewDropDownMenu() {
  return (
    <ul className="p-4 bg-white w-[180px] h-[150px] border border-gray-400 rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-8 right-0">
      <li className="p-1 hover:bg-slate-100">
        <Link
          href={"/a/tickets/new"}
          className="w-52 text-gray-700 text-sm font-medium  p-2"
        >
          New Ticket
        </Link>
      </li>{" "}
      <li className="p-1 hover:bg-slate-100">
        <Link
          href={"/a/tickets/new"}
          className="w-52 text-gray-700 text-sm font-medium hover:bg-slate-100 p-2"
        >
          New Contact
        </Link>
      </li>{" "}
      <li className="p-1 hover:bg-slate-100">
        <Link
          href={"/a/tickets/new"}
          className="w-52 text-gray-700 text-sm font-medium hover:bg-slate-100 p-2"
        >
          New Email
        </Link>
      </li>
    </ul>
  );
}

const RecentlySearched: string[] = [];
function SearchModal() {
  const options = [
    { label: "All", value: "all" },
    { label: "Tickets", value: "tickets" },
    { label: "Contacts", value: "contacts" },
    { label: "Solutions", value: "solutions" },
  ];
  const [SelectedSearchValue, setSelectedSearchValue] = useState("all");
  console.log(RecentlySearched);

  return (
    <div className="w-[500px] max-h-[400px]  bg-slate-50  rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-0 right-0 flex flex-col gap-2">
      <form className="relative w-full h-10 bg-white ">
        <BsSearch className="absolute top-3 left-2 rounded-md" />
        <input
          type="text"
          className="p-2 border hover:border-black outline-blue-600 w-full px-10 rounded-md placeholder:text-sm placeholder:space-x-1 text-gray-700"
          placeholder="Search Tickets , Contacts and Solutions"
          autoFocus
          onChange={(e) => {
            RecentlySearched.push(e.target.value);
            if (RecentlySearched.length > 5) RecentlySearched.pop();
          }}
        />
      </form>
      <div className="w-full max-h-full   bg-white border rounded-md p-2 flex flex-col gap-5">
        <div className="flex gap-2 px-5 py-2 border-b">
          {options.map((option) => (
            <button
              key={option.label}
              className={`text-sm rounded-full border px-[9px] py-[7px] ${
                SelectedSearchValue.includes(option.value)
                  ? "bg-[#0000fffd] text-white transition-colors duration-75 ease-in"
                  : "bg-inherit text-gray-700"
              }`}
              onClick={() => setSelectedSearchValue(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {RecentlySearched.length != 0 && (
          <>
            <div className="flex justify-between px-5">
              <p className="text-sm text-gray-500">Recently searched</p>
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => (RecentlySearched.length = 0)}
              >
                Clear
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {RecentlySearched.map((search: string, i: number) => (
                <div key={i} className="flex gap-1 hover:bg-slate-100 p-3">
                  <BsSearch className="self-center" />
                  <Link href={""} className="text-sm text-gray-700">
                    {search}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const notification = false;

function NotificationModal() {
  return (
    <div className=" bg-white w-[350px]  border rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-8 right-0 flex flex-col gap-2">
      <div className="p-4 text-gray-700 text-sm w-full bg-slate-100">
        <p>Notifications</p>
      </div>
      <div className="bg-white min-h-[200px] flex flex-col align-middle justify-center">
        {notification ? (
          <div></div>
        ) : (
          <p className="self-center justify-self-center text-sm text-gray-600">
            No notification yet
          </p>
        )}
      </div>
    </div>
  );
}

function ProfileModal() {
  return (
    <div className=" bg-white w-[250px] h-[250px] border rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-[38px] right-0 flex flex-col gap-2">
      <div className="bg-slate-100 p-4 border-b flex flex-col gap-1">
        <h3 className="text-md text-gray-700 font-medium">Agent Name</h3>
        <p className="text-sm text-gray-500">agentEmail@gmail.com</p>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <Link
          href={""}
          className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
        >
          Profile setting
        </Link>
        <Link
          href={""}
          className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
        >
          Go to customer Portal
        </Link>
        <Link
          href={""}
          className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
