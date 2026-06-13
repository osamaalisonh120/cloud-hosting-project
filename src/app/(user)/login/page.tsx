import LoginForm from '@/app/(user)/login/LoginForm'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


const page = async () => {
   const token = (await cookies()).get("jwtToken")?.value || "";
   if(token) redirect("/")
// redirect("/")
//   أصلاً تتعملش render ما Login / Register صفحة → Token فيه  لو 
//   Home على  مباشرة المستخدم يودّي  والسيرفر
  return (
    <div className='container fix-height m-auto flex px-7 justify-center items-center'>
      <div className='w-full md:w-2/3 bg-white rounded-lg p-5 '>
          <h1 className="text-3xl font-bold text-gray-800 mb-5">Log In</h1>
         <LoginForm/>
      </div>
    </div>
  )
}

export default page
