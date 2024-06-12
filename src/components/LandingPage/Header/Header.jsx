import Link from "next/link";
import React from "react";
import Image from "next/image";
import Paw from "@/../public/image/Paw.png";
import { RiMenu2Line } from "react-icons/ri";

export const Header = () => {
    return (
        <nav id="inicio" className="py-2 xl:py-5 w-full bg-[#e2e1e1] max-sm:h-[8vh]">
            <div className="flex items-center justify-between px-4 xl:px-6 mx-auto">
                <picture className="flex items-center gap-2">
                    <Image
                        src={Paw}
                        width={264}
                        height={121}
                        className="h-12 w-12 object-contain lg:h-16 lg:w-24 max-sm:w-[100px] sm:items-center"
                        alt="Paw-Paseo"
                    />
                    <h2 className="font-bold text-[#EEB154] text-3xl">
                        Paw<span className="font-semibold text-[#124C5F]">-Paseo</span>{" "}
                    </h2>
                </picture>

                {/* // Menu de Escritorio */}
                <div className="hidden items-center  gap-10 lg:flex">
                    <ul className="flex items-center justify-center gap-4">
                        <li>
                            <Link href="#inicio">
                                <p>Inicio</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="#servicios">
                                <p>Nuestros Servicios</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="#sobre">
                                <p>Sobre la App</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="#resenas">
                                <p>Reseñas</p>
                            </Link>
                        </li>
                    </ul>

                    <Link href={"/Inicio_sesion"}>
                        <button className="h-[42px] w-[170px] rounded-2xl bg-[#EEB154] text-white">
                            Iniciar Sesión
                        </button>
                    </Link>
                </div>

                {/* // Menu de Celular */}
                <div className="lg:hidden ">
                    <RiMenu2Line className="h-6 w-6 cursor-pointer " />
                </div>
            </div>
        </nav>
    );
};
