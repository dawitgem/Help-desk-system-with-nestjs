import { Backdrop } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";

interface RecentActivitiesProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const RecentActivities = ({ open, setOpen }: RecentActivitiesProps) => {
  return (
    <div>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 10,
          width: "100%",
          height: "100vh",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          
        }}
        open={open}
      >
        <div className="flex   border-t-2 border-[#102034] w-1/2 h-full justify-self-end self-start">
          <button
            className="bg-[#102034] text-white text-xl p-[2px] w-[25px] h-[25px]"
            onClick={() => setOpen(false)}
          >
            <LiaTimesSolid />
          </button>
          <div className="bg-white w-full h-full py-5 px-10 flex flex-col gap-20">
            <div className="flex gap-5">
              <AiOutlineFieldTime className="text-3xl text-gray-700 self-center border-2 border-white rounded-full" />

              <h2 className="text-md text-gray-800 font-medium self-center">
                Recent Activities
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-b flex flex-col ">lskjdflaskdjf</div>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default RecentActivities;
