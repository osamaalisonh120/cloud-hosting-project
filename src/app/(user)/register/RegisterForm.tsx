"use client";
import { useState } from "react"
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import ButtonSpinner from "@/components/home/ButtonSpinner";
export default function RegisterForm() {
     const router=useRouter()
     const [loading,setoading]=useState(false)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const handelSubmitRegister=async (e:React.FormEvent)=>{
          e.preventDefault();
            if(username=="") return  toast.error("username is required");
             if(email=="") return  toast.error("email is required");
             if(password=="") return  toast.error("password is required");
             try {
               setoading(true)
               await axios.post(`${DOMAIN}/api/users/register`,{username,email,password});
               router.replace('/')
                setoading(false)
               router.refresh()
             } 
             catch (error) {
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
 
       <form onSubmit={handelSubmitRegister} action="" className="flex flex-col">
            <input value={username}  onChange={(e)=>setUsername(e.target.value)} 
            type="text" placeholder="Enter Your Username" 
            className='mb-4 border border-gray-300  p-2 text-xl rounded' />
             <input value={email}  onChange={(e)=>setEmail(e.target.value)} 
             type="email"  placeholder="Enter Your Email" className='mb-4 border p-2 border-gray-300 text-xl rounded'/>
             <input value={password}  onChange={(e)=>setPassword(e.target.value)} 
             type="password" placeholder="Enter Your Password"  className='mb-4 border p-2 border-gray-300 text-xl rounded'/>
         <button className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold'> 
        {  loading  ?<ButtonSpinner/> : "Register"}
          </button>
        </form>
  
  )
}
