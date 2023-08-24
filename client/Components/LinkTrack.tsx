import React from "react";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";

interface LinkTrackProps {
  Links: any;
  currentLink: string;
}

const LinkTrack = ({ Links, currentLink }: LinkTrackProps) => {
  return (
    <div className="md:flex  flex flex-wrap ">
      {Links.map((link: any, i: number) => (
        <div className="flex  gap-1" key={i}>
          <Link href={link.href} className="text-white underline ">
            {link.link}
          </Link>
          <BsFillPlayFill className="text-slate-300 mt-1 " />
        </div>
      ))}
      <p className="text-white text-md md:hidden  ">{currentLink}</p>
    </div>
  );
};

export default LinkTrack;
