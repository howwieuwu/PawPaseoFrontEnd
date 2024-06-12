/* eslint-disable jsx-a11y/alt-text */
import UsuG from "@/../public/icon/objects.png";
import Image from "next/image";
import Link from "next/link";

// Iconos
import { RiHome2Fill} from "react-icons/ri";
import { FaQuestion, FaUser, FaUserTie, FaWalking } from "react-icons/fa";

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
    name: "Preguntas",
    Icon: FaQuestion,
    link: "/dashboard/preguntas",
  },
];
export const Sidebar = () => {
  return (
    <nav className=" bg-[#124C5F]  w-[19rem]  max-h-screen hidden  md:flex flex-col justify-stretch ">
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
