"use client";

import Girl from "@/../public/image/ChicayDog.png";
import Paw from "@/../public/image/Paw.png";
import { RegisterPaseadorAction } from "@/actions/registerPaseadores";
import Image from "next/image";
import Link from "next/link";
import { validation } from "@/validations/validationRegister";

function Page() {
  // Se ejecuta al enviar el formulario
  const handleAction = async (FormData) => {
    //La respuesta de la petición
    const response = await RegisterPaseadorAction(FormData);
    validation(response);
  };

  return (
    <main className="flex flex-col md:flex-row items-center max-xl:w-full max-h-screen overflow-hidden">
      {/* Sección izquierda */}
      <section className="max-md:w-1/2 max-sm:w-1/2 max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 h-full max-sm:hidden bg-gray-100">
        <Image
          src={Girl}
          width={756}
          height={500}
          className="w-full object-cover"
          alt="Girl"
        />
      </section>

      {/* Sección derecha */}
      <section className="h-full max-md:w-1/2 max-sm:w-full max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 max-sm:mt-7">
        <div className="max-xl:w-full">
          <h2 className="text-[#124C5F] font-bold text-center text-3xl ">
            {/* text-[#124C5F] text-xs font-bold text-center md:text-xl max-sm:text-5xl max-sm:w-full lg:text-4xl */}
            Paw<span className="text-[#EEB154] font-semibold">-Paseo</span>
          </h2>
          <div className="flex justify-center mt-4">
            <Image
              src={Paw}
              width={264}
              height={121}
              className="h-36"
              alt="Paw"
            />
          </div>
          <div className="px-4 md:px-10 py-8 max-xl:w-full">
            <form action={handleAction}>
              <h5 className="">Nombre Completo:</h5>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Ingresa tu nombre"
                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                required
              />

              <h5 className="">Telefono:</h5>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                placeholder="Ingresa tu "
                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                required
              />

              <h5 className="">Correo Electronico:</h5>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Ingresa tu correo"
                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                required
              />

              <h5 className="">Ciudad:</h5>
              <input
                type="text"
                name="ciudad"
                id="ciudad"
                placeholder="Ingresa tu ciudad de residencia"
                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                required
              />

              <h5 className="">Servicios:</h5>
              <select
                name="services"
                id="services"
                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                required
              >
                <option value="">Selecciona un servicio</option>
                <option value="Cuidador"> Cuidador </option>
                <option value="Paseador"> Paseador </option>
              </select>

              <h5 className="">Contraseña:</h5>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese la contraseña"
                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
                required
              />

              <h5 className="">Confirmar Contraseña:</h5>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme la contraseña"
                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
                required
              />

              <button
                type="submit"
                className="bg-[#EEB154] w-full h-[45px] rounded-3xl text-white my-2"
              >
                Registrarse
              </button>
            </form>

            <h5 className="text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/Inicio_sesion">
                <u>Inicia Sesion</u>
              </Link>
            </h5>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;
