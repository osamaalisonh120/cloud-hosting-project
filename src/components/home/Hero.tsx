
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import CloudImage from "../../../public/cloud-hosting.png"
export default function Hero() {
  return (
    <div className="flex items-center justify-between  hero-section">
      <div>
        <h1 className="text-5xl font-bold text-black">Cloud Hosting</h1>
        <p className="text-xl">The best web hosting solution for your online success</p>
        <div className="p-1 mt-4">
         <div className="flex items-center text-xl font-bold mb-2 text-gray-600">
             <TiTick />  Easy To Use Control Panel
          </div>
          <div className="flex items-center text-xl font-bold mb-2 text-gray-600">
             <TiTick />  Secure Hosting
          </div>
          <div className="flex items-center text-xl font-bold mb-2 text-gray-600">
             <TiTick /> Website Maintenance
          </div>
        </div>
      </div>
      <div>
        <Image src={CloudImage} height={500} width={500} alt='cloud'/>
      </div>
    </div>
  )
}
