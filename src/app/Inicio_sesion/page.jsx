"use client";
import React, { useState } from "react";
import Image from "next/image";
import Girl from "@/../public/image/ChicayDog.png";
import Paw from "@/../public/image/Paw.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // axios.defaults.withCredentials = true;
      const response = await axios.post(
        "https://pawpaseo-backend-phi.vercel.app/admin/login",
        {
          identifier,
          password,
        }
      );

      sessionStorage.setItem("identifier", JSON.stringify(response.data));
      router.push("/dashboard");
    } catch (error) {
      setError("Credenciales inválidas. Por favor, intente nuevamente.");
      console.error("Error logging in:", error);
    }
  };

  const alertCancel = () => {
    setIsModalOpen(false);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "¡Cancelado con Exito!",
      showConfirmButton: false,
      timer: 1600,
    });
  };

  return (
    <main className="flex flex-col md:flex-row items-center max-xl:w-full max-h-screen overflow-hidden">
      {/* Sección izquierda */}
      <section className="max-md:w-1/2 max-sm:w-full max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 max-sm:mt-32 bg-gray-50">
        <div className=" max-xl:w-full">
          <h2 className="text-[#EEB154] sm:text-sm font-bold text-center text-2xl max-sm:text-5xl max-sm:w-full lg:text-4xl">
            Paw<span className="text-[#124C5F] font-semibold">-Paseo</span>
          </h2>
          <div className="flex justify-center mt-4">
            <Image
              src={Paw}
              width={264}
              height={121}
              alt="Perrito_Feliz"
              className="max-sm:h-[20vh] 2xl:h-[25vh] max-xl:h-[30vh] max-lg:h-[20vh]"
            />
          </div>
          <form onSubmit={handleLogin} className="px-4 md:px-14 py-8 max-xl:w-full">
            <h5 className="py-2">Usuario o Correo Electrónico:</h5>
            <input
              type="text"
              className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <h5 className="py-2">Contraseña:</h5>
            <input
              type="password"
              className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#124C5F] w-full h-[45px] rounded-3xl text-white my-2"
            >
              Iniciar Sesión
            </button>
            <h5 className="text-center">
              ¿No tienes una cuenta? <u onClick={setIsModalOpen}>Regístrate</u>
            </h5>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </section>
      {/* Sección derecha */}
      <section className="max-md:w-1/2 max-sm:w-1/2 max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 h-full max-sm:hidden bg-gray-100">
        <Image
          src={Girl}
          width={756}
          height={500}
          alt="ChichaConSuPerro"
          className="w-full object-cover"
        />
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[url('/image/INGRESOfondo.png')] p-4 rounded-lg">
            <div className="flex justify-center text-center mt-4">
              <div>
                <Image
                  src={Paw}
                  width={264}
                  height={121}
                  className="max-sm:h-[20vh] 2xl:h-[25vh] max-xl:h-[30vh] max-lg:h-[20vh] pl-6"
                  alt="Paw"
                />
                <h5 className=""> ¿Cómo deseas registrarte?</h5>
                <Link href={"/Registro/RegistroUsuario"}>
                  <button className="bg-[#D9D9D9] w-full h-[45px] rounded-3xl text-black my-2">
                    Usuario
                  </button>
                </Link>
                <Link href={"/Registro/RegistroPaseador"}>
                  <button className="bg-[#D9D9D9] w-full h-[45px] rounded-3xl text-black my-2">
                    Paseador/Cuidador
                  </button>
                </Link>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={alertCancel}
                    className="mr-4 py-2 px-4 bg-gray-500 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default LoginPage;
