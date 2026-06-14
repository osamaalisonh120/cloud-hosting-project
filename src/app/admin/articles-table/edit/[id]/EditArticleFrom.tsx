"use client";

import { useState, FormEvent } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
interface IEditProps{
    articleId:number,
    titles:string,
    descriptions:string,
}
export default function EditArticleFrom({ articleId,titles, descriptions}:IEditProps) {
    
     const [title, setTitle] = useState(titles);
    const [description, setDescription] = useState(descriptions);
   const router=useRouter()

   const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (!title) return toast.error("title is required");
  if (!description) return toast.error("description is required");

  try {
    await axios.put(`/api/articles/${articleId}`, { title, description });

   

    router.refresh();
    toast.success("Article added successfully!");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Add article failed");
    } else {
      toast.error("Unexpected error");
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      {/* Username Field */}
      <input 
        value={title}  
        onChange={(e) => setTitle(e.target.value)} 
        type="text" // ✅ تصحيح: username هو text
        placeholder="Enter Article Title"
        className=' bg-white mb-4 border border-gray-300 p-3 text-lg rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
      />
      
     
     
       <textarea
                className='bg-white mb-4 p-2 lg:text-xl rounded resize-none'
                rows={5}
                placeholder='Enter Artilce Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
      <button 
        type="submit"
        className='text-xl text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg'
      >
       Edit
      </button>
    </form>
  )
}

