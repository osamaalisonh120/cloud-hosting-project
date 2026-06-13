import RegisterForm  from '@/app/(user)/register/RegisterForm'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const page = async () => {
   const token = (await cookies()).get("jwtToken")?.value || "";
     if(token) redirect("/")
  return (
    <div className='container fix-height m-auto flex px-7 justify-center items-center'>
      <div className='w-full md:w-2/3 bg-white rounded-lg p-5 '>
          <h1 className="text-3xl font-bold text-gray-800 mb-5">Create New Account
</h1>
         <RegisterForm/>
      </div>
    </div>
  )
}

export default page
