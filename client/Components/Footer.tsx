import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-6 w-full bg-[#063750] flex align-middle justify-center gap-10 divide-x divide-white md:self-end">
      <h1 className="text-xl text-slate-50  ">Kns help desk software</h1>
      <Link
        className="text-white hover:border-b pl-4 pt-1"
        href="www.google.com"
      >
        developer Abebe Wondwosen
      </Link>
    </div>
  );
};

export default Footer;
