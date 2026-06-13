import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


/**
 *  @method  GET
 *  @route   ~/api/articles/count
 *  @desc    Get Articles Count
 *  @access  public
 */

export async function GET(request: NextRequest){
   try {
     const count =await prisma.article.count()
    return NextResponse.json( { count  },{status:200})
   } catch (error) {
    console.log(error)
    return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        ); 
   }
}

// 1️⃣
// const count = await prisma.article.count()


// Prisma هنا بيعمل Query على الداتا بيز:

// SELECT COUNT(*) FROM Article


// ويرجع رقم

// مثلاً:

// 27

// 2️⃣
// return NextResponse.json({ count }, { status: 200 })


// ليه رجعناه Object مش رقم بس؟

// بدل ما نرجع:

// 27


// رجعنا:

// {
//   "count": 27
// }