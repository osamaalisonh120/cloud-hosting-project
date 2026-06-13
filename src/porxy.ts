// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {

//  const jwtTokens= request.cookies.get('jwtToken') 
// const AuthToken=jwtTokens?.value as string
//     if(!AuthToken){
//        if(request.nextUrl.pathname.startsWith("/api/users/profile/")){
//          return NextResponse.json(
//         { message: 'not token provided,assess denied' },
//         { status: 401 }
//     )
//        }
//     }
//     else{
//       if(request.nextUrl.pathname==="/login" ||
//         request.nextUrl.pathname==="/register"
//       )
//         {
//              return NextResponse.redirect(new URL("/",request.url))
//       }
//     }
// }

// export const config = {
//   matcher: ["/api/users/profile/:path*", "/login" , "register"]
// }

// import { NextRequest, NextResponse } from 'next/server';

// export function proxy(request: NextRequest) {

//   const jwtToken = request.cookies.get("jwtToken");
//   const token = jwtToken?.value as string;
// const pathname = request.nextUrl.pathname;

//   console.log("🔥 MIDDLEWARE HIT:", pathname, "token:", !!token);
//   if (!token) {
//     if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
//       return NextResponse.json(
//         { message: 'no token provided, access denied' },
//         { status: 401 } // Unauthorized
//       );
//     }
//   } else {
//     if (
//       request.nextUrl.pathname === "/login" ||
//       request.nextUrl.pathname === "/register"
//     ) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }
// }

// export const config = {

// matcher: ['/api/users/profile/:path*', '/login', '/register']

// }
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // const token = request.cookies.get("jwtToken")?.value;
  // const pathname = request.nextUrl.pathname;

  // console.log("🔥 PROXY HIT:", pathname, "token:", !!token);
console.log("proxy.tx page")
  // 🚫 لو مسجل دخول → ممنوع login / register
  // if (token && (pathname === "/login" || pathname === "/register")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // // 🔒 حماية API
  // if (!token && pathname.startsWith("/api/users/profile")) {
  //   return NextResponse.json(
  //     { message: "no token provided, access denied" },
  //     { status: 401 }
  //   );
  // }

  // return NextResponse.next();
}

// export const config = {
//   matcher: ["/login", "/register", "/api/users/profile/:path*"],
// };



  // const decoded = verifyJwt(token);

  // // لو التوكن غير صالح
  // if (!decoded) {
  //   return NextResponse.json(
  //     { message: "invalid token" },
  //     { status: 401 }
  //   );
  // }