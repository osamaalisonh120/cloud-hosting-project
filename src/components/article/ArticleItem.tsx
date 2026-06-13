import React from 'react'
import Link from "next/link"
import { Article } from "@prisma/client";
interface IpropsArticle{
    article:Article
}
export default function ArticleItem({article}:IpropsArticle) {
  return (
     <div
            key={article.id} 
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {article.id}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>
          
            </div>
        <Link className="text-xl mt-5 bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg" href={`/articles/${article.id}`}>
        Read More
      </Link>
          </div>
  )
}
