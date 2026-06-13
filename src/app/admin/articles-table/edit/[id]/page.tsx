import { getDataSingleArticle, verifyTokenForPage } from "@/apiCalls/articleApiCall";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import EditArticleFrom from "./EditArticleFrom";

interface IEditTableProps {
  params: Promise<{ id: string }>
}

const page = async ({ params}:IEditTableProps) => {

const { id } = await params;
     const token = (await cookies()).get("jwtToken")?.value || "";
           if(!token) redirect("/")
          const payload = verifyTokenForPage(token);
        if(payload?.isAdmin===false) redirect("/")
      const article:Article=await getDataSingleArticle(id)      
  return (
    <section className="fix-height px-5 lg:px-20 flex items-center justify-center">
      <div className="shadow bg-purple-200 w-full rounded ">
        <h1 className="text-2xl text-green-700 font-semibold mb-4">Edit Article</h1>
        <EditArticleFrom articleId={article.id} titles={article.title} descriptions= {article.description} />
      </div>
    </section>
  )
}

export default page


