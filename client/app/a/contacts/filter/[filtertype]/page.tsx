"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import React, { useMemo, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { BsSearch, BsTrash } from "react-icons/bs";
import { FormControlLabel } from "@mui/material";
import dynamic from "next/dynamic";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const contacts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ContactsFilterPage = () => {
  const [checked, setChecked] = useState(contacts.map((contact) => false));

  const FetchedContacts = useMemo(
    () => dynamic(() => import("@/Components/FetchedContacts"), { ssr: false }),
    []
  );
  return (
    <div>
      <NavbarAgent
        currentPage="All contacts"
        link={[
          { name: "admin", href: "" },
          { name: "admin", href: "" },
        ]}
      />
      <div className="sticky z-[1] top-14 p-4 h-14 bg-slate-50 border flex justify-between">
        <div className="flex justify-between">
          <div className="flex gap-3 justify-center align-middle">
            <FormControlLabel
              label=""
              control={
                <Checkbox
                  checked={!checked.includes(false)}
                  onChange={(event) => {
                    setChecked(contacts.map((contact) => event.target.checked));
                  }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      border: "none",
                      fontSize: 18,
                    },
                  }}
                  className=" text-gray-300 text-sm"
                />
              }
            />
            <p className="self-center text-sm text-gray-600">Select all</p>

            {checked.includes(true) ? (
              <button className="self-center border border-gray-300  flex justify-center align-middle gap-1 p-2 h-8  text-gray-800 bg-slate-100 hover:bg-slate-200 rounded-md ">
                <BsTrash className="self-center text-[12px]" />
                <p className="self-center text-sm ">Delete</p>
              </button>
            ) : (
              <form className="self-center flex border h-10 bg-white  gap-1 focus:outline-blue-500 rounded-md hover:border-gray-900 relative">
                <BsSearch className="text-[13px] absolute left-1 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search all Contacts"
                  className="placeholder:text-sm  p-4 pl-6 rounded-md outline-blue-600"
                />
              </form>
            )}
          </div>
        </div>
      </div>
      <FetchedContacts
        setChecked={setChecked}
        checked={checked}
        contacts={contacts}
      />
    </div>
  );
};

export default ContactsFilterPage;
