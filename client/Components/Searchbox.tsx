"use client";
import {
  clearSearch,
  clearSearchStart,
  searchStart,
  selectSearch,
} from "@/app/Redux/features/searchSlice";
import { CircularProgress, Input } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
interface SearchboxProps {
  width?: string;
  height?: string;
  postionStyle?: string;
  iconstyle?: string;
  inputstyle?: string;
}

const options = [
  { label: "All", value: "all" },
  { label: "Articles", value: "solutions" },
  { label: "Tickets", value: "tickets" },
];

const Searchbox = ({
  width,
  height,
  postionStyle,
  iconstyle,
  inputstyle,
}: SearchboxProps) => {
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [SearchQuery, setSearchQuery] = useState("");
  const [SelecetedSearchType, setSelecetedSearchType] = useState("all");
  const SearchResultRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        SearchResultRef.current &&
        !SearchResultRef.current.contains(e.target as Node)
      ) {
        setOpenSearchResult(false);
      }
    };
    document.addEventListener("mousedown", (e: MouseEvent) => {
      handleClickOutside(e);
    });

    return document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (SearchQuery)
      router.push(`/support/search/${SelecetedSearchType}?term=${SearchQuery}`);
  };
  return (
    <div
      ref={SearchResultRef}
      className={`md:self-center bg-white relative md:mt-0 mt-3  ${
        width ? width : "md:w-[40%]"
      } ${
        height ? height : "md:h-[60px] h-[40px]"
      }  rounded-lg flex    ${postionStyle}`}
    >
      <form action="" className="flex w-full h-full" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search  here ..."
          className={`w-full h-full outline-none rounded-lg text-gray-700 ${
            inputstyle ? inputstyle : "placeholder:text-xl"
          }  pl-4 p-4`}
          onFocus={(e) => {
            setOpenSearchResult(true);
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>
          <BsSearch
            className={`text-3xl text-gray-700 bg-slate-200 ${
              iconstyle ? iconstyle : "md:w-[50px] w-[70px]"
            } h-full rounded-r-lg p-4`}
          />
        </button>
        {openSearchResult && (
          <SearchModal
            searchType={SelecetedSearchType}
            setAction={setSelecetedSearchType}
            searchQuery={SearchQuery}
          />
        )}
      </form>
    </div>
  );
};

export default Searchbox;

import Link from "next/link";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { set } from "firebase/database";
import axios from "axios";
import LinearDeterminate from "./LinerProgress";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import SearchList from "./searchList";

interface SearchModalProps {
  searchType: string;
  setAction: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}
function SearchModal({ searchType, setAction, searchQuery }: SearchModalProps) {
  const { search, recentlySearched, error, Loading } =
    useSelector(selectSearch);
  console.log(search);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery) {
      console.log("searchquery");
      dispatch(searchStart({ type: searchType, query: searchQuery }));
    }
  }, [searchQuery]);

  return (
    <div className="w-full max-h-[300px]  overflow-auto bg-slate-50  rounded-[5px] opacity-100 z-[5]   absolute top-[105%] left-0 flex flex-col gap-2">
      <div className="w-full  h-full   bg-white border rounded-md p-2 flex flex-col gap-5">
        <div className="flex gap-2 px-5 py-2 border-b">
          {options.map((option) => (
            <button
              key={option.label}
              className={`text-sm rounded-full border px-[9px] py-[7px] ${
                searchType.includes(option.value)
                  ? "bg-[#186085] text-white transition-colors duration-75 ease-in"
                  : "bg-inherit text-gray-700"
              }`}
              type="button"
              onClick={() => setAction(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <>
          <div className="flex flex-col gap-1">
            {Loading ? (
              <CircularProgress size={30} className="self-center" />
            ) : (
              <>
                {search ? (
                  <SearchList searchType={searchType} />
                ) : (
                  <>
                    {recentlySearched.map((search: string, i: number) => (
                      <div
                        key={i}
                        className="flex gap-1 hover:bg-slate-100 p-3"
                      >
                        <BsSearch className="self-center" />
                        <Link href={""} className="text-sm text-gray-700">
                          {search}
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </>
        {/* <Suspense fallback={<CircularProgress />}>come on man</Suspense> */}
      </div>
    </div>
  );
}
