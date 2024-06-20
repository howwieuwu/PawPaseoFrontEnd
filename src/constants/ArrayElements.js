// Iconos
import { RiHome2Fill } from "react-icons/ri";
import { FaQuestion, FaUser, FaUserTie, FaWalking } from "react-icons/fa";

export const ArrayElements = [
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