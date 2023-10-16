"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import LinearDeterminate from "@/Components/LinerProgress";
import { CircularProgress } from "@mui/material";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileStart, selectUser } from "../Redux/features/userSlice";
export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuth, error, Loading } = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = () => {
      dispatch(getProfileStart());
      console.log("this is not the best thing to me");
      console.log(user);
    };

    getProfile();
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
