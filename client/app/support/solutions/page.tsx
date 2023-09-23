import { PiStackBold } from "react-icons/pi";
import { BsFolder2Open, BsFillFileEarmarkTextFill } from "react-icons/bs";

import React from "react";
import Link from "next/link";
import PageHero from "@/Components/PageHero";

const SolutionsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHero
        pageTitle=" Knowledge base"
        currentLink="knowledgebase"
        Links={[{ link: "Home", href: "/support/" }]}
      />
      <div className="md:p-20 p-10 ">
        <div className="md:p-20 bg-white shadow-lg rounded-lg flex flex-col md:gap-2 gap-1 overflow-x-clip">
          <div className="flex md:gap-5 gap-2 border-b p-2 ">
            <PiStackBold className=" self-center text-5xl text-gray-700 " />
            <div>
              <Link
                href={"./solutions/1213123"}
                className="md:text-2xl text-lg text-gray-600 font-semibold"
              >
                Category name
              </Link>
              <p className="text-md text-gray-600">category description</p>
            </div>
          </div>

          <div className="flex gap-5 pl-5 py-5">
            <BsFolder2Open className="text-3xl text-gray-500" />

            <Link
              href={"./solutions/folders/2328394"}
              className="md:text-xl text-lg text-gray-600 font-semibold"
            >
              Folder name
            </Link>
          </div>
          <div className="flex md:gap-5 gap-3 pl-10 py-4">
            <BsFillFileEarmarkTextFill className="text-2xl text-gray-500" />
            <Link
              href={"./solutions/articles/230840293"}
              className="text-blue-600 hover:text-black"
            >
              Article title
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
