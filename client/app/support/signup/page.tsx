import Image from "next/image";
import React from "react";
import FcGoogle from "react-icons/fc";
import google from "@/public/asset/google.svg";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="pt-10 w-full border-t flex justify-center align-middle  ">
      <div className="bg-white w-1/3 p-6 flex flex-col gap-5 shadow-md rounded-md border">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-700 text-2xl font-black">
            {" "}
            Sign up for Kns support portal
          </h1>
          <div className="flex gap-2 ">
            <p className="text-gray-400 font-semibold text-sm">
              Already a user ?
            </p>
            <Link
              href={"/support/login"}
              className="self-center text-sm font-semibold text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
        <form action="" className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-600 text-sm font-semibold">
              Full name
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              className="p-3 text-gray-600 border w-full rounded-md outline-gray-200  placeholder:text-sm "
              placeholder="Full name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-600 text-sm font-semibold">
              Email
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              className="p-3 text-gray-600 border w-full rounded-md outline-gray-200  placeholder:text-sm "
              placeholder="Email"
            />
          </div>
          <button className="bg-[#063750] text-white p-3 text-sm rounded-md">
            Register
          </button>
        </form>
        <div className="self-center flex gap-1 mt-10">
          <p className="text-lg font-semibold text-gray-600">
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

export default SignUpPage;
