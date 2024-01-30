import { getContactTicket } from '@/utils/QueryActions'
import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiTicket2Line } from 'react-icons/ri'

 interface ContactTicketProps{
    userId:string
 }
const ContactTickets = ({userId}:ContactTicketProps) => {
     const {data:tickets,isLoading,isError,isSuccess,error}=useQuery({
    queryKey:["getcontactticket",userId],queryFn: ()=>getContactTicket(userId)  
  })
  console.log(tickets)

  return (
     <>
     {isError&&  <div className='w-full text-red-500'>{error.message}</div> }
     {isLoading &&  <div className="w-full flex flex-col justify-center">
        < CircularProgress className="self-center" />
      </div> 
        }
        {isSuccess&&tickets&&tickets.length>0&&tickets.map((ticket:any)=>(
             
    <div key={ticket.Id} className="flex flex-col p-5 gap-5   ">
            <div className="flex  gap-10 bg-white border border-gray-300  rounded-md p-5 shadow-md ">
              <RiTicket2Line className="text-gray-400  text-3xl self-center" />
              <div className="flex flex-col gap-3">
                <Link href={""} className="text-gray-700 hover:text-blue-600 ">
                  {ticket.Subject}
                </Link>
                <div className="flex flex-col gap-2  ">
                  <div className="flex gap-3 text-gray-500 text-sm self-center">
                    <p className="self-center">Status : {ticket.Status}</p>
                    <p>
                      <span className="text-lg font-bold px-2">.</span>{" "}
                      Department : Department1
                    </p>{" "}
                    <p>
                      <span className="text-lg font-bold px-2">.</span>{" "}
                      Department : Department1
                    </p>
                  </div>
                  <div className="flex gap-3 text-gray-500 text-sm ">
                    <p className="self-center">Created : {formatDistanceToNow(new Date(ticket.CreatedAt)).replace(
                        "about",
                        ""
                      )}{" "}
                      Ago</p>
                    <p>
                      {" "}
                      <span className="text-lg font-bold px-2">.</span> First
                      Response Due in : a day{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        )}
          </>
  )
}

export default ContactTickets