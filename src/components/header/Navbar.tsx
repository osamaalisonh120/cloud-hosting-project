

// const Navbar = () => {
//         // const[isOpen,setOpen]=useState(false)
//   return (
   
//      <div className='flex items-center gap-9 '>
//       <div>
//           <Link className=' hidden lg:flex font-bold items-center text-[24px] uppercase text-custom-purple' href="/">
//             cloud
//          <GrTechnology />
         
//             hosting
//           </Link>
        
//       </div>
//       <div 
//     className="hidden lg:block"
    
// >
//          <ul className=' flex  space-x-8'>
//             <li >
//              <Link className='capitalize text-[20px] hover:text-[darkblue] transition-all duration-300  font-semibold' href="/">home</Link>
//             </li>
//             <li >
//              <Link className='capitalize text-[20px]  hover:text-[darkblue] transition-all duration-300 font-semibold' href="/articles">articles</Link>
    
//             </li>
//             <li >
//             <Link className='capitalize text-[20px] hover:text-[darkblue] transition-all duration-300  font-semibold' href="/about">about</Link>
    
//             </li>
//              <li >
//             <Link className='capitalize text-[20px] hover:text-[darkblue] transition-all duration-300  font-semibold' href="/admin">admin</Link>
    
//             </li>
//          </ul>
//       </div>
    
  
//      </div>

//   )
// }

// export default Navbar
'use client'
import Link from 'next/link'
import { GrTechnology } from "react-icons/gr";
interface NavbarProps {
    isAdmin: boolean;
}

export const Navbar = ({isAdmin}: NavbarProps) => {
  return (
    <div className='flex items-center justify-between'>
        <div className=''>
           <Link className='hidden lg:flex items-center font-bold text-[24px] uppercase text-custom-purple ' href="/">
            cloud
         <GrTechnology />
                   hosting
          </Link>
        
      </div>
      <div>
         <ul className='hidden lg:flex items-center ml-7 space-x-3'>
            <li>
               <Link className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href="/">Home </Link>
            </li>
            <li>
                <Link className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href="/articles?pageNumber=1">Articles  </Link>
            </li>
            <li>
                <Link className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href="/about">About </Link>
            </li>
           {isAdmin&&
           <li>
             <Link className='capitalize font-semibold text-[20px] hover:text-[darkblue] transition-all duration-300' href={"/admin"}>Admin </Link>
            </li>
           }
            
         </ul>
      </div>
      
    </div>
  )
}







































