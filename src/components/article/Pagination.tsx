import Link from "next/link";
interface IPropsPagination{
  pages: number;
  pageNumber: number;
  route: string;
}
export default function Pagination({pages,pageNumber,route}:IPropsPagination) {
const pagesArray:number[]=[]
for(let i=1 ; i<=pages;i++)  pagesArray.push(i)
const prev=pageNumber-1
const next=pageNumber+1

  return (
    <div>
      <div className=" flex items-center justify-center mt-5">
       {pageNumber!==1 &&(
         <Link  href={`${route}?pageNumber=${prev}`} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition" >
           Prev
           </Link>
       )} 
        {pagesArray.map((page)=>(
           <Link key={page} href={`${route}?pageNumber=${page}`} className={`${pageNumber===pages?"bg-red-600":""}border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`} >
            {page}
           </Link> 
        ))}

        
        {pageNumber!==pages&&(
          <Link href={`${route}?pageNumber=${next}`}  className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition" >
            Next
           </Link>
        ) }


           
      </div>
    </div>
  )
}
// نفس الفكرة في Next
// {pageNumber !== pages && (
//   <Link href={`${route}?pageNumber=${next}`}>
//     Next
//   </Link>
// )}

// معناها:

// اعرض Next
// بس لو مش في آخر صفحة

// تعويض بالقيم (جدول)
// pageNumber	pages	Prev	Next   
// 	1     	     5	❌	✅	                            
// 	2	           5	✅	✅
// 	5    	       5  	✅	❌ 