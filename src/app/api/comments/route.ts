import prisma from "@/lib/prisma";
import { ICreatCommeent } from "@/utils/dto";
import { createNewCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
/**
 *  @method  POST
 *  @route   ~/api/comments
 *  @desc    Create New Comment
 *  @access  private (only logged in user)
 */
export async function POST(request: NextRequest){
    try {
        const user =verifyToken(request)
    if(!user){
        return NextResponse.json(
            {message:"only logged in user, access denied"},{status:401})
    }
    const body= (await request.json()) as ICreatCommeent
    const validation = createNewCommentSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: validation.error.issues[0].message },
          { status: 400 }
        );
      }
      const  newComment = await prisma.comment.create({
        data:{
            text:body.text,
            articleId:body.articleId,  
            // articleId في قاعده البيانات articleبتاع الidدا
            userId:user.id
        }
      })
       return NextResponse.json(newComment,{status:200})
    } catch (error) {
        console.error("Logout error:", error);
          return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        ); 
    }
}


// 🧠 أولًا: المقال بييجي منين؟

// تخيل إن عندك صفحة مقال:

// http://localhost:3000/articles/1


// الرقم اللي في الآخر ده 👇

// 1


// هو ID المقال.

// 🧩 مين بيعرف الرقم ده؟

// الـ Frontend.

// لأن الصفحة نفسها مبنية على ID:

// في Next.js مثلاً:

// app/articles/[id]/page.tsx


// لو دخلت:

// /articles/1


// يبقى:

// params.id = "1"


// يعني الصفحة عارفة إنها بتعرض المقال رقم 1.

// 🎯 طيب لما المستخدم يكتب تعليق؟

// المستخدم واقف على:

// /articles/1


// وكتب:

// "مقال ممتاز"


// فالـ Frontend لازم يبعت:

// {
//   "text": "مقال ممتاز",
//   "articleId": 1
// }


// ليه؟
// لأن السيرفر مش عارف المستخدم كان واقف على أنهي مقال
// إلا لو بعتهاله.

// 🔁 الصورة الكاملة وقت التنفيذ
// 👤 المستخدم:

// واقف على صفحة:

// /articles/1

// 🧠 الصفحة عارفة:
// articleId = 1

// 📤 لما يضغط Add Comment:

// الـ Frontend يعمل:

// POST /api/comments


// Body:

// {
//   "text": "مقال ممتاز",
//   "artait prisma.comment.create({
//   data: {
//     text: body.text,
//     articleId: body.articleId,
//     userId: user.id
//   }
// })
// icleId": 1
// }

// 🧩 السيرفر يستقبل:
// const body = await request.json();


// يبقى:

// body.text = "مقال ممتاز"
// body.articleId = 1

// 🏗️ بعدين السيرفر يعمل:
// await prisma.comment.create({
//   data: {
//     text: body.text,
//     articleId: body.articleId,
//     userId: user.id
//   }
// })


// يعني:

// INSERT INTO Comment
// text = "مقال ممتاز"
// articleId = 1
// userId = 5

// 🧠 مثال بالأرقام عشان تثبت الفكرة
// عندك في DB:
// Article table:
// id	title
// 1	React
// 2	Next.js
// المستخدم فتح:
// /articles/1


// يبقى هو بيقرأ مقال React.

// كتب تعليق

// الـ body:

// {
//   "text": "جميل جدًا",
//   "articleId": 1
// }

// النتيجة في DB:

// Comment table:

// id	text	articleId	userId
// 10	جميل جدًا	1	5
// 🧠 طيب إزاي أتأكد إن 1 ده صحيح؟

// لازم تعمل خطوة مهمة جدًا 👇

// const article = await prisma.article.findUnique({
//   where: { id: body.articleId }
// })


// لو رجعت null
// يبقى:

// المقال مش موجود

// وترجع 404

// 🔥 خلاصة الفكرة
// القيمة	جايه منين؟
// text	المستخدم
// articleId = 1	الصفحة اللي المستخدم واقف عليها
// userId	التوكن











/**
 *  @method  GET
 *  @route   ~/api/comments
 *  @desc    Get All Comments
 *  @access  private (only admin)
 */
export async function GET(request: NextRequest){
    try {
        const user=verifyToken(request)
        if(user === null || user.isAdmin === false){
            return NextResponse.json({message:"only admin, access denied"},{status:401}) 
        }
        const comment=await prisma.comment.findMany()
        return NextResponse.json(comment,{status:200})
    } catch (error) {
        console.error("Logout error:", error);
          return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        ); 
    }
}