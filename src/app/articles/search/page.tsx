import { ArticleSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/article/ArticleItem";
import { Article } from "@prisma/client";
interface SearchArticlePageProps {
  searchParams: Promise<{ searchText?: string }>;
}

export default async function SearchArticlePage({searchParams }:SearchArticlePageProps) {
  const {searchText} = await searchParams ;
    // const params = await searchParams;
//   const searchText = params.searchText ;
const articles:Article[]= await ArticleSearch(searchText)
  return (
    <section className="fix-height container m-auto px-5">
      {articles?.length===0 ?(
  <h2 className='text-gray-800 text-2xl font-bold p-5'>
          Articles based on
          <span className='text-red-500 mx-1'>{searchText}</span>
          not found
        </h2>
      ):(
  <>
         <h1 className='text-gray-800 text-2xl font-bold p-5'>
          Articles based on
          <span className='text-green-700 mx-1'>{searchText}</span>
         
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((item) => (
                  <ArticleItem key={item.id} article={item} />
                ))}
              </div>
      </>
      )}
   
    
    </section>
  );
}

// export default async function Page(props: any) {
//   const searchParams = await props.searchParams;

//   console.log(searchParams);

//   return <div>Test</div>;
// }
