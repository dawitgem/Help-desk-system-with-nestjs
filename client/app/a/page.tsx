"use client";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/utils/QueryActions";

const AgentPage = () => {
  const {data:user,isError,isLoading,error}=useQuery({
    queryKey:["getUser"],
    queryFn:getProfileApi
   })
   useEffect(()=>{
     if(user &&user.Verified&&(user.UserType==="Admin"||user.UserType==="Agent"))
        redirect("/a/dashboard/default")
   else  redirect("/support")
  },[user])
 
   return (
    <Box className="flex flex-col gap-4 w-full h-screen justify-center align-middle   relative">
      <CircularProgress className="self-center justify-self-center" />
      <h1 className="self-center justify-self-center text-gray-700">
        Loading...
      </h1>
    </Box>
  );
};

export default AgentPage;
