// API Route
//    ↓
// verifyToken(request)
//    ↓
// payload

// الدالة الأولى
// verifyToken(request: NextRequest)

// 🎯 بتستخدمها إمتى؟

// في:

// API Routes

// Middleware

// لأن هناك عندك request.

// 🧠 إزاي فكرت فيها؟

// قلت:

// 1️⃣ في API عندي request
// 2️⃣ التوكن جاي في Cookie
// 3️⃣ أجيب التوكن من request
// 4️⃣ أفكه
// 5️⃣ أرجّع المستخدم

// 🔁 اللي بيحصل جواها
// request
//    ↓
// request.cookies.get("jwtToken")
//    ↓
// jwt.verify
//    ↓
// usersFromToken

// 📌 تستخدمها هنا:
// export async function DELETE(request: NextRequest) {
//    const user = verifyToken(request)
// }

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { IJWTpaylods } from "./types";

export  function verifyToken(request:NextRequest):IJWTpaylods |null
{
 const jwtTokens= request.cookies.get("jwtToken")
  if (!jwtTokens) return null;
const AuthToken=jwtTokens?.value as string;
const PriviteKey=process.env.JWT_SECRET as string
const usersFromToken=jwt.verify(AuthToken,PriviteKey) as IJWTpaylods
return usersFromToken
}

// 1️⃣ Request السيرفر يستقبل 

//2️⃣ jwtToken اسمها Cookieيدور على 
// 3️⃣ لو مش موجودة
//     ➡️ المستخدم مش مسجل دخول
//     ➡️ return null

// 4️⃣ لو موجودة
//     ➡️ ياخد التوكن
//     ➡️ يجيب JWT_SECRET

// 5️⃣ يعمل:

// jwt.verify(token, secret)


// 6️⃣ لو التوكن:

// ❌ منتهي / مزور → null

// ✅ سليم → يرجّع بيانات المستخدم



//         ┌───────────────┐
//         │   Request     │
//         │ (NextRequest) │
//         └───────┬───────┘
//                 │
//                 ▼
//      ┌────────────────────┐
//      │ هل يوجد Cookie     │
//      │ باسم "jwtToken" ؟ │
//      └───────┬────────────┘
//              │
//       ┌──────┴──────┐
//       │             │
//      لا             نعم
//       │             │
//       ▼             ▼
// ┌────────────┐   ┌───────────────────┐
// │ return     │   │ استخراج قيمة       │
// │ null       │   │ التوكن (string)    │
// └────────────┘   └─────────┬─────────┘
//                             │
//                             ▼
//                ┌────────────────────────┐
//                │ جلب JWT_SECRET من .env │
//                └─────────┬──────────────┘
//                             │
//                             ▼
//                ┌────────────────────────┐
//                │ jwt.verify(token, key) │
//                └─────────┬──────────────┘
//                             │
//               ┌─────────────┴─────────────┐
//               │                           │
//         ❌ توكن غير صالح            ✅ توكن صالح
//               │                           │
//               ▼                           ▼
//         (Error / null)        ┌────────────────────┐
//                               │ بيانات المستخدم   │
//                               │ (IJWTpaylods)     │
//                               └─────────┬─────────┘
//                                         │
//                                         ▼
//                                    return user
