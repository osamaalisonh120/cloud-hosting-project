import AdminSidebar from "@/app/admin/AdminSidebar"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This Is Admin Page",
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
     <section className="overflow-height flex justify-center items-start overflow-hidden">
    <div className=" overflow-height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
          <AdminSidebar />
        </div>
   <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
     {children}
   </div>
    </section>
  )
}