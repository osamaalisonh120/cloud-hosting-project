
import bcrypt from 'bcryptjs';
// import { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ICreateRegisterDto } from "@/utils/dto";
import { registerSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { IJWTpaylods } from '@/utils/types';
import { setCookie } from '@/utils/generateToken';
// /**
//  *  @method  POST
//  *  @route   ~/api/users/register
//  *  @desc    Create New User [(Register) (Sign Up) (انشاء حساب)]
//  *  @access  public
//  */
// // 🟢 الترتيب الصح دايمًا

// // 1️⃣ استقبل البيانات
// // 2️⃣ اعمل validation
// // 3️⃣ شيّك هل موجود
// // 4️⃣ اعمل hash
// // 5️⃣ خزّن
// // 6️⃣ رجّع response
// export async function POST(request: NextRequest) {
//   const body = (await request.json()) as ICreateRegisterDto;

//   const validation = registerSchema.safeParse(body);
//   if (!validation.success) {
//     return NextResponse.json(
//       { message: validation.error.issues[0].message },
//       { status: 400 }
//     );
//   }

//   const foundUser = await prisma.user.findUnique({
//     where: { email: body.email }
//   });

//   if (foundUser) {
//     return NextResponse.json(
//       { message: 'this user already registered' },
//       { status: 400 }
//     );
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(body.password, salt);

//   const newUser = await prisma.user.create({
//     data: {
//       username: body.username,
//       email: body.email,
//       password: hashedPassword
//     },
//     select:{
//       username:true,
//       id: true,
//       isAdmin: true,
//     }
//   });
//   const jwtpaylodsRegister:IJWTpaylods={
       
//         id: newUser.id,
//          username:newUser.username,
//         isAdmin: newUser.isAdmin,
//   }

// const Cookie=setCookie(jwtpaylodsRegister)

//   return NextResponse.json({...newUser},
//      { status: 201,
//       headers:{"Set-Cookie":Cookie}
//       });
// }
export async function POST(request: NextRequest) {

  // 1️⃣ استقبل الداتا
  const body = (await request.json()) as ICreateRegisterDto;

  // 2️⃣ Validation
  const validation = registerSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  // 3️⃣ تأكد إن الإيميل مش موجود
  const foundUser = await prisma.user.findUnique({
    where: { email: body.email }
  });

  if (foundUser) {
    return NextResponse.json(
      { message: 'this user already registered' },
      { status: 400 }
    );
  }

  // 4️⃣ Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  // 5️⃣ Create
  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: hashedPassword
    },
    select:{
      username:true,
      id: true,
      isAdmin: true,
    }
  });

  // 6️⃣ JWT + Cookie
  const jwtpaylodsRegister: IJWTpaylods = {
    id: newUser.id,
    username: newUser.username,
    isAdmin: newUser.isAdmin,
  }

  const Cookie = setCookie(jwtpaylodsRegister)

  return NextResponse.json(
    { ...newUser },
    { status: 201, headers: { "Set-Cookie": Cookie } }
  );
}
