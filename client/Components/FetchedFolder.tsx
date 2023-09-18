import Link from "next/link";
import React from "react";
import { BsFillFileEarmarkTextFill, BsFolder2Open } from "react-icons/bs";

interface FetchedFolderProps {
  Folders: any;
}
const FetchedFolder = ({ Folders }: FetchedFolderProps) => {
  return (
    <div className="md:p-20 p-8 flex flex-col gap-5">
      {Folders.map((folder: any, i: number) => (
        <div
          key={i}
          className="md:p-10 bg-white shadow-lg rounded-lg flex flex-col gap-2 overflow-x-clip w-[90%]"
        >
          <div className="flex gap-5 md:pl-10 pl-2 py-5">
            <BsFolder2Open className="text-3xl text-gray-500" />

            <Link
              href={`./folders/${folder.id}`}
              className="text-xl text-gray-600 font-semibold"
            >
              {folder.name}
            </Link>
          </div>
          <div className="flex gap-5 sm:pl-20 py-4">
            <div className="flex flex-col gap-3 divide-y w-full">
              {folder.article.map((article: any, c: number) => (
                <Link
                  key={c}
                  href={"./articles/230840293"}
                  className="text-blue-600 hover:text-black flex gap-4 p-3"
                >
                  <BsFillFileEarmarkTextFill className="text-2xl text-gray-500" />
                  <p>{article}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchedFolder;
