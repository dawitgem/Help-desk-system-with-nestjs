"use client";
import Link from "next/link";

import React from "react";
import { CgMenuRight } from "react-icons/cg";
import { usePathname } from "next/navigation";

const Navigation = ({ NavLinks }: any) => {
  const pathname = usePathname();

  return (
    <>
      {NavLinks.map((link: any, i: any) => {
        const isActive = pathname.replace("/support/", "/");

        return (
          <li className="mt-4" key={i}>
            <Link
              className={`${
                isActive.includes(link.href.replace("/support/", "/"))
                  ? "bg-[#186085] text-white"
                  : "hover:bg-white "
              } p-4  text-lg`}
              href={link.href}
            >
              {link.link}
            </Link>
          </li>
        );
      })}
    </>
  );
};
const Navbar = () => {
  const user = true;
  return (
    <div className="md:p-0 p-4">
      <nav className="hidden lg:block">
        <ul className="flex gap-10 pt-[10px]">
          <Navigation
            NavLinks={[
              { link: "Home", href: "/support" },
              { link: "Knowledgebase", href: "/support/solutions" },
            ]}
          />

          {user ? (
            <>
              <Navigation
                NavLinks={[{ link: "Ticket", href: "/support/tickets" }]}
              />
              <li className="mt-4 ">
                <Link
                  href="/support/tickets/new"
                  className=" p-3 border  bg-white  rounded-lg"
                >
                  Submit ticket
                </Link>
              </li>
              <button className="w-[50px] h-[50px]  rounded-full bg-slate-500"></button>
            </>
          ) : (
            <>
              <li className="mt-4 ">
                <Link
                  href="/support/tickets/new"
                  className=" p-3 border  bg-white  rounded-lg"
                >
                  Submit Ticket
                </Link>
              </li>
              <div className="flex divide-x divide-black gap-3">
                <li className="mt-4">
                  <Link className="p-4 text-lg" href={"/support/login"}>
                    Login
                  </Link>
                </li>
                <li className="mt-4">
                  <Link className="p-4 text-lg ml-2" href={"/support/signup"}>
                    Sign up
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
      <button className="lg:hidden   text-2xl mt-6   ">
        <CgMenuRight />
      </button>
    </div>
  );
};

export default Navbar;
