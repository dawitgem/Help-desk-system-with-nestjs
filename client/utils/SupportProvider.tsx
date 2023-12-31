"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { getProfile } from "@/app/Redux/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileApi } from "./QueryActions";

const SupportProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({ queryKey: ["getUser"], queryFn: getProfileApi });
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && isSuccess) dispatch(getProfile(user));
  }, [user]);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SupportProvider;
