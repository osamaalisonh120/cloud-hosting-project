// import { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ICreateLoginDto } from "@/utils/dto";
import { loginSchema  } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import {  setCookie } from "@/utils/generateToken";
import { IJWTpaylods } from "@/utils/types";


/**
 *  @method  POST
 *  @route   ~/api/users/login
 *  @desc    Login User [(Log In) (Sign In) (تسجیل الدخول)]
 *  @access  public
 */


export async function POST(request: NextRequest) {
 try {
     const body = (await request.json()) as ICreateLoginDto;

  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  const foundUser = await prisma.user.findUnique({
    where: { email: body.email }
  });

  if (!foundUser) {
    return NextResponse.json(
      { message: 'invalid email or password' },
      { status: 400 }
    );
  }
const isPasswordMatch=await bcrypt.compare(body.password , foundUser.password)

if(!isPasswordMatch){
 return NextResponse.json(
            { message: "invalid email or password" },
            { status: 400 }
        ); 
}
const jwtpaylods:IJWTpaylods={
     
      id: foundUser.id,
       username:foundUser.username,
      isAdmin: foundUser.isAdmin,
}

const cookie=setCookie(jwtpaylods)

  return NextResponse.json({message: 'Authenticated' },
     { status: 200 ,
      headers:{"Set-Cookie":cookie}
      
     });
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 } catch (error) {
     return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        ); 
 }
}
