"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import Muc from "@/../public/image/Muchacho.png"
import PerrNiña from "@/../public/image/PerroNiña.png"
import PerrMichi from "@/../public/image/PerroMichi.png"

function AcercaDe() {
    const [mostrarNosotros, setMostrarNosotros] = useState(false);


    const toggleMostrarNosotros = () => {
        setMostrarNosotros(prevState => !prevState);
      };
    
    return (
        <>
          <main id="sobre" className="bg-[url('/image/FondoPatas.png')] mx-auto flex xl:flex-row max-sm:mt-8 max-lg:mt-10 max-lg:flex max-xl:mt-20 max-2xl:mt-20 2xl:h-[70vh]">
            <section className="w-full xl:px-0 xl:w-2/4 max-lg:w-1/2 max-md:w-full max-xl:w-1/2 2xl:flex 2xl:justify-center 2xl:items-center">
              <div className="text-center 2xl:h-4/5">
                <h1 className="text-base xl:text-4xl font-bold flex justify-center text-left max-sm:text-3xl max-lg:text-4xl max-xl:text-4xl max-2xl:text-4xl 2xl:text-5xl"> Sobre La App</h1>
                <p className="mx-auto max-w-lg text-base xl:text-xl font-normal p-8 text-center max-sm:text-base 2xl:text-xl">
                  Una aplicación móvil que permita a los dueños de mascotas programar paseos seguros y confiables para sus animales de compañía. La aplicación se centrará en brindar una interfaz intuitiva y amigable tanto para los dueños de mascotas como para los paseadores. Incluirá características como registro y certificación de paseadores, programación de paseos personalizables, seguimiento en tiempo real, sistema de retroalimentación y reseñas, y medidas sólidas de seguridad de datos. También incluirá ubicaciones de veterinarias y tiendas de mascotas cercanas a su ubicación.
                </p>
                <button onClick={toggleMostrarNosotros} className="py-2.5 px-6 rounded-xl bg-[#EEB154] text-base  xl:text-lg text-white">{mostrarNosotros ? 'Ver Menos' : 'Ver Mas'} {'>'}</button>
              </div>
            </section>
            {/* Imagen de Escritorio */}
            <section className="max-md:hidden md:block max-lg:w-1/2 max-xl:ml-[10%] 2xl:w-1/2 2xl:flex 2xl:justify-center">
              <Image src={Muc} alt='Paseando con tu mascota' width={350} height={350} />
            </section>
          </main>
    
          <div style={{
            overflow: 'hidden',
            transition: 'max-height 0.5s ease-in-out',
            maxHeight: mostrarNosotros ? '1000px' : '0',
          }}>
            <section id="nosotros" className="w-[100%] flex items-center justify-center max-sm:h-auto max-lg:mt-14 max-xl:mt-14 max-2xl:mt-14">
              <div className="w-[100%] h-[100%] flex items-center justify-center">
                <div className="text-center w-[100%] ">
                  <h1 className="font-mono text-base font-bold flex justify-center max-sm:text-3xl max-lg:text-4xl max-xl:text-4xl max-2xl:text-4xl 2xl:text-5xl" >Nosotros</h1>
                  <h1 className='max-sm:text-center max-sm:text-base max-2xl:text-base 2xl:text-xl px-4'>
                    Somos un equipo de cuatro apasionados por los animales y la tecnología, unidos por el sueño de transformar la forma en que los dueños cuidan del bienestar de sus amigos peludos. Estudiamos desarrollo de software y estamos comprometidos con la creación de una aplicación móvil innovadora que facilite la vida de los dueños de mascotas y, al mismo tiempo, genere oportunidades para los amantes de los animales.
                  </h1>
                </div>
              </div>
            </section>
            <section className=" h-[60%] w-[100%] flex justify-center max-sm:h-auto max-sm:mt-8 max-lg:mt-8 max-xl:mt-10 max-2xl:mt-10 2xl:mt-10">
              <div className="w-[50%] h-[100%] flex items-center justify-center">
                <div className="w-[100%] text-center ">
                  <h1 className="font-bold flex justify-center max-sm:text-3xl max-lg:text-4xl max-xl:text-4xl max-2xl:text-4xl 2xl:text-5xl">Misión</h1>
                  <h1 className="max-xl:text-base max-sm:text-center max-sm:text-base max-2xl:text-base 2xl:text-xl px-4">
                    Conectar a los dueños de mascotas con paseadores profesionales y confiables, a través de una aplicación móvil intuitiva y segura, que ofrece una experiencia excepcional para ambas partes.
                  </h1>
                  <Image src={PerrNiña} alt="Perrito_Feliz" width={200} height={200} className='w-[60%] ml-[20%] rounded-3xl max-sm:hidden md:block xl:w-2/4' />
                </div>
              </div>
              <div className="w-[50%] h-[100%] flex items-center justify-center">
                <div className="w-[100%]  text-center ">
                  <Image src={PerrMichi} alt="Perrito_Feliz" width={200} height={200} className='w-[60%] ml-[20%] rounded-3xl max-sm:hidden md:block xl:w-2/4' />
                  <h1 className="font-monoxl:text-7xl font-bold flex justify-center max-sm:text-3xl max-sm:mt-0 max-lg:text-4xl max-xl:text-4xl max-2xl:text-4xl 2xl:text-5xl">Visión</h1>
                  <h1 className="max-xl:text-base max-sm:text-center max-sm:text-base px-4 2xl:text-xl">
                    Ser la plataforma líder en Latinoamérica para paseos de mascotas seguros, confiables y convenientes, transformando la forma en que los dueños cuidan del bienestar de sus amigos peludos.
                  </h1>
                </div>
              </div>
            </section>
          </div>
        </>
      );
    }

export default AcercaDe