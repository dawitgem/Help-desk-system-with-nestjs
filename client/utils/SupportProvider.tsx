import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import React, { ReactNode, useEffect } from "react";

const SupportProvider = ({ children }: { children: ReactNode }) => {
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SupportProvider;
