"use client"


import { Dispatch, SetStateAction, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

import axios from 'axios';
interface IpropsModal{
    isopen:boolean,
    ModalHandeler:() => void,
    text:string,
    commentId:number,
    setopenModel:Dispatch<SetStateAction<boolean>>
}

export const UpdateCommentModal = ({isopen,ModalHandeler,text,commentId,setopenModel}:IpropsModal) => {
       const router=useRouter()
  const [updatedText, setUpdatedText] = useState(text);
       const formSubmitHandler=async (e:React.FormEvent)=>{
         e.preventDefault();
         if(updatedText=="") return toast.info("Please write something");
         try {
            await axios.put(`/api/comments/${commentId}`,{text:updatedText})
          router.refresh()
           setUpdatedText("");
           setopenModel(false)
          
          }catch (error) {
              if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Updata Comment failed");
  
  } else {
    toast.error("Unexpected error");
  
  }
          }
       }
    if(!isopen) return null

  return (
    <div  className='fixed inset-0  z-20 flex justify-center items-center bg-black/40 '>
      <div className='w-2/4  bg-white rounded-lg p-3'>
         <div className='flex justify-end items-start mb-5'>
           <IoMdCloseCircleOutline  onClick={ModalHandeler} className='text-red-500 cursor-pointer text-3xl' />
        </div>
        <form onSubmit={formSubmitHandler} action="">
            
            <input type="text" value={updatedText} onChange={(e)=>setUpdatedText(e.target.value)} placeholder='Edit Comment...' className='w-full rounded-xl bg-white mb-2 text-xl p-2'/>
            <button className='w-full rounded-lg text-xl bg-green-700 mt-2 p-1' type='submit'>Edit</button>
        </form>
      </div>
    </div>
  )
}


