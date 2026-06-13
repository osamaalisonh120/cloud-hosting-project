import prisma from "@/lib/prisma";
import { IUpdateCommeent } from "@/utils/dto";
// import { ICreatCommeent } from "@/utils/dto";
import { updateCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
interface IPropsComment{
    params:Promise<{ id: string }>
}

/**
 *  @method  PUT
 *  @route   ~/api/comments
 *  @desc    PUT Comments
 *  @access  private (only owner of the comment)
 */

export async function PUT(request: NextRequest,{params}:IPropsComment){

    try {
        const {id}=await params
        const Comment=await prisma.comment.findUnique({
         where:{id:parseInt(id)}   
        })
        if(!Comment){
           return NextResponse.json(
            { message: "Comment is not found" },
            { status: 401 }
           ) 
        }
        const CommentToken=verifyToken(request)
        // CommentToken.id دا العنصر الي عامل تسجيل دخول 
        // Comment.userIdدا العنصر الي جاي من قاعده البيانات  بيعرفني انهي مستخدم كتب التعليق 
        if(CommentToken === null|| CommentToken.id!==Comment.userId){
            return NextResponse.json(
                {message:"you are not allowed, access denied"},
                {status:403}) 
        }
        const body= (await request.json()) as IUpdateCommeent
    const validation = updateCommentSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: validation.error.issues[0].message },
          { status: 400 }
        );
      }
        const UpdatComment=await prisma.comment.update({
            where:{id:parseInt(id)} ,
            data:{
              text:body.text,
                
            } 
        })
          return NextResponse.json(
                {message:UpdatComment},
                {status:200}) 
    } catch (error) {
        console.error("Logout error:", error);
          return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );  
    }
}

/**
 *  @method  DELETE
 *  @route   ~/api/comments/:id
 *  @desc    Delete Comment
 *  @access  private (only admin OR owner of the comment)
 */

export async function DELETE(request: NextRequest,{params}:IPropsComment){
    try {
        const {id}=await params
        const Comment=await prisma.comment.findUnique({
         where:{id:parseInt(id)} ,
          
        })
        if(!Comment){
           return NextResponse.json(
            { message: "Comment is not found" },
            { status: 401 }
           ) 
        }
        const CommentToken=verifyToken(request)
        // CommentToken.id دا العنصر الي عامل تسجيل دخول 
        // Comment.userIdدا العنصر الي جاي من قاعده البيانات  بيعرفني انهي مستخدم كتب التعليق 
    
//     لو مفيش مستخدم
// أو
// (مش Owner ومش Admin)
// → امنع

    
        if(!CommentToken|| (CommentToken.id!==Comment.userId&&!CommentToken.isAdmin)){
            return NextResponse.json(
                {message:"you are not allowed, access denied"},
                {status:403}) 
        }
        const DeleteComment=await prisma.comment.delete({
            where:{id:parseInt(id)} ,
            
        })
        console.log(DeleteComment)
         return NextResponse.json(
                {message:"Delete comment"},
                {status:200}) 
    } catch (error) {
         console.error("Logout error:", error);
          return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );  
    }

}

//   const user = verifyToken(request);
//         if (user === null) {
//             return NextResponse.json(
//                 { message: 'no token provided, access denied' },
//                 { status: 401 }
//             )
//         }

//         if (user.isAdmin || user.id === comment.userId) {
//             await prisma.comment.delete({ where: { id: parseInt(params.id) } });
//             return NextResponse.json(
//                 { message: 'comment deleted' },
//                 { status: 200 }
//             )
//         }

//         return NextResponse.json(
//             { message: 'you are not allowed, access denied' },
//             { status: 403 }
//         )



// 🧠 أولًا: المطلوب منطقيًا

// انت كاتب في الـ comment فوق:

// @access private (only admin OR owner of the comment)


// يعني:

// ✔️ الأدمن يقدر يمسح أي تعليق
// ✔️ صاحب التعليق يقدر يمسحه
// ❌ أي حد تاني لا

// 🧩 البيانات اللي عندنا
// 1️⃣ التعليق من قاعدة البيانات
// const Comment = await prisma.comment.findUnique(...)


// تعويض مثال:

// Comment = {
//    id: 10,
//    text: "مقال رائع",
//    userId: 5
// }


// يعني:

// التعليق ده كتبه المستخدم رقم 5

// 2️⃣ المستخدم اللي عامل request (من التوكن)
// const CommentToken = verifyToken(request)


// تعويض مثال:

// CommentToken = {
//    id: 7,
//    isAdmin: false
// }


// يعني:

// المستخدم اللي بيحاول يمسح هو رقم 7
// ومش أدمن

// 🎯 الشرط المهم
// if(
//    !CommentToken ||
//    (CommentToken.id !== Comment.userId && !CommentToken.isAdmin)
// )


// خلينا نفكه بالعقل مش بالكود 👇

// 🧠 الجزء الأول
// !CommentToken


// يعني:

// مفيش توكن
// المستخدم مش مسجل دخول

// يبقى نمنعه ❌

// 🧠 الجزء الثاني
// (CommentToken.id !== Comment.userId && !CommentToken.isAdmin)


// نترجمه عربي:

// لو المستخدم مش هو صاحب التعليق
// وكمان مش أدمن

// يبقى امنعه ❌

// 🧮 خلينا نجرب حالات مختلفة
// الحالة 1️⃣: صاحب التعليق
// Comment.userId = 5
// CommentToken.id = 5
// isAdmin = false


// نحسب الشرط:

// CommentToken.id !== Comment.userId
// → 5 !== 5 → false


// يبقى:

// false && true = false


// فالشرط كله:

// if(false)


// ✔️ يسمح بالحذف

// الحالة 2️⃣: أدمن
// Comment.userId = 5
// CommentToken.id = 99
// isAdmin = true


// نحسب:

// CommentToken.id !== 5 → true
// !CommentToken.isAdmin → false


// يبقى:

// true && false = false


// ✔️ يسمح بالحذف

// الحالة 3️⃣: مستخدم عادي مش صاحب التعليق
// Comment.userId = 5
// CommentToken.id = 7
// isAdmin = false


// نحسب:

// 7 !== 5 → true
// !false → true


// يبقى:

// true && true = true


// فالشرط:

// if(true)


// ❌ يمنعه

// الحالة 4️⃣: مش مسجل دخول
// CommentToken = null

// !CommentToken = true


// ❌ يمنعه

// 🎯 ليه استخدمنا && مش || جوه القوس؟

// لأننا عايزين نقول:

// امنعه فقط لو الشرطين دول صح مع بعض

// يعني:

// مش هو صاحب التعليق

// ومش أدمن

// لو استخدمت || كانت هتبقى كارثة 🔥
// كان الأدمن نفسه هيتمنع

// 🧠 طريقة التفكير اللي توصلت بيها للشرط

// أنا بسأل نفسي:

// إمتى أسمح بالحذف؟

// الإجابة:

// if (isOwner OR isAdmin)
//     allow
// else
//     deny


// أحوّلها لعكسها عشان أحطها في if:

// if NOT (isOwner OR isAdmin)
//     deny


// وباستخدام قوانين المنطق (De Morgan):

// NOT (A OR B)
// = (NOT A AND NOT B)


// فتبقى:

// if (not owner AND not admin)
//     deny


// وده بالضبط:

// (CommentToken.id !== Comment.userId && !CommentToken.isAdmin)

// 🧠 ترجمة الشرط بالكامل بالعربي
// لو مفيش مستخدم
// أو المستخدم مش صاحب التعليق ومش أدمن
// يبقى امنعه

// 🏁 الخلاصة

// ✔️ كتبت الشرط بالشكل ده عشان تطبق:

// Owner OR Admin


// ✔️ استخدمت عكسها عشان تمنع:

// NOT Owner AND NOT Admin


// ✔️ الشرط منطقي وآمن
// ✔️ تفكير Authorization سليم جدًا 👏