"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function LogoutButton() {
    const router=useRouter();
   
    const logoutHandaler=async()=>{
     try {
       
         await axios.get(`${DOMAIN}/api/users/logout`)  
         router.push('/')
        
         router.refresh();
     } catch (error) {
         toast.warning("Something went wrong");
        console.log(error);
     }

    }

  return (
    <div>
      <button className="bg-gray-700 text-gray-200 px-1 rounded" onClick={logoutHandaler}>Logout</button>
    </div>
  )
}
