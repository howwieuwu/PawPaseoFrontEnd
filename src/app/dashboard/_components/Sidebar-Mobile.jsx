/* eslint-disable jsx-a11y/alt-text */
import UsuG from "@/../public/icon/OBJECTS.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Iconos
import { RiHome2Fill} from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { FaWalking } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";

const ArrayElements = [
  {
    name: "Home",
    Icon: RiHome2Fill,
    link: "/dashboard",
  },
  {
    name: "Administradores",
    Icon: FaUserTie,
    link: "/dashboard/administradores",
  },
  {
    name: "Cuidadores",
    Icon: FaWalking,
    link: "/dashboard/cuidadores",
  },
  {
    name: "Usuarios",
    Icon: FaUser,
    link: "/dashboard/usuarios",
  },

  {
    name: "Preguntas Frecuentes",
    Icon: FaQuestion,
    link: "/dashboard/preguntas",
  },
];

export const SidebarMobile = ({ open }) => {
  return (
    <nav
      className={cn(
        "absolute z-50 -left-[100%] top-0 bottom-0 bg-[#124C5F]  w-[19rem]  max-h-screen flex md:hidden flex-col justify-stretch transition-all duration-500 ease-in-out border-r",
        open ? "left-0" : "-left-[100%]"
      )}
    >
      <div className="w-full  grid place-content-center gap-8 py-5">
        <Image src={UsuG} width={150} className="object-cover" height={150}></Image>
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
                className="hover:bg-[#124C5F] p-4 hover:text-white transition-colors rounded-lg"
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
