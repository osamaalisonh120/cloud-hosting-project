import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";

export default function Home() {
  return (
    <div >
     <Hero/>
   <div className='container m-auto '>
     <h2 className="text-center mt-10 text-3xl font-bold">
        Choose Your Web Hosting Plan
    </h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:gap-7'>
     
       <WebHostingPlan/>
        <WebHostingPlan/>
         <WebHostingPlan/>
      </div>
   </div>
    </div>
  );
}
