"use client";
import {
  Avatar,
  Backdrop,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import AgentInfo from "./AgentInfo";

interface AddAgentModalProps {
  open: boolean;
  checked: boolean[];
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const AddAgentModal = ({
  open,
  setChecked,
  checked,
  setOpen,
}: AddAgentModalProps) => {
  const [dept, setDept] = useState("5");
  return (
    <div>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          height: "100vh",
        }}
        open={open}
      >
        <div className="rounded-md bg-white flex flex-col gap-5 w-[60%] h-[95%]">
          <h1 className="font-medium text-2xl text-gray-700 p-5">Add agents</h1>
          <div className="flex border-t shadow-sm w-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-2 flex-[2]">
              <div className="flex gap-10 p-5">
                <Select
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-[200px] h-[40px] text-gray-700 text-sm"
                  value={dept}
                  onChange={(e: SelectChangeEvent) => setDept(e.target.value)}
                >
                  <MenuItem value={5}>All agents</MenuItem>
                  <MenuItem value={10}>Department 1</MenuItem>
                  <MenuItem value={20}>Department 2</MenuItem>
                  <MenuItem value={30}>Deoartment 3</MenuItem>
                </Select>
                <input
                  type="text"
                  className="p-2 flex-1 border rounded-md hover:border-black outline-blue-500 text-sm"
                  placeholder="Enter agents name or Email"
                />
              </div>
              <div className="flex flex-col gap-5 px-5">
                <div className="flex gap-2">
                  <Checkbox
                    checked={!checked.includes(false)}
                    onChange={(e) =>
                      setChecked(checked.map((check) => e.target.checked))
                    }
                    inputProps={{ "aria-label": "controlled" }}
                    className="text-gray-200"
                  />
                  <p className="text-md text-gray-600 font-medium self-center">
                    All agents
                  </p>
                </div>
                {checked.map((agent, i) => (
                  <div className="flex gap-2 hover:bg-slate-50 py-2">
                    <Checkbox
                      checked={checked[i]}
                      onChange={(e: any) =>
                        setChecked(
                          checked.map((check, c) => {
                            if (c === i) check = e.target.checked;
                            return check;
                          })
                        )
                      }
                      inputProps={{ "aria-label": "controlled" }}
                      className="text-gray-200 text-sm"
                    />
                    <AgentInfo />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 w-[40%] h-full flex flex-col  gap-5 p-5 ">
              <p className="text-[12px] text-gray-600">
                SELECTED AGENTS (
                {checked.reduce((count: number, currentValue: boolean) => {
                  if (currentValue === true) count++;
                  return count;
                }, 0)}
                )
              </p>
              {checked.map((agent, i) => {
                if (checked[i]) return <AgentInfo />;
              })}
            </div>
          </div>
          <div className="p-5 flex gap-10 self-end">
            <button
              className="text-sm text-gray-700 p-2 px-2 border bg-slate-50 rounded-md shadow-sm"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className=" bg-[#123e54] text-sm text-white p-2 px-2 border rounded-md shadow-sm "
              onClick={() => {
                setOpen(false);
              }}
            >
              Add to shift
            </button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default AddAgentModal;
