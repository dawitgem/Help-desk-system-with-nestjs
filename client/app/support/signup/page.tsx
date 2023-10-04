"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import FcGoogle from "react-icons/fc";
import google from "@/public/asset/google.svg";
import Link from "next/link";
import {
  selectUser,
  signinSucess,
  signupSucess,
} from "@/app/Redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { user, isAuth, error } = useSelector(selectUser);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({ fullname: "", email: "" });
  const [Error, setError] = useState({ email: false, fullname: false });
  const [ErrorMessage, setErrorMessage] = useState({
    email: "",
    fullname: "",
  });
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    if (!formData.email) {
      setError((prevState) => ({ ...prevState, ["email"]: true }));
      setErrorMessage({
        email: "This field is required",
        fullname: "This field is required",
      });
      valid = false;
    }
    if (!formData.fullname && formData.email) {
      setError((prevState) => ({ ...prevState, ["fullname"]: true }));
      setErrorMessage({
        email: "This field is required",
        fullname: "This field is required",
      });
      valid = false;
    }
    if (!formData.fullname && !formData.email) {
      setError((prevState) => ({ ...prevState, ["fullname"]: false }));
      setErrorMessage({
        email: "This field is required",
        fullname: "This field is required",
      });
      valid = false;
    }

    return valid;
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) && !formData.fullname) {
      setError({ email: true, fullname: true });
      setErrorMessage((prevState) => {
        return { ...prevState, ["email"]: "Please enter valid email address" };
      });
      return false;
    }
    if (!emailRegex.test(formData.email) && formData.fullname) {
      setError({ email: true, fullname: false });
      setErrorMessage((prevState) => {
        return { ...prevState, ["email"]: "Please enter valid email address" };
      });
      return false;
    } else return true;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && validateEmail()) dispatch(signupSucess(formData));
  };
  useEffect(() => {
    const CheckUser = () => {
      if (error) {
        console.log("come on man this is from signup page");
        setShowError(true);
      }
      if (isAuth && user) router.push("/support");
    };
    CheckUser();
  }, [user, error]);
  return (
    <div className="pt-10 w-full border-t flex justify-center align-middle  ">
      {error && showError && (
        <div className="px-2 py-3 flex justify-between bg-red-100 border border-red-400 self-center rounded-md md:w-1/3">
          <p className="text-red-600 text-sm font-medium">{error}</p>
          <button onClick={() => setShowError(false)}>
            <FaTimes className="text-xl self-center text-gray-500" />
          </button>
        </div>
      )}
      <div className="bg-white md:w-1/3 w-[90%] p-6 flex flex-col gap-5 shadow-md rounded-md border">
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
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-600 text-sm font-semibold">
              Full name
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              className={`p-3 text-gray-600 border w-full rounded-md ${
                Error.fullname
                  ? "border-red-500 outline-none"
                  : "outline-blue-500 hover:border-black "
              }  placeholder:text-sm `}
              onChange={(e) => {
                setFormData((prevState) => {
                  return { ...prevState, ["fullname"]: e.target.value };
                });
              }}
              onFocus={() => {
                if (!formData.email && Error.fullname)
                  setError({ email: true, fullname: false });
                else setError({ ...Error, fullname: false });
              }}
              placeholder="Full name"
            />
            {Error.fullname && (
              <p className="text-red-600 text-[12px]">{ErrorMessage.email}</p>
            )}
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
                if (!formData.fullname && Error.email)
                  setError({ email: false, fullname: true });
                else setError({ ...Error, email: false });
              }}
              placeholder="Email"
            />
            {Error.email && (
              <p className="text-red-600 text-[12px]">{ErrorMessage.email}</p>
            )}
          </div>
          <button className="bg-[#063750] text-white p-3 text-sm rounded-md">
            Register
          </button>
        </form>
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

export default SignUpPage;
