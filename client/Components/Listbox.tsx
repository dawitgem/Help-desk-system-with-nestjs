"use client";
import { useState, Fragment, SetStateAction, Dispatch } from "react";
import { Listbox, Combobox } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
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
    <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
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
