"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiShow } from "react-icons/bi";
import { FaRegStar, FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { SiDatadog } from "react-icons/si";
import Swal from 'sweetalert2';
import { GoGraph } from "react-icons/go";
import GraficaPaseador from "@/app/dashboard/_components/GraficoPaseador/page.jsx"

export default function Page() {
  const [paseadores, setPaseadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paseadorSeleccionado, setPaseadorSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalOpenVer] = useState(false);
  const [paseadorVer, setPaseadorVer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalGrafica, setIsModalGrafica] = useState(false);

  const [rowsPerPage] = useState(7); 
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://pawpaseo-backend-phi.vercel.app/api/paseadores');
      setPaseadores(response.data.walkerFound);
      setTotalPages(Math.ceil(response.data.walkerFound.length / rowsPerPage));
    } catch (error) {
      console.error("Error fetching data: ", error);
      setPaseadores([]);
    }
  };

  const alertcancel = () => {
    setIsModalOpen(false);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "¡Cancelado con Exito!",
      showConfirmButton: false,
      timer: 1600,
    });
  }
  
  const alerta = () => Swal.fire({
    position: "center",
    icon: "success",
    title: "¡Actualizado con Exito!",
    showConfirmButton: false,
    timer: 2000,
  });

  useEffect(() => {
    axios.get('https://pawpaseo-backend-phi.vercel.app/api/paseadores')
      .then(response => {
        setLoading(false);
        if (Array.isArray(response.data.walkerFound)) {
          setPaseadores(response.data.walkerFound);
        } else {
          console.error("La respuesta de la API no contiene 'walkerFound' como un array:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setPaseadores([]);
        setLoading(false);
      });
      fetchData();
  }, []);

  const toggleActivo = (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    axios.put(`https://pawpaseo-backend-phi.vercel.app/api/paseador/${id}`, { estado: nuevoEstado })
      .then(response => {
        setPaseadores(paseadores.map(paseador =>
          paseador._id === id ? { ...paseador, estado: nuevoEstado } : paseador
        ));
      })
      .catch(error => {
        console.error("Error updating user status: ", error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPaseadores = paseadores.filter(paseador =>
    paseador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paseador.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (usuario.ciudad && usuario.ciudad.toLowerCase().includes(search)) ||
    paseador.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleEdit = (paseador) => {
    setPaseadorSeleccionado(paseador);
    setIsModalOpen(true);
  };

  const handleView = (paseador) => {
    setPaseadorVer(paseador);
    setIsModalOpenVer(true);
  };

  const updatePaseador = (id, updatedData) => {
    axios.put(`https://pawpaseo-backend-phi.vercel.app/api/paseador/${id}`, updatedData)
      .then(response => {
        setPaseadores(paseadores.map(paseador => paseador._id === id ? { ...paseador, ...updatedData } : paseador));
        setIsModalOpen(false);
        setPaseadorSeleccionado(null);
      })
      .catch(error => {
        console.error("Error updating user: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { nombre, telefono, ciudad, email } = event.target.elements;
    const updatedData = {
      nombre: nombre.value,
      telefono: telefono.value,
      ciudad: ciudad.value,
      email: email.value
    };
    updatePaseador(paseadorSeleccionado._id, updatedData);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentData = filteredPaseadores.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getIconByCalificacion = (calificacion) => {
    switch (calificacion) {
      case 0:
      case 1:
        return <FaRegStar />;  // Unstarred icon for low rating
      case 2:
      case 3:
        return <FaStarHalfAlt />;  // Half star for mid rating
      case 4:
      case 5:
        return <FaStar />;  // Full star for good rating
      default:
        return <FaStar />;  // Default icon
    }
  };

  if (loading) {

    return <div className='flex justify-center items-center animate-pulse'> 
    <div className=' h-full w-full mt-72 md:mt-20'>
    <SiDatadog className='h-96 w-full'/> 
    <h1 className='w-full flex text-center justify-center'> Cargando... </h1>
    </div>
    </div>
}

  return (
    <div>
      <div className="flex justify-end mt-2">
        <div className='relative'>
          <input
            type='search'
            placeholder='Buscar por nombre, estado, acción'
            className='p-1 pl-12  focus:outline-none border-b-2 border-gray-400 rounded'
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className='h-6 w-6 absolute top-1/2 left-4 transform -translate-y-1/2 text-black' />
        </div>
      </div>
      <div className='overflow-x-auto'>
      <table className="w-full text-sm border-y-2 mt-3">
        <thead className="text-xs uppercase bg-gray-50 border-y-2">
          <tr className='h-20'>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Telefono</th>
            <th scope="col" className="px-6 py-3">Calificación</th>
            <th scope="col" className="px-6 py-3">Correo</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>

        <tbody className='text-center'>
          {currentData.map((paseador, index) => (
            <tr key={paseador._id} className='h-14 border-y-2'>
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td>{paseador.nombre}</td>
              <td>{paseador.telefono}</td>
              <td className="flex items-center justify-center">
                  {getIconByCalificacion(paseador.calificacion)}
                  <span className="ml-1">{paseador.calificacion}</span>
                </td>
              <td>{paseador.email}</td>
              <td>
                <button
                  onClick={() => toggleActivo(paseador._id, paseador.estado)}
                  className={`py-2 px-4 rounded-lg ${paseador.estado ? 'bg-[#EEB154] text-white' : 'bg-[#124C5F] text-white'}`}
                >
                  {paseador.estado ? 'Activo' : 'Inactivo'}
                </button>
              </td>
              <td className='flex justify-center'>
                <BiShow className='h-8 w-8 cursor-pointer' onClick={() => handleView(paseador)}/>
                <TbEdit className='h-8 w-8 cursor-pointer ml-2' onClick={() => handleEdit(paseador)} />
                <GoGraph className='h-8 w-8 cursor-pointer ml-2' onClick={setIsModalGrafica} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-[#124C5F] rounded-full disabled:opacity-50 text-white mr-12"
        > Anterior </button>
        <span className='flex items-center'>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-[#FFB749] rounded-full disabled:opacity-50 text-white ml-12"
        > Siguiente </button>
      </div>

      { isModalGrafica && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className="bg-white p-8 rounded-lg w-11/12 h-2/3"> 
          <GraficaPaseador />
          <button type="button" onClick={alertcancel} className="mr-4 py-2 px-4 bg-gray-500 text-white rounded">Cancelar</button>
          </div>
        </div>
      )
      }

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Editar Cuidador</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Nombre:</label>
                <input type="text" name="nombre" defaultValue={paseadorSeleccionado.nombre} className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Telefono:</label>
                <input type="tel" name="telefono" defaultValue={paseadorSeleccionado.telefono} className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Ciudad:</label>
                <input type="text" name="ciudad" defaultValue={paseadorSeleccionado.ciudad} className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Correo:</label>
                <input type="email" name="email" defaultValue={paseadorSeleccionado.email} className="p-2 border rounded w-full" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={alertcancel} className="mr-4 py-2 px-4 bg-gray-500 text-white rounded">Cancelar</button>
                <button type="submit" onClick={alerta} className="py-2 px-4 bg-blue-500 text-white rounded">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {isModalOpenVer && paseadorVer && (
         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
         <div className="bg-white p-8 rounded-lg">
           <h2 className="text-xl font-semibold mb-4">Ver Cuidador</h2>
           <form>
           <img className='w-60 h-40 rounded-xl' src={paseadorVer.foto_perfil} alt={paseadorVer.nombre} />
           <text className='flex items-center justify-center'>{getIconByCalificacion(paseadorVer.calificacion)}
                  <span className="ml-1">{paseadorVer.calificacion}</span></text>
             <div className="mb-4">
               <label className="block mb-2">Nombre:</label>
               <input type="text" name="nombre" value={paseadorVer.nombre} readOnly className="p-2 border rounded w-full" />
             </div>
             <div className="mb-4">
               <label className="block mb-2">Telefono:</label>
               <input type="tel" name="telefono" value={paseadorVer.telefono} readOnly className="p-2 border rounded w-full" />
             </div>
             <div className="mb-4">
               <label className="block mb-2">Ciudad:</label>
               <input type="text" name="ciudad" value={paseadorVer.ciudad} readOnly className="p-2 border rounded w-full" />
             </div>
             <div className="mb-4">
               <label className="block mb-2">Email:</label>
               <input type="email" name="email" value={paseadorVer.email} readOnly className="p-2 border rounded w-full" />
             </div>
             <div className="flex justify-center">
               <button type="button" onClick={() => setIsModalOpenVer(false)} className="mr-4 py-2 px-4 bg-[#124C5F] text-white rounded">Cerrar</button>
             </div>
           </form>
         </div>
       </div>
      )}

    </div>
  );
}