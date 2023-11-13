"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import FcGoogle from "react-icons/fc";
import google from "@/public/asset/google.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  signInWithGoogleSucess,
  signinStart,
  signinSucess,
  signinWithGoogleStart,
} from "@/app/Redux/features/userSlice";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, isAuth, error, Loading } = useSelector(selectUser);
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
      setError((prevState) => ({ ...prevState, ["email"]: false }));
      setErrorMessage({
        email: "This field is required",
        password: "This field is required",
      });
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
    if (validateForm() && validateEmail()) dispatch(signinStart(formData));
  };
  const router = useRouter();
  useEffect(() => {
    const CheckUser = () => {
      if (error) {
        setShowError(true);
      }
      if (isAuth && user && user.Verified === false)
        router.push("/verifyEmail");
      if (isAuth && user && user?.Verified === true) router.push("/support");
    };
    CheckUser();
  }, [user, error]);
  console.log(user?.Verified);
  return (
    <div className="py-10  w-full border-t flex flex-col gap-3 justify-center align-middle  ">
      {error && showError && (
        <div className="px-2 py-3 flex justify-between bg-red-100 border border-red-400 self-center rounded-md md:w-1/3">
          <p className="text-red-600 text-sm font-medium">{error}</p>
          <button onClick={() => setShowError(false)}>
            <FaTimes className="text-xl self-center text-gray-500" />
          </button>
        </div>
      )}
      <div className="bg-white md:w-1/3 w-[90%] p-6 flex flex-col gap-5 shadow-md rounded-md border self-center">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="text-gray-700 text-2xl font-black">
              {" "}
              Log in to Kns support portal
            </h1>
            {Loading && (
              <CircularProgress size={20} thickness={4} color="secondary" />
            )}
          </div>
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
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
          id="loginForm"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="Email"
              className="text-gray-600 text-sm font-semibold"
            >
              Email Address
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              id="Email"
              disabled={Loading}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                Error.email
                  ? "border-red-500 outline-none"
                  : "outline-gray-200 "
              }  placeholder:text-sm   ${
                Loading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              placeholder="Your Email Address"
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
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signinPassword"
              className="text-gray-600 text-sm font-semibold"
            >
              Password
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="password"
              id="signinPassword"
              disabled={Loading}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                Error.password
                  ? "border-red-500 outline-none"
                  : "outline-gray-200 "
              }  placeholder:text-sm     ${
                Loading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              placeholder="password"
              onChange={(e: any) => {
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
              <p className="text-red-600 text-[12px]">This field is required</p>
            )}
          </div>
          <button
            className={`bg-[#063750] text-white p-3 text-sm rounded-md ${
              Loading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer opacity-100"
            }`}
            disabled={Loading}
          >
            Log in
          </button>
        </form>
        <p className="self-center text-[12px] text-gray-500">
          ... or login with
        </p>
        <button
          className={` w-[75%] self-center bg-[#2260b7fa] p-3 px-5 flex gap-3 rounded-md ${
            Loading
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer opacity-100"
          }`}
          type="button"
          onClick={() => {
            dispatch(signinWithGoogleStart());
          }}
        >
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
            href={"/agentSignin"}
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
