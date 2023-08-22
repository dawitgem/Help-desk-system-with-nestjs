import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-6 w-full bg-[#063750] md:flex align-middle justify-center gap-10 md:divide-x divide-white mt-auto ">
      <h1 className="md:text-xl text-slate-50  w-auto break-words">
        Kns help desk software
      </h1>
      <Link
        className="text-white hover:border-b md:pl-4 md:pt-1 pt-4 w-auto break-words "
        href="www.google.com"
      >
        developer Abebe Wondwosen
      </Link>
    </div>
  );
};

export default Footer;
