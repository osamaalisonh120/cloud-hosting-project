// import { useState } from "react"
// import { AiOutlineMenu  } from "react-icons/ai"
// import { IoMdClose } from "react-icons/io";

// const Header = () => {
//     const[isOpen,setOpen]=useState(false)
//   return (
//     <header className=" fixed top-0 left-0 w-full  bg-regal h-[100px]  border-b-4  border-b-brd-gry">
//      <div className="container mx-auto p-4">
//        <div className="flex justify-between items-center">
//         <button
//           className="text-[40px] lg:hidden"
//           onClick={() => setOpen(prev => !prev)}
//           aria-label="Toggle Menu"
//         >
//           {isOpen ? <IoMdClose /> : <AiOutlineMenu />}
//         </button>
//         <Navbar/>

//           <ul className="flex">
//               <Link className="btn mr-2" href="/login">Login</Link>
//                <Link className="btn"  href="/register">Register</Link>
//           </ul>
//        </div>
//          {isOpen && (
//         <div className="absolute top-full left-0 w-full bg-regal shadow-lg lg:hidden border-t z-50">
//           <div className="flex flex-col p-6 space-y-6">
//             <nav>
//               <ul className="space-y-4">

//                 <li>
//                   <Link
//                     href="/"
//                     className="block text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300 py-2"
//                     onClick={() => setOpen(false)}
//                   >
//                     Home
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="/articles"
//                     className="block text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300 py-2"
//                     onClick={() => setOpen(false)}
//                   >
//                     Articles
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="/about"
//                     className="block text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300 py-2"
//                     onClick={() => setOpen(false)}
//                   >
//                     About
//                   </Link>
//                 </li>

//               </ul>
//             </nav>
//           </div>
//         </div>
//       )}

//      </div>

//     </header>
//   )
// }

// export default Header

// const Header = () => {
//     const [isOpen, setOpen] = useState(false)

//     return (
//         <header className="fixed top-0 left-0 w-full bg-regal h-[100px] border-b-4 border-b-brd-gry z-50">
//             <div className="container mx-auto p-4">
//                 <div className="flex justify-between items-center">
//                     {/* زر القائمة */}
//                     <button
//                         className="text-[40px] lg:hidden"
//                         onClick={() => setOpen(prev => !prev)}
//                         aria-label="Toggle Menu"
//                     >
//                         {isOpen ? <IoMdClose /> : <AiOutlineMenu />}
//                     </button>

//                     <Navbar/>

//                     {/* أزرار Login/Register */}
//                     <ul className="flex">
//                         <Link className="btn mr-2" href="/login">Login</Link>
//                         <Link className="btn" href="/register">Register</Link>
//                     </ul>
//                 </div>

//                 {/* القائمة المنزلقة - المُصححة */}
//                 <div
//                     className="absolute top-full left-0 w-full bg-regal shadow-lg lg:hidden transition-all duration-500 overflow-hidden"
//                     style={{
//                         clipPath: isOpen
//                             ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
//                             : "polygon(0 0, 100% 0, 100% 0, 0 0)"
//                     }}
//                 >
//                     <div className="p-6">
//                         <ul className='flex flex-col space-y-4'>
//                             <li>
//                                 <Link
//                                     className='capitalize text-[20px] hover:text-[darkblue] transition-all duration-300 font-semibold block py-2'
//                                     href="/"
//                                     onClick={() => setOpen(false)}
//                                 >
//                                     home
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     className='capitalize text-[20px] hover:text-[darkblue] transition-all duration-300 font-semibold block py-2'
//                                     href="/articles"
//                                     onClick={() => setOpen(false)}
//                                 >
//                                     articles
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     className='capitalize text-[20px] hover:text-[darkblue] transition-all duration-300 font-semibold block py-2'
//                                     href="/about"
//                                     onClick={() => setOpen(false)}
//                                 >
//                                     about
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header

// 'use client'
// import { useState } from "react"
// import { AiOutlineMenu  } from "react-icons/ai"
// import { IoMdClose } from "react-icons/io";
// import { Navbar } from '@/components/header/Navbar'
// import Link from "next/link"
// // import { cookies } from "next/headers";

// const Header = () => {
//     const [isOpen, setOpen] = useState(false)
// //  const token = cookies().get("jwtToken")?.value || "";
//   return (

//      <header className="fixed top-0 left-0 w-full bg-regal h-25 z-50  border-b-4  border-b-brd-gry">
//        <div className="container mx-auto py-5">
//         <div className='flex justify-between items-center '>
//           <div className="lg:hidden ">
//             <button onClick={()=>setOpen (prev=>!prev)} className="text-[40px]">
//                {isOpen ? <IoMdClose />:<AiOutlineMenu />}
//             </button>
//           </div>
//           <Navbar/>

//          <div className='space-x-3'>
//           <button>
//              <Link className='cursor-pointer bg-blue-600 text-white rounded-lg  px-3 py-2 text-xl font-semibold  flex items-center   ' href={"/login"}>Login</Link>
//           </button>
//            <button>
//              <Link className='cursor-pointer bg-blue-600 text-white rounded-lg  px-4 py-2 text-xl font-semibold  flex items-center   ' href={"/register"}>Register</Link>
//           </button>
//         </div>
//         </div>

//        </div>
//     <div
//   className="overflow-hidden transition-all duration-500"
//   style={{
//      clipPath: isOpen
//       ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
//       : "polygon(0 0, 100% 0, 100% 0.0001%, 0 0.0001%)",
//     transition: "clip-path 0.5s ease-in-out",
//   }}
// >
//          {isOpen  && <div className="bg-regal">
//          <ul
//           className=' flex flex-col  container mx-auto  space-y-3 transition-all duration-500'>
//             <li>
//                <Link onClick={()=>setOpen (false)} className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href="/">Home </Link>
//             </li>
//             <li>
//                 <Link onClick={()=>setOpen (false)} className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href="/articles">Articles  </Link>
//             </li>
//             <li>
//                 <Link onClick={()=>setOpen (false)} className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href="/about">About </Link>
//             </li>
//             <li>
//                 <Link onClick={()=>setOpen (false)} className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href={"/admin"}>Admin </Link>
//             </li>
//          </ul>
//       </div>}
//      </div>
//      </header>

//   )
// }

// export default Header


import { Navbar } from "@/components/header/Navbar";
import Link from "next/link";

import MobileMenu from "./MobileMenu";
import { verifyTokenForPage } from "@/apiCalls/articleApiCall";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

const Header = async () => {
//   السطر الأول
// const token = (await cookies()).get("jwtToken")?.value || "";

// 🧠 ليه كتبناه؟

// لأننا في Server Component
// مش عندنا request زي API route.

// فلازم نجيب الكوكي مباشرة من السيرفر.

// 🔍 اللي بيحصل هنا

// cookies() → تجيب كل الكوكيز

// .get("jwtToken") → هات التوكن

// ?.value → لو موجود هات القيمة

// || "" → لو مش موجود رجع string فاضية

// 🎯 ليه || "" ؟

// علشان:

// لو المستخدم مش مسجل دخول
// مفيش توكن
// فميحصلش Error.

// 📌 السطر التاني
// const payload = verifyTokenForPage(token);

// 🧠 ليه كتبناه؟

// علشان نفك الـ JWT
// ونطلع:

// id
// username
// isAdmin

// 🎯 إذًا السطرين بيعملوا إيه مع بعض؟
// cookies() → هات التوكن
// verifyToken → فك التوكن


// وفي الآخر يبقى عندك:

// payload = {
//    id: 5,
//    username: "ahmed",
//    isAdmin: false
// }


// أو:

// payload = null

  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
console.log("payload.isAdmin:", payload?.isAdmin, typeof payload?.isAdmin);
// Server Page
//    ↓
// cookies()
//    ↓
// verifyTokenForPage(token)
//    ↓
// payload

  return (
    <header className="fixed top-0 left-0 w-full bg-regal z-50 border-b-4 border-b-brd-gry">
      <div className="container mx-auto py-5 flex justify-between items-center">
        <MobileMenu />
        <Navbar isAdmin={payload?.isAdmin||false}/>
        
        {payload ? (
          <div className="flex items-center gap-4">
            <strong>{payload.username}</strong>
            <LogoutButton />
          </div>
        ) : (
          <>
            <div className="space-x-3">
              <button>
                <Link
                  className="cursor-pointer bg-blue-600 text-white rounded-lg  px-3 py-2 text-xl font-semibold  flex items-center   "
                  href={"/login"}
                >
                  Login
                </Link>
              </button>
              <button>
                <Link
                  className="cursor-pointer bg-blue-600 text-white rounded-lg  px-4 py-2 text-xl font-semibold  flex items-center   "
                  href={"/register"}
                >
                  Register
                </Link>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
