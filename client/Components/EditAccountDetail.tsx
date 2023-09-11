import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { LiaTimesSolid } from "react-icons/lia";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface EditAccountProps {
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditAccountDetail({ Open, setOpen }: EditAccountProps) {
  const [disabled, setDisabled] = useState(true);
  const [alertError, setAlertError] = useState([false, false, false]);
  const [firstName, setFirstName] = useState("Abebe");
  const [LastName, setLastName] = useState("Wondwosen");
  const [Email, setEmail] = useState("abebewondwosen@gmail.com");
  const [Phone, setPhone] = useState("0913176534");

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();
    console.log(firstName, LastName, Email);
    if (firstName === "" && LastName === "" && Email === "") {
      console.log(firstName, LastName, Email);
      setAlertError([true, true, true]);
    } else if (firstName === "" && LastName && Email)
      setAlertError([true, false, false]);
    else if (firstName && LastName === "" && Email)
      setAlertError([false, true, false]);
    else if (firstName && LastName && Email === "")
      setAlertError([false, false, true]);
    else {
      setAlertError([false, false, false]);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
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
            onClick={handleClose}
          >
            <LiaTimesSolid />
          </button>
          <div className="bg-white w-full h-full py-5 px-10 flex flex-col gap-20">
            <div className="flex gap-5">
              <div className="flex">
                <IoPersonOutline className="text-2xl text-gray-700 " />
                <IoSettingsOutline className="text-md text-gray-700 self-center mt-3 -ml-1 border-2 border-white rounded-full" />
              </div>
              <h2 className="text-md text-gray-800 font-medium self-center">
                Edit Account Details
              </h2>
            </div>
            <form className="h-full flex flex-col" onSubmit={handleSubmission}>
              <label htmlFor="" className="text-gray-700 text-sm">
                First name{" "}
                <span className="mt-2 text-red-700 font-bold ">*</span>
              </label>
              <input
                type="text"
                className={` w-full p-2 text-sm text-gray-700 bg-slate-100 border-[0.5px] outline-[0.5px] outline-blue-700 hover:border-black rounded-md ${
                  alertError[0] ? "border-red-500" : "mb-5 border-gray-300"
                } `}
                value={firstName}
                onChange={(e) => {
                  setDisabled(false);
                  console.log(e.target.value);
                  setFirstName(e.target.value);
                }}
              />{" "}
              {alertError[0] && (
                <p className="mb-5 text-[12px] text-red-700">
                  This field can't be blank
                </p>
              )}
              <label htmlFor="" className="text-gray-700 text-sm">
                Last name{" "}
                <span className="mt-2 text-red-700 font-bold ">*</span>
              </label>
              <input
                type="text"
                className={` w-full p-2 text-sm text-gray-700 bg-slate-100 border-[0.5px] outline-[0.5px] rounded-md ${
                  alertError[1]
                    ? "border-red-500 outline-none"
                    : "mb-5 border-gray-300  outline-blue-700 hover:border-black "
                }`}
                value={LastName}
                onChange={(e) => {
                  setDisabled(false);
                  console.log(e.target.value);
                  setLastName(e.target.value);
                }}
              />{" "}
              {alertError[1] && (
                <p className="mb-5 text-[12px] text-red-700">
                  This field can't be blank
                </p>
              )}
              <label htmlFor="" className="text-gray-700 text-sm">
                Email
                <span className="mt-2 text-red-700 font-bold "> *</span>
              </label>
              <input
                type="text"
                className={` w-full p-2 text-sm text-gray-700 bg-slate-100 border-[0.5px] outline-[0.5px] outline-blue-700 hover:border-black rounded-md ${
                  alertError[2] ? "border-red-500" : "mb-5 border-gray-300"
                }`}
                value={Email}
                onChange={(e) => {
                  setDisabled(false);
                  console.log(e.target.value);
                  setEmail(e.target.value);
                }}
              />{" "}
              {alertError[2] && (
                <p className="mb-5 text-[12px] text-red-700">
                  This field can't be blank
                </p>
              )}
              <label htmlFor="" className="text-gray-700 text-sm">
                Phone
              </label>
              <input
                type="text"
                className={`mb-5 w-full p-2 text-sm text-gray-700  bg-slate-100 border-[0.5px] outline-[0.5px] outline-blue-700 hover:border-black rounded-md `}
                value={Phone}
                onChange={(e) => {
                  setDisabled(false);
                  console.log(e.target.value);
                  setPhone(e.target.value);
                }}
              />
              <div className="flex gap-5 absolute top-[90%] left-[80%]">
                <button
                  className="bg-slate-50  border border-gray-400 rounded-md text-sm text-gray-700 py-[6px] px-4 shadow-sm"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={`bg-[#10253e]  border rounded-md text-sm text-white py-1 px-3 shadow-sm ${
                    disabled
                      ? "opacity-60 cursor-not-allowed "
                      : "opacity-100 cursor-pointer"
                  }`}
                  disabled={disabled}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
