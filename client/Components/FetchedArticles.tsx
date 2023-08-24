import Link from "next/link";
import React from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
interface FetchedArticlesProps {
  Articles: any;
}
const FetchedArticles = ({ Articles }: FetchedArticlesProps) => {
  return (
    <div className="md:p-20 p-10 flex flex-col gap-5">
      {Articles.map((article: any, i: number) => (
        <div
          className="md:p-10 bg-white shadow-lg rounded-lg flex flex-col gap-2 overflow-x-clip"
          key={i}
        >
          <Link
            href={`../articles/${article.id}`}
            className="flex gap-5 pl-10 py-5 hover:bg-slate-50"
          >
            <BsFillFileEarmarkTextFill className="text-3xl text-gray-500" />
            <div className="md:flex w-full justify-between">
              <p className="text-blue-600  ">{article.title}</p>
              <p className="text-gray-400">
                created by abebe wondwosen,at 12 aug 2009 E.c
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FetchedArticles;
