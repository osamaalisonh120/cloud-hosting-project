// export default async function Page() {
//   const data = await fetch('https://jsonplaceholder.typicode.com/posts')

// http://localhost:3000/articles?pageNumber=1

import { getDataArticle } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/article/ArticleItem";
import Pagination from "@/components/article/Pagination";
import SearchArticleInput from "@/components/article/SearchArticleInput";
import { Article } from "@prisma/client";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";

interface ArticlesPageProps {
  searchParams?: Promise<{
    pageNumber?: string;
  }>;
}

export default async function Page({ searchParams }: ArticlesPageProps) {
  // const {pageNumber} = await searchParams;
  const params = (await searchParams) || {};
  const pageNumber = params.pageNumber || "1";
  const articles: Article[] = await getDataArticle(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  console.log("article page");
  return (
    <main className="fix-height">
      <SearchArticleInput />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      <Pagination
        route="/articles"
        pageNumber={parseInt(pageNumber)}
        pages={pages}
      />
    </main>
  );
}
export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programming",
};

//   if (!data.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
//   const posts = await data.json()
//   console.log(posts)
//   return (
//     <ul>
//       {posts.map((post) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   )
// }

// ***********************************************************
// export default async function Page() {
//   const datas: TPost[] = await getData()
//  console.log(datas)
//   return <main>
//    <div className="flex  flex-wrap  gap-6">
//      {datas.map((item)=>(

//         <ul className="bg-amber-400 p-3 w flex-1 min-w-[250px]" key={item.id}>
//           <li>
//             {item.id}
//           </li>
//          <li className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
//             {item.title}
//           </li>
//            <li>
//             {item.body}
//           </li>
//         </ul>

//     ))}
//    </div>
//   </main>
// }
