"use client";


import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import {  useState } from "react"
import ButtonSpinner from "@/components/home/ButtonSpinner";
export  default function LoginForm() {
     const router=useRouter()
   const[email,setMail] =useState("");
   const [loading,setoading]=useState(false)
    const[password,setPassword] =useState("");
    const handelSubmit=async (e:React.FormEvent)=>{
       e.preventDefault();
        if(email=="") return  toast.error("email is required");
         if(password=="") return  toast.error("password is required");
       try {
          setoading(true)
         await  axios.post(`/api/users/login`,{email,password})
          router.replace('/')
          setoading(false)
          router.refresh();

       } catch (error) {
          console.log(error)
          if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Login failed");
     setoading(false)
  } else {
    toast.error("Unexpected error");
     setoading(false)
  }
       }
    }
  return (
 
       <form onSubmit={ handelSubmit} action="" className="flex flex-col">
            <input value={email}  onChange={(e)=>setMail(e.target.value)} type="email" placeholder="Enter Your Email" className='mb-4 border border-gray-300  p-2 text-xl rounded' />
             <input value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Your Password"  className='mb-4 border p-2  border-gray-300 text-xl rounded'/>
         <button className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold'>
         { loading ? <ButtonSpinner/>: "Login"}
          </button>
        </form>

  )
}
