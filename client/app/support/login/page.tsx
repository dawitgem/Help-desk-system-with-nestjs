import Image from "next/image";
import React from "react";
import FcGoogle from "react-icons/fc";
import google from "@/public/asset/google.svg";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="pt-10 w-full border-t flex justify-center align-middle  ">
      <div className="bg-white md:w-1/3 w-[90%] p-6 flex flex-col gap-5 shadow-md rounded-md border">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-700 text-2xl font-black">
            {" "}
            Log in to Kns support portal
          </h1>
          <div className="flex gap-2 ">
            <p className="text-gray-400 font-semibold text-sm">Are you New ?</p>
            <Link
              href={"/support/signup"}
              className="self-center text-sm font-semibold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
        <form action="" className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-600 text-sm font-semibold">
              Email Address
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              className="p-3 text-gray-600 border w-full rounded-md outline-gray-200  placeholder:text-sm "
              placeholder="Your Email Address"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-600 text-sm font-semibold">
              Password
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              className="p-3 text-gray-600 border w-full rounded-md outline-gray-200  placeholder:text-sm "
              placeholder="password"
            />
          </div>
          <button className="bg-[#063750] text-white p-3 text-sm rounded-md">
            Log in
          </button>
        </form>
        <p className="self-center text-[12px] text-gray-500">
          ... or login with
        </p>
        <button className=" w-[75%] self-center bg-[#2260b7fa] p-3 px-5 flex gap-3 rounded-md ">
          <Image src={google} alt="google logo" className="w-[20px] h-[20px]" />
          <p className="self-center text-white text-sm font-semibold">
            Sign in with Google
          </p>
        </button>
        <Link
          href=""
          className="text-blue-600 text-[13px] font-medium hover:underline text-center"
        >
          Forget your password ?
        </Link>
        <div className="self-center flex gap-1 mt-10">
          <p className="md:text-lg font-semibold text-gray-600">
            Are you an agent ?
          </p>
          <Link
            href={""}
            className="text-blue-600 text-lg font-semibold hover:underline"
          >
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
