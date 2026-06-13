'use client'
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import Link from "next/link"

const MobileMenu = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(p => !p)} className="text-[40px]">
        {isOpen ? <IoMdClose /> : <AiOutlineMenu />}
      </button>

      {isOpen && (
        <ul className="flex flex-col space-y-3 mt-4">
          <li><Link onClick={()=>setOpen(false)} href="/">Home</Link></li>
          <li><Link onClick={()=>setOpen(false)} href="/articles">Articles</Link></li>
          <li><Link onClick={()=>setOpen(false)} href="/about">About</Link></li>
          <li><Link onClick={()=>setOpen(false)} href="/admin">Admin</Link></li>
        </ul>
      )}
    </div>
  )
}

export default MobileMenu;
