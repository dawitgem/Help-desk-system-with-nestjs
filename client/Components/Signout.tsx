import { queryclient } from '@/utils/Provider';
import { signout } from '@/utils/QueryActions';
import { useMutation } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'



const Signout = () => {
    const router=useRouter()
    const logoutMutation = useMutation(
        {
          mutationKey: ['logout'],
          mutationFn: async () => {
            const response = await signout();
            return response;
          },  
          onMutate: async () => {
          },        
          onSuccess: () => {
            queryclient.removeQueries();            
          }
        },
        
      );      
      const handleLogout = async () => {
           logoutMutation.mutate()}


    useEffect(()=>{
        if(logoutMutation.isSuccess)
          redirect("/support")

    },[logoutMutation])
    
  return (
    <button className="flex flex-col p-2 text-gray-700 hover:bg-slate-100 text-sm font-semibold" onClick={handleLogout}>
    <p className="self-start">Sign out</p>
    </button>
  )
}
export default Signout