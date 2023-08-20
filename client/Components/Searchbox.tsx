// import { Search } from "@mui/icons-material";
import { Input } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import React from "react";

const Searchbox = () => {
  return (
    <div className="md:self-center bg-white md:w-[40%] md:h-[60px] h-[40px] rounded-lg flex  m-2">
      <input
        type="text"
        placeholder="search for solutions here ..."
        className="w-full h-full outline-none rounded-lg placeholder:text-xl pl-2 p-4"
      />
      <FaSearch className="text-xl text-gray-400 bg-slate-200 w-[60px] h-full rounded-lg p-4" />
    </div>
  );
};

export default Searchbox;
