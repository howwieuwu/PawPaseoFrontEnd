"use client";
import { useState } from "react";
import Header from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import { SidebarMobile } from "./_components/Sidebar-Mobile";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

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
