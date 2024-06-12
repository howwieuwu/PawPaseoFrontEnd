"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiShow } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import Swal from 'sweetalert2';

export default function Page() {
  const [preguntas, setPreguntas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalOpenVer] = useState(false);
  const [preguntaVer, setPreguntaVer] = useState(null);

  const [rowsPerPage] = useState(7); 
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://prueba-backend-phi.vercel.app/api/preguntas');
      setPreguntas(response.data.preguntaFound);
      setTotalPages(Math.ceil(response.data.preguntaFound.length / rowsPerPage));
    } catch (error) {
      console.error("Error fetching data: ", error);
      setPreguntas([]);
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
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPreguntas = preguntas.filter(pregunta =>
    pregunta.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pregunta.respuesta?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (pregunta) => {
    setPreguntaSeleccionada(pregunta);
    setIsModalOpen(true);
  };

  const handleView = (pregunta) => {
    setPreguntaVer(pregunta);
    setIsModalOpenVer(true);
  };

  const updatePregunta = (id, updatedData) => {
    axios.put(`https://prueba-backend-phi.vercel.app/api/pregunta/${id}`, updatedData)
      .then(response => {
        setPreguntas(preguntas.map(pregunta => pregunta._id === id ? { ...pregunta, ...updatedData } : pregunta));
        setIsModalOpen(false);
        setPreguntaSeleccionada(null);
      })
      .catch(error => {
        console.error("Error updating pregunta: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { descripcion, respuesta } = event.target.elements;
    const updatedData = {
      descripcion: descripcion.value,
      respuesta: respuesta.value,
    };
    updatePregunta(preguntaSeleccionada._id, updatedData);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentData = filteredPreguntas.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <div className="flex justify-end mt-2">
        <div className='relative'>
          <input
            type='search'
            placeholder='Buscar por pregunta o respuesta'
            className='p-1 pl-12 focus:outline-none border-b-2 border-gray-400 rounded'
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className='h-6 w-6 absolute top-1/2 left-4 transform -translate-y-1/2 text-black' />
        </div>
      </div>

      <table className="w-full text-sm border-y-2 mt-3">
        <thead className="text-xs uppercase bg-gray-50 border-y-2">
          <tr className='h-20'>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Pregunta</th>
            <th scope="col" className="px-6 py-3">Respuesta</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>

        <tbody className='text-center'>
          {currentData.map((pregunta, index) => (
            <tr key={pregunta._id} className='h-14 border-y-2'>
              <td>{(currentPage - 1 ) * rowsPerPage + index + 1}</td>
              <td>{pregunta.descripcion}</td>
              <td>{pregunta.respuesta || 'Sin respuesta'}</td>
              <td className='flex justify-center'>
                <BiShow className='h-8 w-8 cursor-pointer' onClick={() => handleView(pregunta)}/>
                <TbEdit className='h-8 w-8 cursor-pointer ml-2' onClick={() => handleEdit(pregunta)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            <h2 className="text-xl font-semibold mb-4">Editar Pregunta</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Pregunta:</label>
                <input type="text" name="descripcion" defaultValue={preguntaSeleccionada.descripcion} className="p-2 border rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Respuesta:</label>
                <textarea name="respuesta" defaultValue={preguntaSeleccionada.respuesta} className="p-2 border rounded w-full" rows="4"></textarea>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={alertcancel} className="mr-4 py-2 px-4 bg-gray-500 text-white rounded">Cancelar</button>
                <button type="submit" onClick={alerta} className="py-2 px-4 bg-blue-500 text-white rounded">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {isModalOpenVer && preguntaVer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Ver Pregunta</h2>
            <div className="mb-4">
              <label className="block mb-2">Pregunta:</label>
              <input type="text" name="descripcion" value={preguntaVer.descripcion} readOnly className="p-2 border rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Respuesta:</label>
              <textarea name="respuesta" value={preguntaVer.respuesta} readOnly className="p-2 border rounded w-full" rows="4"></textarea>
            </div>
            <div className="flex justify-center">
              <button type="button" onClick={() => setIsModalOpenVer(false)} className="mr-4 py-2 px-4 bg-[#124C5F] text-white rounded">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
