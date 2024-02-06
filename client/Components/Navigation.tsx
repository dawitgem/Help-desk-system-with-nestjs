"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'


const  Navigation = ({ NavLinks }: any) => {
  
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
                    ? "bg-[#186085] text-white font-medium text-[17px]"
                    : "hover:bg-white text-[17px] text-gray-700 font-medium "
                } p-4  `}
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
export default Navigation
