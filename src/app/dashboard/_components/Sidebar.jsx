/* eslint-disable jsx-a11y/alt-text */
import UsuG from "@/../public/icon/OBJECTS.png";
import f from "@/../public/icon/establecimiento.png"
import Admi from "@/../public/icon/config.png";
import Cuidador from "@/../public/icon/cuidadores.png";
import Home from "@/../public/icon/home.jpg";
import Preguntas from "@/../public/icon/preguntas.png";
import Usu from "@/../public/icon/usuario.png";
import Image from "next/image";
import Link from "next/link";


const ArrayElements = [
    {
        name: "Home",
        icon: Home,
        link: "/dashboard",
    },
    {
        name: "Administradores",
        icon: Admi,
        link: "/dashboard/administradores",
    },
    {
        name: "Cuidadores",
        icon: Cuidador,
        link: "/dashboard/cuidadores",
    },
    {
        name: "Usuarios",
        icon: Usu,
        link: "/dashboard/usuarios",
    },

    {
        name: "Preguntas Frecuentes",
        icon: Preguntas,
        link: "/dashboard/preguntas",
    },
];




export const Sidebar = () => {

    

    return (
        <nav className=" bg-[#124C5F]  w-[19rem]  max-h-screen flex flex-col justify-stretch ">
            <div className="w-full  grid place-content-center gap-8 py-5">
                <Image src={UsuG} width={150} className="object-cover" height={150}></Image>
                <Link href={"/dashboard/editarPerfil"}><button className="bg-[#FFB749] px-4 py-1 rounded-lg"> Editar Perfil </button></Link>
            </div>
            <section className=" bg-white px-8 flex flex-col h-full justify-between rounded-tr-[100px]">


                {ArrayElements.map(({ name, icon, link}) => (
                    <Link href={link} key={name}>
                        <ul className="flex flex-col   pt-8 gap-5">
                            <li key={name} className="flex gap-2}">
                                <Image
                                    src={icon}
                                    width={25}
                                    height={25}
                                    className="w-5 h-5 object-cover"
                                ></Image>
                                <span>{name}</span>
                            </li>
                        </ul>
                    </Link>
                ))}

                <Link href={"/"}>
                    <button className="bg-[#124C5F] py-2 text-white mb-5  rounded-lg w-full">
                        Cerrar Sesion
                    </button>
                </Link>
            </section>
        </nav>
    );
};
