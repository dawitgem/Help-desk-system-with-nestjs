"use client";
import React, { useEffect } from "react";
import Home from "./support/page";
import { redirect, useRouter } from "next/navigation";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
const Page = () => {
  useEffect(() => {
    redirect("/support");
  }, []);
  return (
    <>
      <Header />
      <Home />;
      <Footer />
    </>
  );
};

export default Page;
