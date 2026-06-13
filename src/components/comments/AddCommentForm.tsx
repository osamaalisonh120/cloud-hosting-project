// "use client";

// import {  useState } from "react"
// import { toast } from 'react-toastify';
// import { DOMAIN } from "@/utils/constants";
// import axios from "axios";


// export default function LoginForm() {
//    const[mail,setMail] =useState("");
//     const[password,setPassword] =useState("");
//     const handelSubmit=(e:React.FormEvent)=>{
//        e.preventDefault();
//         if(mail=="") return  toast.error("email is required");
//          if(password=="") return  toast.error("password is required");
//     }
//   return (
 
//        <form onSubmit={handelSubmit} action="" className="flex flex-col">
//             <input value={mail}  onChange={(e)=>setMail(e.target.value)} type="email" placeholder="Enter Your Email" className='mb-4 border border-gray-300  p-2 text-xl rounded' />
//              <input value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Your Password"  className='mb-4 border p-2  border-gray-300 text-xl rounded'/>
//          <button className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold'>Login</button>
//         </form>
  
//   )
// }
"use client";

import {  useState } from "react"
import { toast } from 'react-toastify';
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IProdId{
  articleId:number
}
export default function AddCommentForm({articleId}:IProdId) {
   const router=useRouter()
    const[text, setText] =useState("");
        const handelSubmit=async (e:React.FormEvent)=>{
       e.preventDefault();
        if(text=="") return  toast.error("search is required");
          try {
             await  axios.post(`${DOMAIN}/api/comments/`,{text,articleId})
              router.refresh()
              setText("")
          } catch (error) {
              if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Login failed");
  
  } else {
    toast.error("Unexpected error");
  
  }
          }
     }
  return (
          <form onSubmit={handelSubmit} action="" >
            <input value={text}  onChange={(e)=>setText(e.target.value)} 
            type="text" placeholder="Add Your Comment....."
             className='w-full bg-white border border-gray-300  p-2 text-xl rounded' />
         <button className='bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition'>comment</button>
        </form>
  )
}

