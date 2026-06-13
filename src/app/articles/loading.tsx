import React from "react";
const pages = [1, 2, 3, 4, 5,6];
export default function loading() {
  return (
    <main className=" fix-height container mx-auto px-5 animate-pulse">
      <div className="my-5 bg-gray-300 w-full h-12 rounded md:w-2/3 mx-auto mb-3"></div>
 <div className="mt-7  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {pages.map((item) => (
        <div
          key={item}
          className="bg-gray-200 p-5"
        >
          <div className="flex items-start gap-4">
            <div className="bg-gray-300  w-10 h-10 flex items-center rounded justify-center font-bold"></div>
            <div className="flex-1">
              <h2 className="mb-2 bg-gray-300 h-6"></h2>
              <p className="bg-gray-300 h-6"></p>
            </div>
          </div>
        </div>
      ))}

      </div>
     <div className=" flex items-center justify-center mt-5">
       
        
        <div className="w-1/2 bg-gray-300 h-10 mt-5 rounded-sm py-1 px-3  cursor-pointer " >
          
           </div> 
      </div>
  
    </main>
  );
}


