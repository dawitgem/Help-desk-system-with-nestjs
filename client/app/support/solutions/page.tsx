import Searchbox from "@/Components/Searchbox";
import { PiStackBold } from "react-icons/pi";
import { BsFolder2Open } from "react-icons/bs";

import React from "react";

const SolutionsPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-[#063750] h-[250px]">
        <div>
          <Searchbox />
        </div>
      </div>
      <div className="p-20">
        <div className="p-20 bg-white shadow-lg rounded-lg flex flex-col divide-y gap-5">
          <div className="flex gap-5">
            <PiStackBold className=" self-center text-5xl text-gray-700 " />
            <div>
              <h1 className="text-2xl text-gray-600 font-semibold">
                Category name
              </h1>
              <p className="text-md text-gray-600">category description</p>
            </div>
          </div>
          <div className="flex gap-5 pl-10 py-5">
            <BsFolder2Open className="text-3xl text-gray-500" />
            <div>
              <h1 className="text-xl text-gray-600 font-semibold">
                Folder name
              </h1>
              <p className="text-md text-gray-600">category description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
