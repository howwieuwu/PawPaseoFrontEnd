import React from "react";
import Paw from "@/../public/image/Paw.png";
import Image from "next/image";
import { RiMenuFill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

function HeaderAdmin({ setOpen, open, userData }) {
  return (
    <header className="flex items-center justify-between h-14 px-4  md:h-20 bg-[#e2e1e1] w-full ">
      <h1 className="font-bold txt-xl md:text-3xl ">Bienvenido, {userData?.nombre}</h1>
      <div className="flex-1"></div>
      <picture className=" hidden md:flex text-[#FFB749] font-bold text-md md:text-2xl  items-center">
        Paw<span className="text-[#124C5F] font-bold">-Paseo</span>
        <Image
          alt="Paw-Paseo"
          src={Paw}
          width={264}
          height={121}
          className=" w-12 md:w-24 h-8  md:h-16 mx-2 md:mr-5  "
        />
      </picture>

      {open ? (
        <RiCloseFill
          className="md:hidden h-6 w-6 cursor-pointer "
          onClick={() => setOpen(false)}
        />
      ) : (
        <RiMenuFill
          className="md:hidden h-6 w-6 cursor-pointer "
          onClick={() => setOpen(true)}
        />
      )}
    </header>
  );
}

export default HeaderAdmin;
