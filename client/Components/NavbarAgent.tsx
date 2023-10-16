"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsBell, BsChevronDown, BsPlusSquare, BsSearch } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { Avatar } from "@mui/material";
import NewDropDownMenu from "./NewDropDownMenu";
import SearchModal from "./SearchModal";
import NotificationModal from "./NotificationModal";
import AgentProfileModal from "./AgentProfileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  AgentgetProfileStart,
  selectAgent,
} from "@/app/Redux/features/agentSlice";

interface NavbarAgentProps {
  currentPage: string;
  FilterComponent?: JSX.Element;
  link?: [{ name: string; href: string }] | any;
  tooltipTitle?: string;
  setAction?: Dispatch<SetStateAction<boolean>> | any;
}

const notifcation1 = false;
const NavbarAgent = ({ currentPage, link, setAction }: NavbarAgentProps) => {
  const { agent, error, isAuth, Loading } = useSelector(selectAgent);
  const [IsNewModalOpen, setIsNewModalOpen] = useState(false);
  const [IsSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [IsProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [IsNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);

  const NewDropDownRef = useRef<HTMLDivElement>(null);
  const SearchModalRef = useRef<HTMLDivElement>(null);
  const ProfileModalRef = useRef<HTMLDivElement>(null);
  const NotificationModalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = () => {
      dispatch(AgentgetProfileStart());
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        NewDropDownRef.current &&
        !NewDropDownRef.current.contains(e.target as Node)
      )
        setIsNewModalOpen(false);

      if (
        SearchModalRef.current &&
        !SearchModalRef.current.contains(e.target as Node)
      )
        setIsSearchModalOpen(false);
      if (
        ProfileModalRef.current &&
        !ProfileModalRef.current.contains(e.target as Node)
      )
        setIsProfileModalOpen(false);
      if (
        NotificationModalRef.current &&
        !NotificationModalRef.current.contains(e.target as Node)
      )
        setIsNotificationModalOpen(false);
    };
    getProfile();
    document.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      handleClickOutside(e);
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="p-4  sticky  top-0 z-10 h-14 bg-white flex justify-between  ">
        <div className="flex gap-5">
          <div className="flex gap-2">
            {link && (
              <>
                {link.map(({ href, name }: any) => (
                  <div className="flex gap-2" key={href}>
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
              onClick={(e) => {
                e.stopPropagation();
                setIsNewModalOpen((prevState) => !prevState);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchModalOpen((prevState) => !prevState);
              }}
            >
              <BiSearch className="self-center text-gray-600 text-xl" />
              <p className="self-center text-gray-400">Search</p>
            </button>
            {IsSearchModalOpen && <SearchModal />}
          </div>
          <div className="h-full relative" ref={NotificationModalRef}>
            <button
              className="relative"
              onClick={(e) => {
                e.stopPropagation();
                setIsNotificationModalOpen((prevState) => !prevState);
              }}
            >
              {notifcation1 && (
                <p className="w-3 h-3 rounded-full bg-red-800 absolute top-0 left-[60%] border-2 border-white"></p>
              )}

              <BsBell className="text-gray-700 text-2xl" />
            </button>
            {IsNotificationModalOpen && <NotificationModal />}
          </div>
          <div className="w-full h-full " ref={ProfileModalRef}>
            <button
              className="w-[35px] h-[35px] rounded-full bg-slate-500 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileModalOpen((prevState) => !prevState);
              }}
            >
              <Avatar
                src={agent?.Image || " "}
                variant="circular"
                alt="image"
                className=" bg-slate-400 rounded-full "
              >
                {agent?.FullName?.slice(0, 1)}
              </Avatar>
            </button>
            {IsProfileModalOpen && <AgentProfileModal />}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarAgent;
const emails = ["username@gmail.com", "user02@gmail.com"];
