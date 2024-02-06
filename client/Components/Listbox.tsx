"use client";
import { useState, Fragment, SetStateAction, Dispatch, FormEvent } from "react";
import { Listbox, Combobox } from "@headlessui/react";
import { BsBell, BsCheck, BsCheck2, BsChevronDown, BsChevronRight, BsChevronUp, BsFillCaretDownFill, BsPlusSquare } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { select } from "redux-saga/effects";

interface MyListboxProps {
  Lists: any[];
  value: any;
  setValue: Dispatch<SetStateAction<any[]>>;
  handleChange?: () => void;
}

export function MyListbox({
  Lists,
  setValue,
  value,
  handleChange,
}: MyListboxProps) {
    console.log(value)
  return (
    <Listbox
      value={value}
      onChange={(value) => {
        if (handleChange) handleChange();

        setValue([value]);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Button
            type="button"
            className={` ${
              open
                ? "border-2 border-blue-500"
                : "border border-gray-300 hover:border-black"
            } rounded-md py-2 px-2 text-sm text-gray-700   md:cursor-default w-full flex justify-between`}
          >
            <div className="flex gap-1">
              {value.color && (
                <div
                  className={` self-center w-[8px] h-[8px] rounded-sm bg-${value.color}-500`}
                ></div>
              )}
              <p>{value.name} </p>
            </div>
            {open ? (
              <FaChevronUp className="self-center text-[13px]" />
            ) : (
              <FaChevronDown className="self-center text-[13px]" />
            )}
          </Listbox.Button>
          <Listbox.Options
            className={
              " absolute top-full  w-full z-40 border rounded-md shadow-md p-2 bg-white"
            }
          >
            {Lists.map((value) => (
              <Listbox.Option key={value.id} value={value} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`${
                      selected
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-700  hover:bg-slate-100"
                    } flex justify-between p-2 cursor-pointer rounded-sm`}
                  >
                    <div className="flex gap-1">
                      {value.color && (
                        <div
                          className={` self-center w-[8px] h-[8px] rounded-sm bg-${value.color}-500`}
                        ></div>
                      )}
                      <p className="text-sm font-medium w-[100%] break-words">
                        {value.name}
                      </p>
                    </div>
                    {selected && (
                      <BsCheck className="text-blue-700 text-xl font-bold " />
                    )}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
}
interface NobuttonListboxProps {
  Lists: any[];
  value: any;
  style?: string;
  IconStyle?: string;
  ListOptionStyle?: string;
  setValue: Dispatch<SetStateAction<any>>;
  setOpenForward?: Dispatch<SetStateAction<boolean>>;
  changeHandler?: () => void;
}
export const NobuttonListbox = ({
  Lists,
  value,
  style,
  setValue,
  IconStyle,
  ListOptionStyle,
  setOpenForward,
}: NobuttonListboxProps) => {
  return (
    <Listbox
      value={value}
      onChange={(value: any) => {
        setValue(value);
        if (value.name === "Forward" && setOpenForward !== undefined) {
          console.log("come on man");
          setOpenForward(true);
        }
      }}
    >
      <Listbox.Button
        className={`${
          style
            ? style
            : "px-3 py-1 text-[12px] rounded-r-md hover:bg-[#12384d] "
        }`}
        type="button"
      >
        <FaChevronDown
          className={`${
            IconStyle ? IconStyle : "text-md font-bold text-white"
          }`}
        />
      </Listbox.Button>
      <Listbox.Options
        className={`absolute bg-white  border rounded-md shadow-md p-2 ${
          ListOptionStyle
            ? ListOptionStyle
            : " bottom-[105%] right-0  w-[230px]  z-40 "
        }`}
      >
        {Lists.map((value) => (
          <Listbox.Option key={value.id} value={value} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  selected
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700  hover:bg-slate-100"
                } flex justify-between p-2 cursor-pointer rounded-sm`}
              >
                <div className="flex gap-1">
                  <p className="text-sm font-medium w-[100%] break-words">
                    {value.name}
                  </p>
                </div>
                {selected && (
                  <BsCheck className="text-blue-700 text-xl font-bold " />
                )}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};


const people = [
  { id: 1, name: "Durward Reynold@gmail.com" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

export function MyCombobox() {
  const [selectedPeople, setSelectedPeople] = useState<{ id: ""; name: "" }[]>(
    []
  );

  return (
    <Combobox value={selectedPeople} onChange={setSelectedPeople}>
      {({ open }) => (
        <>
          <Combobox.Button
            className={`${
              open ? "border-2 border-blue-500" : "border-none"
            } rounded-md p-2 w-full flex gap-1 `}
          >
            {selectedPeople.length > 0 && (
              <div className="flex flex-col gap-1 w-full ">
                {selectedPeople.map((people, i) => (
                  <div
                    key={people.id}
                    className=" bg-slate-100 flex justify-between rounded-md "
                  >
                    <p className="md:justify-self-start self-center  w-full text-[12px] text-gray-700">
                      {people.name}
                    </p>
                    <button
                      className="self-center w-[30px] h-[30px] hover:bg-slate-200 rounded-[4px] flex md:justify-center align-middle"
                      onClick={() => {
                        setSelectedPeople(
                          selectedPeople.filter(
                            (people) => people !== selectedPeople[i]
                          )
                        );
                      }}
                    >
                      <IoCloseSharp className="self-center justify-self-center text-sm text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Combobox.Input
              className={
                "w-full h-full self-end   outline-none text-sm text-gray-700 font-medium"
              }
            />
          </Combobox.Button>
          <Combobox.Options
            className={
              " absolute top-full  w-full z-40 border rounded-md shadow-md p-2 bg-white"
            }
          >
            {people.map((person) => (
              <Combobox.Option key={person.id} value={person}>
                {({ active, selected }) => (
                  <li
                    className={`${
                      selected
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-700  hover:bg-slate-100"
                    } flex justify-between p-2 cursor-pointer rounded-sm`}
                  >
                    <p className="text-sm font-medium w-[100%] break-words">
                      {person.name}
                    </p>
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </>
      )}
    </Combobox>
  );
}
import { Menu } from '@headlessui/react'

interface SolutionsMenuProps{
  setOpenFolder:Dispatch<SetStateAction<boolean>>
  setOpenCategory:Dispatch<SetStateAction<boolean>>
}

export const  SolutionsDropDown=({setOpenCategory,setOpenFolder}:SolutionsMenuProps)=> {
  return (
    <Menu>
      <Menu.Button className="border border-[#0e1c31]   p-1 bg-[#184e6a] hover:bg-[#194256] rounded-r-[7px] h-full text-[14px]" >
            <BsFillCaretDownFill />
          </Menu.Button>
      <Menu.Items className={"bg-white border border-gray-300 shadow-md  rounded-md absolute top-full mt-1 left-0 p-2 text-gray-800 font-medium text-[13px] w-auto"}>
        <Menu.Item >
          {({ active,close }) => (
            <button
              className={`${active && 'bg-slate-100'} p-2 `}
              onClick={()=>{
                console.log("clicked")
                setOpenFolder(true)}
              }
            >
              New Folder
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
            className={`${active && 'bg-slate-100'} p-2 `}
            onClick={()=>setOpenCategory(true)}
            >
              New Category
            </button>
          )}
        </Menu.Item>
        
      </Menu.Items>
    </Menu>
  )
}

import { Dialog } from '@headlessui/react'
import NewFolderModal from "./NewFolderModal";
import NewCategoryModal from "./NewCategoryModal";

interface MyDialogProps{
  OpenFolder:boolean
  OpenCategory:boolean
  setOpenFolder:Dispatch<SetStateAction<boolean>>
  setOpenCategory:Dispatch<SetStateAction<boolean>>
}
export const MyDialog=({OpenFolder,OpenCategory,setOpenCategory,setOpenFolder}:MyDialogProps)=> {

  return (
    <Dialog open={OpenCategory||OpenFolder} onClose={() => {
      if(OpenFolder)
      setOpenFolder(false)
    if(OpenCategory)
      setOpenCategory(false)
    }}  className="relative z-50 bg-green-500"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-[#00000034]">
        <Dialog.Panel className="w-full max-w-[40%] rounded-md shadow-md bg-white border border-gray-300  ">
           {OpenFolder && <NewFolderModal/>}
           {OpenCategory && <NewCategoryModal/>}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
export const RecentActivitiesModal=()=> {
  const [openRecent, setOpenRecent] = useState(false);

  return (
    <>
    <button
          className="relative float-right -top-[40px] z-[1] self-center hover:underline text-blue-600 text-sm flex gap-1 "
          onClick={(e) => {
            e.stopPropagation();
            setOpenRecent(true);
          }}
        >
          Recent Activities
          <BsChevronRight className="self-center text-[10px] text-black" />
        </button>
      {openRecent&& <RecentActivities setOpen={setOpenRecent} open={openRecent}/>}
    
    </>
  )
}


import { Popover, Transition } from '@headlessui/react'
import NewDropDownMenu, { NewContactsForm } from "./NewDropDownMenu";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import SearchModal from "./SearchModal";
import NotificationModal from "./NotificationModal";
import { Avatar } from "@mui/material";
import AgentProfileModal from "./AgentProfileModal";
import RecentActivities from "./RecentActivities";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/utils/QueryActions";


export default function NewPopOver() {
  const [openNewContact, setOpenNewContact] = useState(false);

  return (
    <>
      <Popover className="h-full relative ">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
              p-2 h-full bg-slate-50 border-gray-400 border rounded-md flex gap-3`}
            >

              <BsPlusSquare className="text-md text-gray-600 self-center" />
              <p className="text-gray-800 text-sm self-center">New</p>
              <BsChevronDown className="text-[10px] text-gray-900 self-center" />

             
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="-translate-x-1/2 transform p-4 bg-white w-[180px] h-[150px] border border-gray-400 rounded-[5px] opacity-100 z-[60] shadow-md  absolute top-8 left-0">
              <>
      <ul className="">
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
            href={""}
            className="w-52 text-gray-700 text-sm font-medium hover:bg-slate-100 p-2"
            onClick={() => {
              setOpenNewContact(true);
            }}
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
    </>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
        {openNewContact && (
          <NewContactsForm open={openNewContact} setOpen={setOpenNewContact} />
        )}
        </>
  )
}



export const NewSearchPopOver=()=>{

  return (
      <Popover className="h-full relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
              px-2 h-full flex border gap-1 rounded-md ring-0`}
            >

              <BiSearch className="self-center text-gray-600 text-xl" />
              <p className="self-center text-gray-400">Search</p>

             
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"

            >
              <Popover.Panel className="-translate-x-1/2 transform  w-[400px] max-h-[400px]  bg-slate-50  rounded-[5px] opacity-100 z-[60] shadow-md  absolute top-0 left-0 flex flex-col gap-2">
             <SearchModal/>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
  )

}
export const NotificationPopOver=()=>{
  const notifcation1=true;

  return (
      <Popover className="h-full relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
              relative outline-none ring-0`}
            >
{notifcation1 && (
                <p className="w-3 h-3 rounded-full bg-red-800 absolute top-0 left-[60%] border-2 border-white"></p>
              )}

              <BsBell className="text-gray-700 text-2xl" />

             
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"

            >
              <Popover.Panel className="   bg-white w-[350px]  border rounded-[5px] opacity-100 z-[60] shadow-md  absolute top-8 right-0 flex flex-col gap-2">
             <NotificationModal/>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
  )


}
interface profileProps{
  user:user
}
export const ProfilePopOver=()=>{
  const {data:user,isError,isLoading,error}=useQuery({
    queryKey:["getUser"],
    queryFn:getProfileApi
   })
 

  return(
  <Popover className="w-full h-full ">
  {({ open }) => (
    <>
      <Popover.Button
        className={`
        w-[35px] h-[35px] rounded-full bg-slate-500 shadow-md ring-0 outline-none`}
      >
                <Avatar
                src={ " "}
                variant="circular"
                alt="image"
                className=" bg-slate-400 rounded-full "
              >
                {user?.UserName?.slice(0,1)}
              </Avatar>

       
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"

      >
        <Popover.Panel className=" bg-white w-[250px] h-[250px]  rounded-[5px] opacity-100 z-[60] shadow-lg border-gray-300 border  absolute top-[40px] right-0 flex flex-col gap-2">
        <AgentProfileModal User={user}  />
        </Popover.Panel>
      </Transition>
    </>
  )}
</Popover>)

}

interface UserProfilePopoverProps{
  avatar:boolean,
  width:number,
  right:number,
  top:number,
  

}

const Department = [
  { name: "All Department", value: "All" },
  { name: "Department 1", value: "dept2" },
  { name: "Department 2", value: "dept3" },
];


export const SelectDeptPopOver=()=>{
  const [selectedDept, setSelectedDept] = useState("All Department");
  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault()

  }

  return(
    <Popover className="h-full relative ">
    {({ open }) => (
      <>
        <Popover.Button
          className={`self-center flex gap-2 ring-0 outline-none `}
        >
              <p className="text-sm text-gray-800">{selectedDept}</p>

                  {open ? (
                <BsChevronUp className="text-[8px] text-black self-center" />
              ) : (
                <BsChevronDown className="text-[8px] text-black self-center" />
              )}
  
         
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
  
        >
          <Popover.Panel className=" w-[200px] max-h-[180px]  bg-white  rounded-[5px] opacity-100 z-[40] shadow-md  absolute top-6 left-0 flex flex-col gap-2 border">
       
      {({ close }) => (
         <form className="p-2 flex flex-col gap-1 w-full" onSubmit={handleSubmit}>
         <input
           type="text"
           placeholder="search for department"
           className="text-sm px-1 py-2 outline-none border-b border-blue-600 placeholder:text-sm"
           autoFocus
         />
         {Department.map((dept, i) => (
           <button
             key={i}
             className={`p-1 hover:bg-slate-200 rounded-sm text-sm  flex justify-between ${
               selectedDept.includes(dept.name)
                 ? "text-blue-600 bg-slate-100"
                 : "text-gray-700"
             }`}
             value={dept.value}
             onClick={(e) => {
               setSelectedDept(dept.name);
               close();
             }}
           >
             <p className=" font-medium">{dept.name}</p>
             {selectedDept.includes(dept.name) && <BsCheck2 />}
           </button>
         ))}
       </form>
 
      )}
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>)

}


import { Menu as Dropdown } from '@headlessui/react'
import Signout from "./Signout";
import { user } from "@/app/Redux/features/userSlice";

export  const UserProfilePopOver=({avatar,width,right,top}:UserProfilePopoverProps)=>{
  const { data:user, isError,isLoading } = useQuery({queryKey:["getUser"],queryFn:getProfileApi});
  return (
    <div className={`relative ${!avatar&& "bg-slate-100 p-2 h-14"}`}>

      <Dropdown as="div" className={`relative `}>
        <div className={`relative ${!avatar&& "flex gap-10"}`}>
          <Dropdown.Button className="outline-none ring-0">
          <Avatar
                src={ " "}
                variant="circular"
                alt="image"
                className="w-[50px] h-[50px] bg-slate-400 rounded-full shadow-md object-contain uppercase text-xl "
              >
                {user?.UserName.slice(0,1)}
              </Avatar>
          </Dropdown.Button>
          {!avatar && 
          <p className="text-md text-gray-700 font-semibold self-center">
              {user.UserName}
          </p>
          }
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom=" opacity-0 "
          enterTo=" opacity-100 "
          leave="transition ease-in duration-75"
          leaveFrom=" opacity-100 "
          leaveTo=" opacity-0 "
        >
          <Dropdown.Items className="">
          <div
                className="bg-white   absolute  border rounded-md flex flex-col gap-3 z-20 "
                style={{ width: `${width}px`, top: `${top}px`, right: `${right}px` }}
              >
                {user && user.Verified && (
                  <>
                    {avatar && (
                      <div className="flex gap-4 p-2 border-b">
                        <Avatar
                          src={user?.Image || " "}
                          alt="profile pic"
                          className="w-[30px] h-[30px] bg-slate-400 rounded-full shadow-md"
                        >
                          {user.UserName?.slice(0, 1)}
                        </Avatar>
                        <h1 className="text-gray-700 text-sm font-semibold self-center ">
                          {user.UserName}
                        </h1>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      {user &&
                      user.Verified &&
                      (user.UserType === "Agent" || user.UserType === "Admin") ? (
                        <Dropdown.Item>
                          <Link
                            href={"/a/dashboard/default"}
                            className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
                            
                          >
                            Dashboard
                          </Link>
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item>
                          <Link
                            href={"/support/profile/edit"}
                            className="p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold"
                          >
                            My profile
                          </Link>
                        </Dropdown.Item>
                      )}
                    <Dropdown.Item>
                      <Signout/>
                      </Dropdown.Item>
                    </div>
                  </>
                )}
              </div>
          </Dropdown.Items>
        </Transition>
      </Dropdown>
    </div>
  )
}

