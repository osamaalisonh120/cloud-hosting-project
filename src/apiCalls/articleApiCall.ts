import { Article } from "@prisma/client";

import { IJWTpaylods, SingleArticle } from "@/utils/types";
import jwt from "jsonwebtoken";
export async function getDataArticle(pageNumber:string|undefined):Promise< Article[]> {
// await new Promise((resolve) => setTimeout(resolve, 2000));
 
  const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/articles?pageNumber=${pageNumber}`,
    {cache:"no-store"})
 
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
export async function DataArticleCount():Promise< number> {
// await new Promise((resolve) => setTimeout(resolve, 2000));
 
  const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/articles/count`,
     {cache:"no-store"})

 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
 const{count} =await res.json() as {count:number}
 
 return count
}

// 3️⃣
// const { count } = await res.json() as { count:number }


// ليه destructuring؟

// لأن الـ API بيرجع:

// {
//   "count": 27
// }


// فإحنا عملنا:

// const { count } = ...


// يعني:

// count = 27

// 4️⃣
// return count


// الدالة بترجع رقم بس
// مش object



export async function ArticleSearch(searchText:string|undefined):Promise< Article[]> {

 
  const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/articles/search?searchText=${searchText}`
)
 

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


// | نوع العملية | النوع     |
// | ----------- | --------- |
// | get by id   | Article   |
// | search      | Article[] |
// | get all     | Article[] |

// 🔵 الدالة الثانية
// verifyTokenForPage(token: string)

// 🎯 بتستخدمها إمتى؟

// في:

// Server Components

// Server Pages

// لأن هنا مفيش request.

// 🧠 إزاي فكرت فيها؟

// قلت:

// 1️⃣ في الصفحة مش عندي request
// 2️⃣ أنا جبت التوكن بنفسي باستخدام cookies()
// 3️⃣ يبقى أحتاج دالة تفك التوكن بس
// 4️⃣ من غير ما تعتمد على request

// 🔁 اللي بيحصل جواها
// token (string)
//    ↓
// jwt.verify
//    ↓
// usersFromToken

// 📌 تستخدمها هنا:
// const token = cookies().get("jwtToken")?.value || "";
// const payload = verifyTokenForPage(token);

// 🎯 الفرق بينهم باختصار
// المقارنة	verifyToken	verifyTokenForPage
// بياخد إيه؟	request كامل	token string
// يستخدم فين؟	API / Middleware	Server Pages
// مين بيجيب الكوكي؟	الدالة نفسها	الصفحة
// مستوى المرونة	أقل	أعلى
// 🧠 ليه عملت الاتنين؟
export function verifyTokenForPage(token: string): IJWTpaylods | null{
 
  
  try {
    const PriviteKey=process.env.JWT_SECRET as string
  const usersFromToken=jwt.verify(token,PriviteKey) as IJWTpaylods
if (!usersFromToken) return null;
  
  return usersFromToken
  } catch (error) {
    return null;
  }
}
// export async function getDataSingleArticle(articelId:string):Promise<SingleArticle>{

 
//   const res = await fetch(    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articelId}`,

//     {cache:"no-store"})
 
//  console.log(res)
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }

export async function getDataSingleArticle(
  articelId: string
): Promise<SingleArticle> {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  console.log(
    "FULL URL:",
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articelId}`
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articelId}`,
    {
      cache: "no-store",
    }
  );

  console.log("STATUS:", res.status);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  console.log("ARTICLE DATA:", data);

  return data;
}