"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import { SidebarMobile } from "./_components/Sidebar-Mobile";
import { getProfileUser } from "@/api/profile-user";
import { useStore } from "@/context/store";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  // state Global
  const saveAdmin = useStore((state) => state.setSesionUser);

  useEffect(() => {
    const adminData = localStorage.getItem("identifier");
    if (!adminData) {
      redirect("/Inicio_sesion");
    }

    // Trae los datos del administrador desde el endpoint y los response como una promesa
    getProfileUser().then((adminFound) => {
      // se guardan los datos en el estado  global de zustand
      saveAdmin(adminFound);
    });
  }, []);

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
