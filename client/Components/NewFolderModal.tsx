import React from 'react'
import { BsFolder2Open, BsPencil } from 'react-icons/bs'
import { GoPencil } from 'react-icons/go'

const NewFolderModal = () => {
  return (
    <div className='w-full p-4 flex flex-col gap-5 '>
      <div className='flex gap-4 '>
         <div className='self-center border bg-slate-100 border-gray-300 p-2 flex relative'>
            <BsFolder2Open className="text-4xl text-gray-500"/>
            <GoPencil  className="text-md -ml-2 bg-white text-gray-500  rounded-full  "/>
         </div>
         <h1 className='self-center text-md font-semibold text-gray-700'>New Folder</h1>
      </div>
       <form action="" className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
             <label htmlFor="name " className="text-sm font-thin">Name <span className='text-red-600'>*</span></label>
             <input type="text" className='border border-gray-300 rounded-md hover:border-gray-500 focus:outline-blue-500 py-3 px-4  text-sm ' placeholder='Enter folder name' />
          </div><div className='flex flex-col gap-1'>
             <label htmlFor="description " className="text-sm font-thin">Description</label>
             <textarea  className='border border-gray-300 rounded-md hover:border-gray-500 focus:outline-blue-500 py-3 px-4  text-sm '  />
          </div><div className='flex flex-col gap-1'>
             <label htmlFor="category " className="text-sm font-thin">Category <span className='text-red-600'>*</span></label>
             <input type="text" className='border border-gray-300 rounded-md hover:border-gray-500 focus:outline-blue-500 py-3 px-4  text-sm ' placeholder='Enter folder name' />
          </div>
          <div className='self-end flex gap-3'>
          <button type='button' className='py-1 px-5 text-sm border text-gray-700 border-gray-300 shadow-sm bg-slate-50 rounded-lg ring-1 ring-gray-400'>cancel</button>
          <button className='py-1 px-5 bg-[#184e6a] text-white border rounded-lg'>Add</button>
          </div>
       </form>
    </div>
  )
}

export default NewFolderModal