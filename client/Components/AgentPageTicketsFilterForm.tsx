import React from "react";

const AgentPageTicketsFilterForm = () => {
  const [age, setAge] = React.useState("");

  return (
    <div className=" flex flex-col flex-[1] bg-slate-50 border shadow-sm h-[calc(100vh-112px)]  overflow-auto p-5">
      <p className="text-gray-700 font-normal">Filters</p>
      <br />
      <form action="" className="flex flex-col gap-3">
        <label className="text-gray-700 text-sm">Departments</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">Agents</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">Created at</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">Closed at</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">Resolved at</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">Resolution due</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">status</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">Priority</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
        <label className="text-gray-700 text-sm">Source</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />{" "}
        <label className="text-gray-700 text-sm">Contacts</label>
        <input
          type="text"
          placeholder="Department"
          className="outline-none focus:outline focus:outline-blue-500 border border-gray-500 hover:border-gray-900 focus:border-none rounded-sm p-2 placeholder:text-sm "
        />
      </form>
    </div>
  );
};

export default AgentPageTicketsFilterForm;
