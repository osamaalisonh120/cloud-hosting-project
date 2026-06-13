import { getAllComments } from "@/apiCalls/adminApiCall";
import { verifyTokenForPage } from "@/apiCalls/articleApiCall";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import DeleteCommentButton from "./DeleteCommentButton";


export default async function page() {

     const token = (await cookies()).get("jwtToken")?.value || "";
       if(!token) redirect("/")
      const payload =await verifyTokenForPage(token);
    if(payload?.isAdmin===false) redirect("/")
      const comments:Comment[]= await getAllComments(token)

  return (
    <section className="p-5 ">
      <h1 className="text-gray-700 mb-7 font-semibold text-2xl">Comments</h1>
     <table className="table w-full text-left">
        <thead className="border-b-2 border-t-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Comments</th>
            <th className="hidden lg:inline-block p-3">Created At</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment=>(
              <tr key={comment.id}>
            <td>{comment.text}</td>
            <td className="text-gray-700 p-3 font-normal hidden lg:inline-block">
               {new Date(comment.createdAt).toDateString()}
            </td>
            <td className="mt-2">
              <DeleteCommentButton CommentId={comment.id}/>
            </td>
          </tr>
          ))}
         
        </tbody>
     </table>
    </section>
   
  )
}

