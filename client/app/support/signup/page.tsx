"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import FcGoogle from "react-icons/fc";
import google from "@/public/asset/google.svg";
import Link from "next/link";
import {
  selectUser,
  signinSucess,
  signupStart,
  signupSucess,
} from "@/app/Redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { Checkbox, CircularProgress } from "@mui/material";
import { validatePassword } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { SignUpApi } from "@/utils/QueryActions";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { user, isAuth, error, Loading } = useSelector(selectUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [Error, setError] = useState({
    email: false,
    fullname: false,
    password: false,
    confirmPassword: false,
  });
  const [ErrorMessage, setErrorMessage] = useState({
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const mutation=useMutation({
    mutationKey:["SignupUser"],mutationFn:(data:any)=>SignUpApi(data),
    onSuccess:(data)=>{
      console.log(data)
    }
  })

  const validateForm = () => {
    let valid = true;
    if (!formData.email) {
      setError((prevState) => ({ ...prevState, email: true }));
      setErrorMessage((prevState) => ({
        ...prevState,
        email: "This field is required",
      }));
      valid = false;
    }
    if (!formData.fullname) {
      setError((prevState) => ({ ...prevState, fullname: true }));
      setErrorMessage((prevState) => {
        return { ...prevState, fullname: "This field is required" };
      });
      valid = false;
    }

    return valid;
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) && !formData.fullname) {
      setError((prevState) => {
        return { ...prevState, email: true, fullname: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, email: "Please enter valid email address" };
      });
      return false;
    }
    if (!emailRegex.test(formData.email) && formData.fullname) {
      setError((prevState) => {
        return { ...prevState, email: true, fullname: false };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, email: "Please enter valid email address" };
      });
      return false;
    } else return true;
  };
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=.#$%^*()-_+/><,"'])[A-Za-z\d@$!%*?&=.#$%^*()-_+/><,"']{8,}$/;

    let valid = true;
    if (!formData.password) {
      setError((prevState) => ({
        ...prevState,
        password: true,
      }));
      setErrorMessage((prevState) => {
        return { ...prevState, password: "This field is required" };
      });
      valid = false;
    }
    if (!formData.confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPassword: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        confirmPassword: "This field is required",
      }));
      valid = false;
    }
    if (formData.password && passwordRegex.test(formData.password) === false) {
      setError((prevState) => ({
        ...prevState,
        password: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        password:
          "invalid password Pattern . it must include {atleaset 8 characters,A-Z,0-9,special character}",
      }));
      valid = false;
    }
    if (
      formData.password &&
      passwordRegex.test(formData.password) &&
      formData.confirmPassword &&
      formData.password != formData.confirmPassword
    ) {
      setError((prevState) => ({
        ...prevState,
        confirmPassword: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        confirmPassword: "Password doesn't match",
      }));
      valid = false;
    }

    return valid;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && validateEmail() && validatePassword())
      mutation.mutate(formData)
  };
  useEffect(() => {
    const CheckUser = () => {
      if (mutation.isError) {
        setShowError(true);
      }
      if (mutation.isSuccess&&mutation.data)
        router.push("/verifyEmail");

      if (isAuth && user && user.Verified === true) router.push("/support");
    };
    CheckUser();
  }, [mutation.data, mutation.error]);
  console.log(user);
  return (
    <div className="py-10 w-full border-t flex flex-col gap-2 justify-center align-middle  ">
      {mutation.isError && showError && (
        <div className="px-2 py-3 flex justify-between bg-red-100 border border-red-400 self-center rounded-md md:w-1/3">
          <p className="text-red-600 text-sm font-medium">{mutation.error.message}</p>
          <button onClick={() => setShowError(false)}>
            <FaTimes className="text-xl self-center text-gray-500" />
          </button>
        </div>
      )}
      <div className="self-center bg-white md:w-1/3 w-[90%] p-6 flex flex-col gap-5 shadow-md rounded-md border">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="text-gray-700 text-2xl font-black">
              Sign up for Kns support portal
            </h1>
            {mutation.isPending && (
              <CircularProgress size={20} thickness={4} color="secondary" />
            )}
          </div>
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
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
          id="signupForm"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullname"
              className="text-gray-600 text-sm font-semibold"
            >
              Full name
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              id="fullname"
              disabled={mutation.isPending}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                Error.fullname
                  ? "border-red-500 outline-none"
                  : "outline-blue-500 hover:border-black "
              }  placeholder:text-sm   ${
                mutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              } `}
              onChange={(e) => {
                setFormData((prevState) => {
                  return { ...prevState, fullname: e.target.value };
                });
              }}
              onFocus={() => {
                setError((prevState) => {
                  return { ...prevState, fullname: false };
                });
              }}
              placeholder="Full name"
            />
            {Error.fullname && (
              <p className="text-red-600 text-[12px]">
                {ErrorMessage.fullname}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signUpEmail"
              className="text-gray-600 text-sm font-semibold"
            >
              Email
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type="text"
              id="signUpEmail"
              disabled={mutation.isPending}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                Error.email
                  ? "border-red-500 outline-none"
                  : "outline-blue-500 hover:border-black "
              }  placeholder:text-sm ${
                mutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              onChange={(e) => {
                setFormData((prevState) => {
                  return { ...prevState, email: e.target.value };
                });
              }}
              onFocus={() => {
                setError((prevState) => {
                  return { ...prevState, email: false };
                });
              }}
              placeholder="Email"
            />
            {Error.email && (
              <p className="text-red-600 text-[12px]">{ErrorMessage.email}</p>
            )}
          </div>{" "}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signupPassword"
              className="text-gray-600 text-sm font-semibold"
            >
              password
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="signupPassword"
              disabled={mutation.isPending}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                Error.password
                  ? "border-red-500 outline-none"
                  : "outline-blue-500 hover:border-black "
              }  placeholder:text-sm  ${
                mutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              onChange={(e) => {
                setFormData((prevState) => {
                  return { ...prevState, password: e.target.value };
                });
              }}
              onFocus={() => {
                setError((prevState) => {
                  return { ...prevState, password: false };
                });
              }}
              placeholder="Password"
            />
            {Error.password && (
              <p className="text-red-600 text-[12px]">
                {ErrorMessage.password}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmpassword"
              className="text-gray-600 text-sm font-semibold"
            >
              confirm password
              <span className="text-red-600 font-bold text-lg self-center ml-2">
                *
              </span>
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="confirmpassword"
              disabled={mutation.isPending}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                Error.confirmPassword
                  ? "border-red-500 outline-none"
                  : "outline-blue-500 hover:border-black "
              }  placeholder:text-sm  ${
                mutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              onChange={(e) => {
                setFormData((prevState) => {
                  return { ...prevState, confirmPassword: e.target.value };
                });
              }}
              onFocus={() => {
                setError((prevState) => {
                  return { ...prevState, confirmPassword: false };
                });
              }}
              placeholder="Confirm password"
            />
            {Error.confirmPassword && (
              <p className="text-red-600 text-[12px]">
                {ErrorMessage.confirmPassword}
              </p>
            )}
          </div>
          <li className="flex gap-2 text-sm text-gray-700 font-semibold  ">
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <p className="self-center">Show Password</p>
          </li>
          <button
            className={`bg-[#063750] text-white p-3 text-sm rounded-md ${
              mutation.isPending
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer opacity-100"
            }`}
          >
            Register
          </button>
        </form>
        <div className="self-center flex gap-1 mt-10 ">
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

export default SignUpPage;
