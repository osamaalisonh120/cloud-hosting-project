"use client";
import { useRouter } from "next/navigation";
import {  useState } from "react"
import { toast } from 'react-toastify';

export default function SearchArticleInput() {
     const[search,setSearch] =useState("");
   const router =  useRouter()
        const handelSubmit=(e:React.FormEvent)=>{
       e.preventDefault();
        if(search=="") return  toast.error("search is required");
          router.replace(`/articles/search?searchText=${search}`)
     }
  return (
          <form onSubmit={handelSubmit} action="" className=" w-full md:w-2/3 mx-auto">
            <input value={search}  onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search For Article" 
            className='w-full bg-white mb-4 border border-gray-300  p-2 text-xl rounded' />
           
        </form>
  )
}
