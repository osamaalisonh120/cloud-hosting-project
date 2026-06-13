// type IProps = {
//    params: { id: string }  
// }



// const page = ({}:IProps) => {
//   return (
//     <div>
     
//     </div>
//   )
// }


// export default page



 
//  ArticlePage
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 

// }
//    const post = await res.json()
//   return (
//     <div>My Post: {id}</div>
    
//   )
// }
import { getDataSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/apiCalls/articleApiCall";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
   const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  const { id } = await params;
 const article:SingleArticle=await getDataSingleArticle(id )
  
  return (
    <div className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <h2>Post ID: {id}</h2>
      <div className="bg-white p-7 rounded-lg mb-7">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                   {article.title}
                </h1>
                  <div className="text-gray-400">
                    {new Date(article.createdAt).toDateString()}
                </div>
                <div  className="text-gray-800 text-xl mt-5">
                   <p>{article.description}</p>
                </div>
                
            </div>
          <div className="mt-7">
             {payload ?<AddCommentForm articleId={article.id}/>:
             <p className="text-blue-600 md:text-xl">
                          to write a comment you should log in first
                      </p>
             }
          </div>
            
             <h2 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">Comments</h2>
             {article.comments.map(comment=>(
               <CommentItem key={comment.id} comment={comment} userId={ payload?.id}/>
             ))}
            
              
    </div>
  );
}


  