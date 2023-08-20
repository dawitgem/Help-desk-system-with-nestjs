"use client";
import React from "react";
import Home from "./support/page";
import { useRouter } from "next/navigation";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
const Page = () => {
  return (
    <>
      <Header />
      <Home />;
      <Footer />
    </>
  );
};

export default Page;
