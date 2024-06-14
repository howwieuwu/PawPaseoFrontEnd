"use client";
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import { SidebarMobile } from "./_components/Sidebar-Mobile";
import { redirect } from "next/navigation";
import axios from "axios";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});

  // cuando los cors esten habilitados =>
  // const dataUser = async () => {
  //   const response = await fetch("https://prueba-backend-phi.vercel.app/admin/profile", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });

  //   const data = await response.json();
  //   // guardar datos del usuario en un estado

  //   // setUserData(data);
  // };

  useEffect(() => {
    // dataUser();
    const adminData = sessionStorage.getItem("identifier");
    if (!adminData) {
      redirect("/Inicio_sesion");
    }

    setUserData(JSON.parse(adminData));
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-screen">
        <Sidebar idUser={userData?.id} />
        <SidebarMobile open={open} />
        <div className="flex flex-col w-full">
          <Header setOpen={setOpen} open={open} userData={userData} />
          {children}
        </div>
      </div>
    </>
  );
}
