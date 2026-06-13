// GET Single Post
import prisma from '@/lib/prisma';

import { IUpdateArticleDto } from '@/utils/dto';
import { verifyToken } from '@/utils/verifyToken';
import { NextRequest, NextResponse, } from 'next/server'

/**
 *  @method  GET
 *  @route   ~/api/articles/:id
 *  @desc    Get Single Article By Id
 *  @access  public
 */

// نوع الـ params في App Router
type ParamsType = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: ParamsType
) {
  const { id } = await params;
  const Idarticle= parseInt(id);

  // البحث عن المقال
  const article = await prisma.article.findUnique({
    where: { id: Idarticle },
    include: {
      comments: {
        include: {
          user: {
            select:{
              username:true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }

    }
  });

  if (!article) {
    return NextResponse.json(
      {
        success: false,
        error: 'Article not found'
      },
      { status: 404 }
    );
  }

  return NextResponse.json( 
      article,
    { status: 200 }
  );
}

// ***********************************
//   import { articles } from '@/utils/data'
//  import {  NextRequest , NextResponse } from 'next/server'
//   interface IPropsParms {
//   params:Promise<{ id: string }>
//  }
// export async function GET(request: NextRequest,{params}:IPropsParms) {
//      const { id } = await params;
//      const SingleArticle=articles.find((el)=>el.id==parseInt(id))
//     if(!SingleArticle){
//          return NextResponse.json(
//              {message:"Article not found"},
//            {status:404}
//          )
//      }
//  return NextResponse.json({message:SingleArticle}, { status: 200 })
//  }






// *********************************************

// POST Single Post

/**
 *  @method  PUT
 *  @route   ~/api/articles/:id
 *  @desc    Update Article
 *  @access  private (only admin can update article)
 */
interface IPropsParms {
  params: Promise<{ id: string }>
}
export async function PUT(request: NextRequest, { params }: IPropsParms) {
  try {
    const { id } = await params;
    const SingleArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) }
    })
    if (!SingleArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      )
    }
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }

    const data = (await request.json()) as IUpdateArticleDto
    
    const updaterArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        description: data.description
      },
      
    })
    return NextResponse.json(updaterArticle, { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// DELETE Methods

/**
 *  @method  DELETE
 *  @route   ~/api/articles/:id
 *  @desc    Delete Article
 *  @access  private (only admin can delete article)
 */
interface IPropsParms {
  params: Promise<{ id: string }>
}
export async function DELETE(request: NextRequest, { params }: IPropsParms) {
  try {
    const { id } = await params;
    const SingleArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include:{
            comments:true
         } 
    })

    if (!SingleArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      )
    }
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }
// دي هتطلع mapال
// [10, 11, 12]
const CommentId:number[]= SingleArticle?.comments.map(comment=>comment.id)
//  بتاعها موجود في المصفوفه دي ID امسح كل التعليقات اللي 
// يعني:

// DELETE FROM Comment
// WHERE id IN (10,11,12)

     await prisma.comment.deleteMany({
      where:{id:{in:CommentId}}
     })
    await prisma.article.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ message: "data is DELETE" }, { status: 200 })
  } catch (error) {
     console.log(error)
    return NextResponse.json(
      
      { message: "internal server error" },
      { status: 500 }
    );
  }
}