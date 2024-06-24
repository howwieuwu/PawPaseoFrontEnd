"use client";
import { useStore } from "@/context/store";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { SiDatadog } from "react-icons/si";
import { UpdateUser } from "@/api/update-user";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function Page() {
  const [loading, setLoading] = useState(true);
  const sesionUser = useStore((state) => state.sesionUser);

  const setSesionUser = useStore((state) => state.setSesionUser);

  const router = useRouter();
  const fileInputRef = useRef(null);
  const [imagen, setImagen] = useState(sesionUser.foto_perfil);

  // Manejo de formulario
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    setDataUpdate({
      nombre: sesionUser?.nombre,
      email: sesionUser?.email,
      ciudad: sesionUser?.ciudad,
      password: "123456",
      foto_perfil: imagen,
    });
  }, [sesionUser]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);

    clearTimeout();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // formData
    const formData = new FormData();
    formData.append("nombre", dataUpdate.nombre);
    formData.append("email", dataUpdate.email);
    formData.append("ciudad", dataUpdate.ciudad);
    formData.append("password", dataUpdate.password);
    formData.append("foto_perfil", imagen);

    const response = await UpdateUser(formData);
    setSesionUser(response);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Actualizado con exito",
      showConfirmButton: false,
      timer: 1500,
    });

    router.push("/dashboard");
    // si llega una respuesta hacer un Swal que diga actualizado con exito
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center animate-pulse">
        <div className=" h-full w-full mt-72 md:mt-20">
          <SiDatadog className="h-96 w-full" />
          <h1 className="w-full flex text-center justify-center">
            {" "}
            Cargando...{" "}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <main className="justify-center p-8">
      <div className="flex w-full justify-around">
        <h1 className="text-4xl flex items-center font-medium font-serif">
          {" "}
          Editar Perfil{" "}
        </h1>
        {sesionUser?.foto_perfil ? (
          <>
            <Image
              src={sesionUser?.foto_perfil}
              width={150}
              height={150}
              className="object-cover h-[150px] w-[150px] rounded-full shadow"
              alt="Admin Image"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </>
        ) : (
          <div className="w-[150px] h-[150px] bg-gray-200 rounded-full animate-pulse"></div>
        )}
      </div>
      <div className="w-full mt-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-80 md:w-[930px] mx-auto">
            <label className="block mb-2">Nombre:</label>
            <input
              type="text"
              name="nombre"
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, nombre: e.target.value })
              }
              defaultValue={dataUpdate?.nombre}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4 w-80 md:w-[930px] mx-auto">
            <label className="block mb-2">Correo:</label>
            <input
              type="email"
              name="correo"
              defaultValue={dataUpdate?.email}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, email: e.target.value })
              }
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4 w-80 md:w-[930px] mx-auto">
            <label className="block mb-2">Ciudad:</label>
            <input
              type="text"
              name="ciudad"
              defaultValue={dataUpdate?.ciudad}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, ciudad: e.target.value })
              }
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4 w-80 md:w-[930px] mx-auto">
            <label className="block mb-2">Contraseña:</label>
            <input
              type="password"
              name="contraseña"
              required
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, password: e.target.value })
              }
              className="p-2 border rounded w-full"
              defaultValue={dataUpdate?.password}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="mr-4 py-2 px-4 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Page;
