import React from "react";
import Link from "next/link";
import { Celular } from "./componentcelular/Celular";
import Image from "next/image";
import celular from "@/../public/image/celular.png"

export const Main = () => {
  return (
    <main className="mt-3 flex max-sm:flex-col max-sm:mt-7 xl:max-w-full max-lg:h-[85vh] max-xl:h-[80vh] max-sm:h-[100vh] max-2xl:h-[85vh] 2xl:h-[90vh] items-center">

      <section className=" w-full xl:w-2/4 flex justify-center 2xl:w-2/4 2xl:h-[80%]">
        <Image className="2xl:w-2/3"
          src={celular} alt="fondo_celular" width={350} height={200}
        />

        {/* <Celular /> */}
      </section>

      <section className=" w-full px-7 xl:px-0 xl:mt-0 xl:w-2/4 xl:items-center">
        <div className="space-y-6 text-center md:h-auto xl:items-center mt-16">

          <div className="flex justify-center items-end max-sm:h-12 max-lg:h-10 max-xl:h-20 max-2xl:h-20 max-xl:w-full">
            <h1 className="max-xl:text-7xl max-sm:text-3xl max-lg:text-4xl max-2xl:text-7xl 2xl:text-9xl font-bold text-[#EEB154]">
              Paw
            </h1>
            <span className="max-xl:text-7xl 2xl:text-9xl max-sm:text-3xl max-lg:text-4xl max-2xl:text-7xl font-bold text-[#124C5F]">
              -Paseo
            </span>
          </div>

          <p className="mx-auto max-w-lg max-xl:text-base font-normal max-sm:text-base max-2xl:text-base 2xl:text-xl 2xl:w-8/12">
            "Paw paseo, una opción para los papás de mascotas que buscan pasear a sus peluditos de manera
            segura y confiable. La app nos brinda flexibilidad y gran variedad de características para
            emplear y hacer del cuidado algo divertido."

            {/* ¡Con nuestra aplicación, encontrarás al paseador de perros perfecto
            para tu mejor amigo en cuestión de minutos! */}
          </p>

          <Link href={"/Inicio_sesion"}>
            <button className=" py-2.5 px-6 rounded-3xl bg-[#EEB154] text-base  xl:text-lg text-white mt-5">
              Descarga Aquí
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};
