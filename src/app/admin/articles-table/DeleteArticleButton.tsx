"use client";


import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import axios from "axios";
interface IPropsTable{
  articleId:number  
}
const DeleteArticleButton = ({articleId}:IPropsTable) => {
    const router=useRouter()
     const deleteArticleHandler = async () => {

    try {
     if(confirm("you want delete this comment, Are you sure?")){
       await axios.delete(`/api/articles/${articleId}`);
       router.refresh()
        toast.success("article deleted");
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
   <div onClick={deleteArticleHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
            Delete
        </div>
  )
}

export default DeleteArticleButton
