"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiShow } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { SiDatadog } from "react-icons/si";
import Swal from 'sweetalert2';

export default function Page() {

  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalOpenVer] = useState(false);
  const [usuarioVer, setUsuarioVer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rowsPerPage] = useState(7); // Adjust as needed
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://pawpaseo-backend-phi.vercel.app/api/usuarios');
      setUsuarios(response.data.userFound);
      setTotalPages(Math.ceil(response.data.userFound.length / rowsPerPage));
    } catch (error) {
      console.error("Error fetching data: ", error);
      setUsuarios([]);
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
    axios.get('https://pawpaseo-backend-phi.vercel.app/api/usuarios')
      .then(response => {
        setLoading(false);
        if (Array.isArray(response.data.userFound)) {
          setUsuarios(response.data.userFound);
        } else {
          console.error("La respuesta de la API no contiene 'userFound' como un array:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setUsuarios([])
        setLoading(false);;
      });
    fetchData();
  }, []);

  const toggleActivo = (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    axios.put(`https://pawpaseo-backend-phi.vercel.app/api/usuario/${id}`, { estado: nuevoEstado })
      .then(response => {
        setUsuarios(usuarios.map(usuario =>
          usuario._id === id ? { ...usuario, estado: nuevoEstado } : usuario
        ));
      })
      .catch(error => {
        console.error("Error updating user status: ", error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredUsuarios = usuarios.filter(usuario => {
    const search = searchTerm.toLowerCase();
    return (
      usuario.nombre.toLowerCase().includes(search) ||
      usuario.telefono.toLowerCase().includes(search) ||
      (usuario.ciudad && usuario.ciudad.toLowerCase().includes(search)) ||
      usuario.email.toLowerCase().includes(search) ||
      usuario.foto_perfil?.toLowerCase().includes(search) ||
      (search === 'activo' && usuario.estado) ||
      (search === 'inactivo' && !usuario.estado)
    );
  });

  const handleEdit = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setIsModalOpen(true);
  };

  const handleView = (usuario) => {
    setUsuarioVer(usuario);
    setIsModalOpenVer(true);
  };

  const updateUsuario = (id, updatedData) => {
    axios.put(`https://pawpaseo-backend-phi.vercel.app/api/usuario/${id}`, updatedData)
      .then(response => {
        setUsuarios(usuarios.map(usuario => usuario._id === id ? { ...usuario, ...updatedData } : usuario));
        setIsModalOpen(false);
        setUsuarioSeleccionado(null);
      })
      .catch(error => {
        console.error("Error updating user: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { nombre, apellido, ciudad, email } = event.target.elements;
    const updatedData = {
      nombre: nombre.value,
      apellido: apellido.value,
      ciudad: ciudad.value,
      email: email.value
    };
    updateUsuario(usuarioSeleccionado._id, updatedData);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentData = filteredUsuarios.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
      <div className="flex justify-end mt-5">
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
      <table className="w-full text-sm border-y-2 mt-5">
        <thead className="text-xs uppercase bg-gray-50 border-y-2">
          <tr className='h-20'>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Telefono</th>
            <th scope="col" className="px-6 py-3">Ciudad</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>

        <tbody className='text-center'>
          {currentData.map((usuario, index) => (
            <tr key={usuario._id} className='h-14 border-y-2'>
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.ciudad  || 'No se ha digitado la ciudad' }  </td>
              <td>{usuario.email}</td>
              <td>
                <button
                  onClick={() => toggleActivo(usuario._id, usuario.estado)}
                  className={`py-2 px-4 rounded-lg ${usuario.estado ? 'bg-[#EEB154] text-white' : 'bg-[#124C5F] text-white'}`}
                >
                  {usuario.estado ? 'Activo' : 'Inactivo'}
                </button>
              </td>
              <td className='flex justify-center'>
                <BiShow className='h-8 w-8 cursor-pointer' onClick={() => handleView(usuario)} />
                <TbEdit className='h-8 w-8 cursor-pointer ml-2' onClick={() => handleEdit(usuario)} />
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Nombre:</label>
                <input type="text" name="nombre" defaultValue={usuarioSeleccionado.nombre} className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Apellido:</label>
                <input type="number" name="telefono" defaultValue={usuarioSeleccionado.telefono} className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Ciudad:</label>
                <input type="text" name="ciudad" defaultValue={usuarioSeleccionado.ciudad} className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input type="email" name="email" defaultValue={usuarioSeleccionado.email} className="p-2 border rounded w-full" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={alertcancel} className="mr-4 py-2 px-4 bg-gray-500 text-white rounded">Cancelar</button>
                <button type="submit" onClick={alerta} className="py-2 px-4 bg-blue-500 text-white rounded">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpenVer && usuarioVer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Ver Usuario</h2>
            <form>
              <img className='w-60 h-40 rounded-xl' src={usuarioVer.foto_perfil} alt={usuarioVer.nombre} />
              <div className="mb-4">
                <label className="block mb-2">Nombre:</label>
                <input type="text" name="nombre" value={usuarioVer.nombre} readOnly className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Apellido:</label>
                <input type="text" name="telefono" value={usuarioVer.telefono} readOnly className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Ciudad:</label>
                <input type="text" name="ciudad" value={usuarioVer.ciudad} readOnly className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input type="email" name="email" value={usuarioVer.email} readOnly className="p-2 border rounded w-full" />
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



