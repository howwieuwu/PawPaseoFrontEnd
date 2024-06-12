import Image from 'next/image';
import React from 'react'
import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { PiFacebookLogoFill } from "react-icons/pi";
import Paw from "@/../public/image/Paw.png"

function Footer() {
    return (
        <footer className="relative max-lg:h-[50vh] mx-auto">
            <div className='max-lg:h-36 max-xl:h-40 max-2xl:h-36 2xl:h-48' style={{ backgroundImage: "url('/image/footer2.svg')", backgroundSize: "cover", backgroundPosition: "center" }} ></div>

            <div className='bg-[#e2e1e1]'>
                <div className=" flex flex-row items-center justify-center 2xl:h-28">
                    <Image className='2xl:w-36' src={Paw} alt="Perrito_Feliz" width={100} height={100} />

                    <h2 className="text-md font-bold text-[#EEB154] 2xl:text-4xl">
                        Paw<span className="font-semibold text-[#124C5F] ">-Paseo</span>{" "}
                    </h2>
                </div>


                <div className="flex justify-center items-center mt-4 ">

                    <div className="max-sm:text-xs p-1 w-1/2 max-lg:w-3/6 max-xl:w-3/6 text-center flex justify-center">
                        <p className="max-md:w-full p-1 max-lg:text-sm max-xl:text-base max-xl:w-[90%] 2xl:text-lg 2xl:w-[90%]">
                            ¡Con nuestra aplicación, encontrarás al paseador de perros perfecto
                            para tu mejor amigo en cuestión de minutos!
                        </p>

                    </div>

                    <hr className="absolute max-lg:h-14 max-sm:h-32 max-xl:h-20 max-2xl:h-20 2xl:h-14 border-r border-gray-500" />

                    <div className="w-1/2 max-lg:w-3/6 max-xl:w-3/6 text-center flex justify-center">


                        <div className="max-sm:w-full max-lg:w-full max-xl:w-full max-2xl:w-full ">
                            <nav>
                                <h1 className='2xl:text-lg'>Encuentranos en:</h1>
                            </nav>


                            <nav className='w-full flex justify-center'>

                                <div className="flex md:justify-evenly w-1/4 max-sm:justify-evenly max-sm:w-full max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-96 lg:justify-evenly ">
                                    <PiFacebookLogoFill className="h-8 w-8 md:h-12 md:w-12 cursor-pointer" />
                                    <FaInstagram className=" h-8 w-8 md:h-12 md:w-12 cursor-pointer" />
                                    <FaTwitter className=" h-8 w-8 md:h-12 md:w-12 cursor-pointer" />
                                    <FaWhatsapp className=" h-8 w-8 md:h-12 md:w-12 cursor-pointer" />
                                </div>
                            </nav>


                        </div>

  

                    </div>



                </div>
                <nav className='w-full bg-[#e2e1e1] flex justify-center text-center text-xs lg:text-base'>
                    <nav className='text-center w-full first-letter mt-8'>
                        <p>2022 © ExitoWeb, Inc. Todos los derechos reservados.</p>
                        <p className='text-[13px]'>Términos de servicio</p>

                        <div className='flex justify-center text-center text-[12px] h-10'>
                            <p className='underline'>Español</p>
                            <p className='ml-5 underline'>Ingles</p>
                        </div>
                    </nav>
                </nav>


            </div>


        </footer>
    )
}
// Paw-Paseo es una excelente opción para los dueños de mascotas que buscan una manera segura y
// conveniente de pasear a sus mascotas. La aplicación es fácil de usar y ofrece una variedad de
// características que la convierten en una herramienta valiosa para los dueños de mascotas.
export default Footer