import React from 'react'
import Image from 'next/image';
import Girl from '@/../public/image/ChicayDog.png';
import Paw from '@/../public/image/Paw.png';
import Link from 'next/link';

function page() {
    return (
        <main className="flex flex-col md:flex-row items-center max-xl:w-full max-h-screen overflow-hidden">
            {/* Sección izquierda */}
            <section className="max-md:w-1/2 max-sm:w-1/2 max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 h-full max-sm:hidden bg-gray-100">
                <Image src={Girl} width={756} height={500} className="w-full object-cover" alt="Girl" />
            </section>

            {/* Sección derecha */}
            <section className="max-md:w-1/2 max-sm:w-full max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 max-sm:mt-32 bg-gray-50">
                <div className="max-xl:w-full">
                    <h2 className="text-[#124C5F] sm:text-sm font-bold text-center text-2xl max-sm:text-5xl max-sm:w-full lg:text-4xl">
                        Paw<span className="text-[#EEB154] font-semibold">-Paseo</span>
                    </h2>
                    <div className="flex justify-center mt-4">
                        <Image src={Paw} width={264} height={121} className="max-sm:h-[20vh] 2xl:h-[25vh] max-xl:h-[30vh] max-lg:h-[20vh]" alt="Paw" />
                    </div>
                    <div className="px-4 md:px-14 py-8 max-xl:w-full">
                        <h5 className="">Usuario o Correo Electrónico:</h5>
                        <input
                            type="email"
                            name="email"
                            className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                        />

                        <h5 className="">Telefono</h5>
                        <input
                            type="tel"
                            name="telefono"
                            className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                        />

                        <h5 className="">Contraseña:</h5>
                        <input
                            type="password"
                            name="password"
                            className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
                        />

                        <h5 className="">Confirmar Contraseña:</h5>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
                        />

                        <button className="bg-[#EEB154] w-full h-[45px] rounded-3xl text-white my-2">
                            Registrarse
                        </button>
                        <h5 className="text-center">¿Ya tienes una cuenta? <Link href="/Inicio_sesion"><u>Inicia Sesion</u></Link></h5>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page