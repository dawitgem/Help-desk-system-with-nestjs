"use client";
import React, { FormEvent, useState } from "react";
import logo from "@/public/logo.svg";
import Image from "next/image";
import google from "@/public/asset/google.svg";
import Link from "next/link";

const AgentLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [Error, setError] = useState({ email: false, password: false });
  const validateForm = () => {
    let valid = true;
    if (!formData.email) {
      setError((prevState) => ({ ...prevState, ["email"]: false }));
      valid = false;
    }
    if (!formData.password) {
      setError((prevState) => ({ ...prevState, ["password"]: true }));
      valid = false;
    } else setError({ email: false, password: false });
    return valid;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) console.log("come on man");
  };
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
      <div className="w-2/5 bg-white shadow-md p-10 self-center flex flex-col rounded-lg">
        <form action="" onSubmit={handleSubmit} className="self-center w-full">
          <div className="flex flex-col gap-10">
            <button
              className=" w-full self-center bg-[#2260b7fa] p-3 px-5 flex gap-3 rounded-md "
              type="button"
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
                className={`p-3 text-gray-600 border w-full rounded-md ${
                  Error.email
                    ? "border-red-500 outline-none"
                    : "outline-blue-500 hover:border-black "
                }  placeholder:text-sm `}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, ["email"]: e.target.value };
                  });
                }}
                onFocus={() => {
                  if (!formData.password)
                    setError({ email: false, password: true });
                  else setError({ ...Error, email: false });
                }}
              />
              {Error.email && (
                <p className="text-red-600 text-[12px]">
                  This field is required
                </p>
              )}
            </li>
            <li className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                className={`p-3 text-gray-600 border w-full rounded-md ${
                  Error.password
                    ? "border-red-500 outline-none"
                    : "outline-gray-200 "
                }  placeholder:text-sm `}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, ["password"]: e.target.value };
                  });
                }}
                onFocus={() => {
                  if (!formData.email)
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
            <li className="self-end">
              <Link
                href={""}
                className="text-blue-700 hover:text-black text-[13px]"
              >
                forget password?
              </Link>
            </li>
            <button className="bg-[#063750] text-white p-3 text-sm rounded-md">
              sign in
            </button>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default AgentLogin;
