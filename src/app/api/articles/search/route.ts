import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



/**
 *  @method  GET
 *  @route   ~/api/articles/search?searchText=value
 *  @desc    Get Articles By Search Text
 *  @access  public
 */
export async function GET(request: NextRequest){
try {
    const searchText =request.nextUrl.searchParams.get("searchText")
let article;
if(searchText){
 article=await prisma.article.findMany({
    where:{
       title:{
        startsWith:searchText,
        mode:"insensitive"
       } 
    }
})
}
else{
article=await prisma.article.findMany({
    take:6
})
}
return NextResponse.json(article,{status:200})
} catch (error) {
     console.log(error)
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
}
}