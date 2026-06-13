import { Article } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { ICreateArticleDto } from "@/utils/dto";
import { createArticleSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
/**
 *  @method  GET
 *  @route   ~/api/articles
 *  @desc    Get Articles By Page Number
 *  @access  public
 * GET /api/articles?pageNumber=1
 */
// pageNumberعشان اجيب قيمهsearchParams انا كتبت 
export async function GET(request: NextRequest) {
  const pageNumber =request.nextUrl.searchParams.get("pageNumber") ||"1"

  const articles = await prisma.article.findMany({
    skip:ARTICLE_PER_PAGE*(parseInt(pageNumber)-1),
    take:ARTICLE_PER_PAGE,
    orderBy:{createdAt:"desc"}
  });
  return NextResponse.json(articles);
}

// *********************************************

/**
 *  @method  POST
 *  @route   ~/api/articles
 *  @desc    Create New Article
 *  @access  private (only admin can create article)
 */
export async function POST(request: NextRequest) {
   const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }

  const body = (await request.json()) as ICreateArticleDto;

  const validation = createArticleSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  const newArticle:Article = await prisma.article.create({
    data: {
      title: body.title,
      description: body.description
    }
  });

  return NextResponse.json(newArticle, { status: 201 });
}
