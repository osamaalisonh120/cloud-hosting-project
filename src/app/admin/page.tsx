import React from 'react'
import AddArticleForm from './AddArticleForm'
import { verifyTokenForPage } from "@/apiCalls/articleApiCall";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
export default async function page() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
   const token = (await cookies()).get("jwtToken")?.value || "";
     if(!token) redirect("/")
    const payload = verifyTokenForPage(token);
  if(payload?.isAdmin===false) redirect("/")
  return (
    <div className='fix-height flex items-center justify-center px-5 lg:px-20'>
     <div className='shadow p-4 bg-purple-200 rounded w-full'>
     <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticleForm/>
     </div>
    </div>
  )
}




// import AddArticleForm from './AddArticleForm'
// import { verifyTokenForPage } from "@/apiCalls/articleApiCall";
// import { cookies } from "next/headers";
// import { redirect } from 'next/navigation';

// export default async function AdminPage() {
//   // جلب التوكن من الكوكيز
//   const cookieStore = await cookies();
//   const token = cookieStore.get("jwtToken")?.value;
  
//   console.log("🔍 Admin Page - Token exists:", !!token);
  
//   // 1. إذا لم يكن هناك توكن (مستخدم غير مسجل دخول)
//   if (!token) {
//     console.log("🚫 No token - redirecting to login");
//     redirect("/login"); // أو "/" حسب تفضيلك
//   }
  
//   // 2. التحقق من صلاحية التوكن
//   let payload;
//   try {
//     payload = verifyTokenForPage(token);
//     console.log("🔍 Token payload:", payload);
//   } catch (error) {
//     console.log("❌ Invalid token:", error);
//     redirect("/login");
//   }
  
//   // 3. التحقق من صلاحية الأدمن
//   if (!payload?.isAdmin) {
//     console.log("🚫 User is not admin - isAdmin:", payload?.isAdmin);
//     redirect("/"); // أو صفحة "غير مصرح لك"
//   }
  
//   console.log("✅ User is admin, showing admin page");
  
//   return (
//     <div className='fix-height flex items-center justify-center px-5 lg:px-20'>
//       <div className='shadow p-4 bg-purple-200 rounded w-full'>
//         <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
//           Add New Article
//         </h2>
//         <AddArticleForm/>
//       </div>
//     </div>
//   )
// }