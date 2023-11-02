"use client";
import {
  getProfile,
  getProfileStart,
  selectUser,
} from "@/app/Redux/features/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import verifyEmail from "@/public/asset/verifyEmail.png";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import dotenv from "dotenv";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
dotenv.config();

const api =
  process.env.NEXT_PUBLIC_REACT_ENV === "PRODUCTION"
    ? "https://kns-support-api.onrender.com"
    : "http://localhost:8000";
const page = () => {
  const { user, error, isAuth, Loading } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(api);
    const socket = io(api);
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("emailConfirmed", (message: any) => {
      const [userId, AccessToken, RefreshToken] = message;
      console.log(AccessToken, RefreshToken);

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 15 * 60 * 1000),
        path: "/",
      };
      const cookieOptions2 = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000),
        path: "/",
      };
      const cookieString = `access_token=${AccessToken}; expires=${cookieOptions.expires.toUTCString()}; path=${
        cookieOptions.path
      }; sameSite=None ; secure=true`;
      const cookieString2 = `refresh_token=${RefreshToken}; expires=${cookieOptions.expires.toUTCString()}; path=${
        cookieOptions.path
      }; sameSite=None ; secure=true`;
      document.cookie = cookieString;
      document.cookie = cookieString2;
      console.log("AccessToken:" + Cookies.get("access_token"));

      dispatch(getProfileStart());
    });

    return () => {
      socket.off("emailConfirmed");
    };
  }, []);
  useEffect(() => {
    if (user && user.Verified === true) router.push("/support/");
  }, [user]);
  console.log(user);
  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center align-middle md:bg-gradient-radial md:from-cyan-50 from-10% via-slate-200 via-30% md:to-slate-100 ">
      <div className="self-center w-1/2 h-2/3 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-3xl font-semibold text-gray-400 self-center">
          Verify your Email
        </h2>
        <p className="text-md font-medium text-gray-400 self-center">
          check your email and click the link provided to activate your account
        </p>
        <Image
          src={verifyEmail}
          alt="verify email"
          width={100}
          height={100}
          className="w-[50%] h-[70%] self-center"
        />
      </div>
    </div>
  );
};

export default page;
