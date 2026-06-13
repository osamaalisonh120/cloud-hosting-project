import { DataArticleCount, getDataArticle, verifyTokenForPage } from "@/apiCalls/articleApiCall";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { Article } from "@prisma/client";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import Pagination from "@/components/article/Pagination";
import Link from "next/link";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/lib/prisma";
interface TablePageProps {
  searchParams?: Promise<{
    pageNumber?: string;
  }>;
}

export default async function page({searchParams}:TablePageProps ) {
const params = await searchParams || {};
  const pageNumber = params.pageNumber || "1";
    const count:number= await prisma.article.count()
    const pages=Math.ceil(count/ARTICLE_PER_PAGE)
     const token = (await cookies()).get("jwtToken")?.value || "";
       if(!token) redirect("/")
      const payload = verifyTokenForPage(token);
    if(payload?.isAdmin===false) redirect("/")
      const articles:Article[]=await getDataArticle( pageNumber)

  return (
    <section className="p-5">
      <h1 className="text-gray-700 mb-7 font-semibold text-2xl">Article</h1>
      <table className="table w-full text-left">
        <thead className="border-b-2 border-t-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block lg:p-2">Created At</th>
            <th >Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
         {articles.map(article=>(
          <tr key={article.id} className="border-b border-t border-gray-300">
            <td className="p-3 text-gray-700">{article.title}</td>
            <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
              {new Date(article.createdAt).toDateString()}
            </td>
            <td className="p-3">
              <Link className="bg-green-600  text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition" 
              href={`/admin/articles-table/edit/${article.id}`}>
               Edit
              </Link>
            <DeleteArticleButton articleId={article.id}/>
            </td>
            <td className="hidden lg:inline-block">
              <Link className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800" href={`/articles/${article.id}`}>
               Read More
              </Link>
            </td>
          </tr>
         ))}
        </tbody>
      </table>
      <Pagination route="/admin/articles-table" pages={pages} pageNumber={parseInt(pageNumber)} />
    </section>
  )
}
