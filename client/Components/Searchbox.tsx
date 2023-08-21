// import { Search } from "@mui/icons-material";
import { Input } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import React from "react";

interface SearchboxProps {
  width?: string;
  height?: string;
  postionStyle?: string;
  iconstyle?: string;
  inputstyle?: string;
}

const Searchbox = ({
  width,
  height,
  postionStyle,
  iconstyle,
  inputstyle,
}: SearchboxProps) => {
  return (
    <div
      className={`md:self-center bg-white ${width ? width : "md:w-[40%]"} ${
        height ? height : "md:h-[60px] h-[40px]"
      }  rounded-lg flex  m-2 ${postionStyle}`}
    >
      <input
        type="text"
        placeholder="search  here ..."
        className={`w-full h-full outline-none rounded-lg ${
          inputstyle ? inputstyle : "placeholder:text-xl"
        }  pl-2 p-4`}
      />
      <button>
        <FaSearch
          className={`text-xl text-gray-400 bg-slate-200 ${
            iconstyle ? iconstyle : "w-[60px]"
          } h-full rounded-lg p-4`}
        />
      </button>
    </div>
  );
};

export default Searchbox;
