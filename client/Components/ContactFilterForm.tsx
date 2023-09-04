import React, { useState } from "react";

const ContactFilterForm = () => {
  const [age, setAge] = useState("");

  return (
    <div className=" flex flex-col flex-[1] bg-slate-50 border shadow-sm h-[calc(100vh-112px)]  overflow-auto p-5">
      <form action="" className="flex flex-col gap-3">
        <p className="text-gray-700 font-normal">Filters</p>
        <br />
        <label className="text-gray-700 text-sm">Created</label>
        <input
          type="text"
          placeholder="any time"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <button className=" bg-blue-900 text-white text-md p-2 rounded-md">
          Apply
        </button>
      </form>
    </div>
  );
};

export default ContactFilterForm;
