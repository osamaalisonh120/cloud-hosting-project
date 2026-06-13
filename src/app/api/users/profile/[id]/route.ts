import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dto";
import { updateUserSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
interface IPropsProfile {
  params: Promise<{ id: string }>
}
/**
 *  @method  DELETE
 *  @route   ~/api/users/profile/:id
 *  @desc    Delete Profile
 *  @access  private (only user himself can delete his account)
 */

export async function DELETE(request: NextRequest, { params }: IPropsProfile) {
  try {
    const { id } = await params
    const userProfile = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true }
    })
    if (!userProfile) {
      return NextResponse.json(
        { message: "user is not found" },
        { status: 404 })
    }

    const usersFromToken = verifyToken(request)

    if (usersFromToken !== null && usersFromToken.id == userProfile.id) {
      const UserId: number[] = userProfile?.comments.map(comment => comment.id)
      await prisma.comment.deleteMany({
        where: { id: { in: UserId } }
      })
      await prisma.user.delete({
        where: { id: parseInt(id) }
      })
      return NextResponse.json(
        { message: "user deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: 'only user himself can delete his profile, forbidden' },
      { status: 403 }
    )
    // طريقه اخري لحذف الحساب
    // const userFromToken = verifyToken(request);

    // if (userFromToken === null || userFromToken.id !== user.id) {
    //   return NextResponse.json(
    //     { message: 'only user himself can delete his profile, forbidden' },
    //     { status: 403 }
    //   );
    // }

    // // deleting the user
    // await prisma.user.delete({ where: { id: parseInt(params.id) } });

    // return NextResponse.json(
    //   { message: 'your profile (account) has been deleted' },
    //   { status: 200 }
    // );



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }

}

// ******************************

// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { IJWTpaylods } from "@/utils/types";

// interface IPropsProfile {
//   params: { id: string };
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: IPropsProfile
// ) {
//   try {
//     const userId = parseInt(params.id);

//     const userProfile = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!userProfile) {
//       return NextResponse.json(
//         { message: "user is not found" },
//         { status: 404 }
//       );
//     }

//     // ✅ Authorization Header
//     const authHeader = request.headers.get("authorization");

//     if (!authHeader) {
//       return NextResponse.json(
//         { message: "no token provided, access denied" },
//         { status: 401 }
//       );
//     }

//     const token = authHeader.split(" ")[1];

//     const userFromToken = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as IJWTpaylods;

//     // ✅ authorization check
//     if (userFromToken.id !== userProfile.id) {
//       return NextResponse.json(
//         { message: "only user himself can delete his profile" },
//         { status: 403 }
//       );
//     }

//     await prisma.user.delete({
//       where: { id: userId },
//     });

//     return NextResponse.json(
//       { message: "user deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "internal server error" },
//       { status: 500 }
//     );
//   }
// }

/**
 *  @method  GET
 *  @route   ~/api/users/profile/:id
 *  @desc    Get Profile By Id
 *  @access  private (only user himself can get his account/profile)
 */
export async function GET(request: NextRequest, { params }: IPropsProfile) {
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      isAdmin: true,
    }
  })
  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 400 })
  }
  const getuser = verifyToken(request)
  if (getuser == null || getuser.id !== user.id) {
    return NextResponse.json(
      { message: 'you are not allowed, access denied' },
      { status: 403 }
    )
  }

  return NextResponse.json(user, { status: 200 });
}

/**
 *  @method  PUT
 *  @route   ~/api/users/profile/:id
 *  @desc    Update Profile
 *  @access  private (only user himself can update his account/profile)
 */

export async function PUT(
  request: NextRequest,
  { params }: IPropsProfile
) {
  const { id } = await params

  const userEdit = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!userEdit) {
    return NextResponse.json(
      { message: "user not found" },
      { status: 404 }
    );
  }

  const getuser = verifyToken(request);

  if (!getuser || getuser.id !== userEdit.id) {
    return NextResponse.json(
      { message: "you are not allowed, access denied" },
      { status: 403 }
    );
  }

  const body = (await request.json()) as UpdateUserDto;

  const validation = updateUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  if (body.password) {

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      username: body.username,
      email: body.email,
      password: body.password,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      isAdmin: true,
    }
  });



  return NextResponse.json(updatedUser, { status: 200 });
}
