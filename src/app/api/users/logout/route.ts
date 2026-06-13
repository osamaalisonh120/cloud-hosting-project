import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  GET
 *  @route   ~/api/users/logout
 *  @desc    Logout User
 *  @access  public
 */
export  async function GET(request: NextRequest){
    try {
        
         (await cookies()).delete("jwtToken");
       return NextResponse.json({message:'Logged out successfully'},{status:200})
    } catch (error) {
         console.error("Logout error:", error);
          return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        ); 
    }
}



// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // يجب استخدام await
//     const cookieStore = await cookies();
    
//     // حذف الكوكي
//     cookieStore.delete("jwtToken");
    
//     // يمكنك أيضاً حذف متعدد
//     // cookieStore.delete("refreshToken");
    
//     return NextResponse.json(
//       { message: "Logged out successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Logout error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }