"use client";


import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
interface IPropscomment{
  CommentId:number  
}
export default function DeleteCommentButton({ CommentId}:IPropscomment) {
      const router=useRouter()
     const deleteCommentHandler = async () => {

    try {
     if(confirm("you want delete this comment, Are you sure?")){
       await axios.delete(`${DOMAIN}/api/comments/${CommentId}`);
       router.refresh()
        toast.success("comments deleted");
     }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Updata Comment failed");
      } else {
        toast.error("Unexpected error");
      }
    }
  };
  return (
     <div onClick={ deleteCommentHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
            Delete
        </div>
  )
}
