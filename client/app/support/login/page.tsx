"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import google from "@/public/asset/google.svg";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SigninApi, SigninWithGoogleApi, getProfileApi } from "@/utils/QueryActions";
import { GoogleAuthWithFirebase } from "@/utils/Helperfunctions";
import {z} from 'zod'
import { FieldError, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryclient } from "@/utils/Provider";

const LoginSchema=z.object({
  email: z
  .string()
  .email('Invalid email format').min(1,"Email required"),
password: z
  .string().min(1,"Password required")
})



const LoginPage = () => {
  const {data:user,isError}=useQuery({queryKey:["getUser"],queryFn:getProfileApi})
  const { register, handleSubmit , formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema),
    mode:"onBlur"
  });
  const mutation  = useMutation({
    mutationKey: ["Signin user"],
    mutationFn: async ({ data }: any) => await SigninApi(data),     
    onSuccess: async (data) => {
        await queryclient.refetchQueries({
          queryKey:["getUser"]
        })
    },
  });
  const googleMutation = useMutation({
    mutationKey: ["google signin "],
    mutationFn: async ( data:any ) =>await SigninWithGoogleApi(data),   
      onSuccess: async () => {
        await queryclient.refetchQueries({
          queryKey:["getUser"]
        })
    },});
  const [showError, setShowError] = useState(false);

  
  const onSubmit = (data:any) => {
    mutation.mutate({data})
  };
  if(user)
     redirect("/support")
  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      redirect("/support")};
    if (mutation.isError) {
      setShowError(true);
    }
  }, [mutation]);

  useEffect(() => {
    if (googleMutation.isSuccess && googleMutation.data){        
      redirect("/support")};
    if (googleMutation.isError) {
      setShowError(true);
    }
  }, [googleMutation, googleMutation]);

  return (
    <div className="py-10  w-full border-t flex flex-col gap-3 justify-center align-middle  ">
      {mutation.isError && showError && (
        <div className="px-2 py-3 flex justify-between bg-red-100 border border-red-400 self-center rounded-md md:w-1/3">
          <p className="text-red-600 text-sm font-medium">
            {mutation.error?.message}
          </p>
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
            {mutation.isPending && (
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
          method="POST"
          className="flex flex-col gap-3"
          onSubmit={ handleSubmit(onSubmit)}
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
              {...register("email")}
              disabled={mutation.isPending}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                errors.email
                  ? "border-red-500 outline-none"
                  : "outline-gray-200 "
              }  placeholder:text-sm   ${
                mutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              placeholder="Your Email Address"
            />
            {errors.email  && (
  <p className="text-red-600 text-[12px]">{errors.email.message as string}</p>
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
              {...register("password")}
              disabled={mutation.isPending}
              className={`p-3 text-gray-600 border w-full rounded-md ${
                errors.password
                  ? "border-red-500 outline-none"
                  : "outline-gray-200 "
              }  placeholder:text-sm  disabled:cursor-not-allowed opacity-50"
                  
              `}
              placeholder="password"              
            />
            {errors.password && (
              <p className="text-red-600 text-[12px]">This field is required</p>
            )}
          </div>
          <button
            className={`bg-[#063750] text-white p-3 text-sm rounded-md 
                 disabled:cursor-not-allowed opacity-50"
            `}
            disabled={mutation.isPending}
          >
            Log in
          </button>
        </form>
        <p className="self-center text-[12px] text-gray-500">
          ... or login with
        </p>
        <button
          className={` w-[75%] self-center bg-[#2260b7fa] p-3 px-5 flex gap-3 rounded-md 
              disabled:cursor-not-allowed opacity-50"
          `}
          type="button"
          onClick={async() => {
            const {
              displayName: FullName,
              phoneNumber: MobilePhone,
              photoURL: Image,
              email: Email,
            } = await GoogleAuthWithFirebase()
            googleMutation.mutate({FullName,MobilePhone,Image,Email})
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
