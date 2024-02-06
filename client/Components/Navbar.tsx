"use client"
import Link from "next/link";
import Menu from "./Menu";
import { UserProfilePopOver } from "./Listbox";
import Navigation from "./Navigation";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/utils/QueryActions";
import { usePathname } from "next/navigation";

const Navbar = () => {
   const {data:user,isError,isLoading,error}=useQuery({
    queryKey:["getUser"],
    queryFn:getProfileApi
   })
   const pathname=usePathname()
   const isAuthPage=()=>{
    if(pathname.includes("login")||pathname.includes("signup"))
         return true   
     return false
    }
 
  return (
    <>
      <div className="md:p-0 p-4">
        <nav className="hidden md:block">
          <ul className="flex lg:gap-8 md:gap-1 pt-[10px]">
            <Navigation
              NavLinks={[
                { link: "Home", href: "/support" },
                { link: "Knowledgebase", href: "/support/solutions" },
              ]}
            />

            {user && user?.Verified === true  ? (
              <>
                <Navigation
                  NavLinks={[{ link: "Ticket", href: "/support/tickets" }]}
                />
                <li className="mt-4 ">
                  <Link
                    href="/support/tickets/new"
                    className=" lg:w-[80px] w-[60px] px-2 py-3 border  bg-white  rounded-lg text-gray-700  md:text-[15px] text-sm font-medium"
                  >
                    Submit ticket
                  </Link>
                </li>
                <UserProfilePopOver right={0} top={72} width={150} avatar={true} />                
              </>
            ) : (
              <>
                <li className="mt-4 ">
                  <Link
                    href="/support/tickets/new"
                    className=" p-3 border  bg-white  rounded-lg text-gray-700 text-sm font-medium"
                  >
                    Submit Ticket
                  </Link>
                </li>
                {!isAuthPage()&&
                <div className="flex divide-x divide-black gap-3">
                  <li className="mt-4">
                    <Link
                      className="p-4 text-md text-gray-700 font-semibold"
                      href={"/support/login"}
                      >
                      Login
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="p-4 ml-2 text-md text-gray-700 font-semibold"
                      href={"/support/signup"}
                      >
                      Sign up
                    </Link>
                  </li>
                </div>
                    }
              </>
            )}
          </ul>
        </nav>
        <Menu user={user}/>
      </div>
    </>
  );
};

export default Navbar;
