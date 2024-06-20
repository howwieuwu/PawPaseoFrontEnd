/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrayElements } from "@/constants/ArrayElements";
import { useStore } from "zustand";

export const SidebarMobile = ({ open }) => {
  const saveAdmin = useStore((state) => state.sesionUser);
  const [activeView, setActiveView] = useState("");

  const handleSetActive = (name) => {
    setActiveView(name);
  };

  return (
    <nav
      className={cn(
        "absolute z-50 -left-[100%] top-0 bottom-0 bg-[#124C5F]  w-[19rem]  max-h-screen flex md:hidden flex-col justify-stretch transition-all duration-500 ease-in-out border-r",
        open ? "left-0" : "-left-[100%]"
      )}
    >
      <div className="w-full  grid place-content-center gap-8 py-5">
        {saveAdmin?.foto_perfil ?(
          <Image
          src={saveAdmin.foto_perfil}
          width={150}
          className="object-cover rounded-full h-[150px] w-[150px] "
          height={150}
          alt="Logo"
        />
        ) : (
          <div className="w-[150px] h-[150px] bg-gray-200 rounded-full animate-pulse"></div>
        )}
        <Link href={"/dashboard/editarPerfil"}>
          <button className="bg-[#FFB749] px-4 py-1 rounded-lg"> Editar Perfil </button>
        </Link>
      </div>
      <section className=" bg-white px-8 flex flex-col h-full justify-between rounded-tr-[100px]">
        <div className="h-[60%] mt-14">
          <ul className="flex flex-col  gap-2">
            {ArrayElements.map(({ name, Icon, link }) => (
              <Link
              href={link}
              key={name}
              className={`p-4 rounded-lg transition-colors ${
                activeView === name
                  ? "bg-[#124C5F] text-white"
                  : "hover:bg-[#124C5F] hover:text-white"
              }`}
              onClick={() => handleSetActive(name)} // Actualiza la vista activa al hacer clic
            >
              <li key={name} className="flex gap-2">
                <Icon className="w-5 h-5 object-cover" />
                <span>{name}</span>
              </li>
            </Link>
            ))}
          </ul>
        </div>

        <Link href={"/"}>
          <button className="bg-[#124C5F] py-2 text-white mb-5  rounded-lg w-full">
            Cerrar Sesion
          </button>
        </Link>
      </section>
    </nav>
  );
};
