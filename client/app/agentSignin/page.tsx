"use client";
import React, { FormEvent, useEffect, useState } from "react";
import logo from "@/public/logo.svg";
import Image from "next/image";
import google from "@/public/asset/google.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signinSucess } from "../Redux/features/userSlice";
import { FaTimes } from "react-icons/fa";
import { BsBack } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import {
  AgentsigninSucess,
  AgentsigninWithGoogleStart,
  selectAgent,
} from "../Redux/features/agentSlice";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const AgentLogin = () => {
  const dispatch = useDispatch();
  const { agent, isAuth, error, Loading } = useSelector(selectAgent);
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [Error, setError] = useState({ email: false, password: false });
  const [ErrorMessage, setErrorMessage] = useState({ email: "", password: "" });

  const validateForm = () => {
    let valid = true;
    if (!formData.email && !formData.password) {
      setError((prevState) => ({ ...prevState, ["email"]: false }));
      setErrorMessage({
        email: "This field is required",
        password: "This field is required",
      });
      valid = false;
    }
    if (!formData.email && formData.password) {
      setError({ email: true, password: false });
      setErrorMessage({
        email: "This field is required",
        password: "This field is required",
      });
      console.log("come on man thisis stypid");
      valid = false;
    }
    if (!formData.password) {
      setError((prevState) => ({ ...prevState, ["password"]: true }));
      setErrorMessage({
        email: "This field is required",
        password: "This field is required",
      });
      valid = false;
    } else {
      setError({ email: false, password: false });
      setErrorMessage({
        email: " ",
        password: " ",
      });
    }
    return valid;
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) && !formData.password) {
      setError({ email: true, password: true });
      setErrorMessage((prevState) => {
        return { ...prevState, ["email"]: "Please enter valid email address" };
      });
      return false;
    }
    if (!emailRegex.test(formData.email) && formData.password) {
      setError({ email: true, password: false });
      setErrorMessage((prevState) => {
        return { ...prevState, ["email"]: "Please enter valid email address" };
      });
      return false;
    } else return true;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && validateEmail())
      dispatch(AgentsigninSucess(formData));
  };
  useEffect(() => {
    const CheckUser = () => {
      if (error) {
        setShowError(true);
      }
      if (isAuth && agent) router.push("/a/dashboard/default");
    };
    CheckUser();
  }, [agent, error]);
  console.log(agent, error);

  return (
    <div className="flex flex-col gap-8 justify-center align-middle bg-slate-100 pt-8">
      <div className="flex justify-center align-middle self-center">
        <Image
          src={logo}
          alt="logo"
          className="w-[50px] h-[50px] self-center "
        />
        <h2 className="md:text-neutral-600 font-medium text-xl self-center ">
          Kns Support
        </h2>
      </div>
      <div className="self-center text-gray-700 font-bold text-xl">
        <h1 className="">Sign in </h1>
      </div>
      {error && showError && (
        <div className="px-2 py-3 flex justify-between bg-red-100 border border-red-400 self-center rounded-md md:w-1/3">
          <p className="text-red-600 text-sm font-medium">{error}</p>
          <button onClick={() => setShowError(false)}>
            <FaTimes className="text-xl self-center text-gray-500" />
          </button>
        </div>
      )}
      <div className="w-2/5 bg-white shadow-md p-10 self-center flex flex-col rounded-lg">
        <form action="" onSubmit={handleSubmit} className="self-center w-full">
          {Loading && (
            <CircularProgress
              size={20}
              color="secondary"
              className="self-end"
            />
          )}
          <div className="flex flex-col gap-10">
            <button
              className={` w-full self-center bg-[#2260b7fa] p-3 px-5 flex gap-3 rounded-md ${
                Loading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer opacity-100 "
              }`}
              disabled={Loading}
              type="button"
              onClick={() => {
                console.log("come onman");
                dispatch(AgentsigninWithGoogleStart());
              }}
            >
              <Image
                src={google}
                alt="google logo"
                className="w-[20px] h-[20px]"
              />
              <p className="self-center text-white text-sm font-semibold">
                Sign in with Google
              </p>
            </button>
            <p className="self-center text-gray-700 text-lg">OR</p>
          </div>
          <ul className="flex flex-col gap-5">
            <li className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-700 font-medium">
                Email
              </label>
              <input
                type="text"
                disabled={Loading}
                className={`p-3 text-gray-600 border w-full rounded-md ${
                  Error.email
                    ? "border-red-500 outline-none"
                    : "outline-blue-500 hover:border-black "
                }  placeholder:text-sm  ${
                  Loading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer opacity-100 "
                }`}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, ["email"]: e.target.value };
                  });
                }}
                onFocus={() => {
                  if (!formData.password && Error.email)
                    setError({ email: false, password: true });
                  else setError({ ...Error, email: false });
                }}
              />
              {Error.email && (
                <p className="text-red-600 text-[12px]">{ErrorMessage.email}</p>
              )}
            </li>
            <li className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                disabled={Loading}
                className={`p-3 text-gray-600 border w-full rounded-md ${
                  Error.password
                    ? "border-red-500 outline-none"
                    : "outline-gray-200 "
                }  placeholder:text-sm   ${
                  Loading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer opacity-100 "
                }`}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, ["password"]: e.target.value };
                  });
                }}
                onFocus={() => {
                  if (!formData.email && Error.password)
                    setError({ email: true, password: false });
                  else setError({ ...Error, password: false });
                }}
              />
              {Error.password && (
                <p className="text-red-600 text-[12px]">
                  This field is required
                </p>
              )}
            </li>
            <li className="flex justify-between">
              <Link
                href={"/support/login"}
                className="text-blue-700 hover:text-black text-[13px] flex gap-2"
              >
                <BiArrowBack className="text-gray-800 text-lg" />
                <p className="text-sm font-bold text-gray-800">Back</p>
              </Link>

              <Link
                href={""}
                className="text-blue-700 hover:text-black text-[13px]"
              >
                forget password?
              </Link>
            </li>
            <button
              disabled={Loading}
              className={`bg-[#063750] text-white p-3 text-sm rounded-md ${
                Loading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer opacity-100 "
              }`}
            >
              sign in
            </button>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default AgentLogin;
