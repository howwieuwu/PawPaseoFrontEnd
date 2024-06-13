"use client";
import { useState } from "react";
import Header from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import { SidebarMobile } from "./_components/Sidebar-Mobile";
// import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  // const {data } =  getlocalStorage('user')
  // if(!data){
  //   redirect('/login')
  // }

  return (
    <>
      <div className="flex min-h-screen w-screen">
        <Sidebar />
        <SidebarMobile open={open} />
        <div className="flex flex-col w-full">
          <Header setOpen={setOpen} open={open} />
          {children}
        </div>
      </div>
    </>
  );
}
