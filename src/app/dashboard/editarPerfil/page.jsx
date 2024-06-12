"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import UsuG from "@/../public/icon/OBJECTS.png";
import { SiDatadog } from "react-icons/si";
import axios from 'axios';

function Page() {
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get('https://prueba-backend-phi.vercel.app/admin/profile', { withCredentials: true })
            .then(response => {
                setAdmin(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching admin data:', error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            nombre: event.target.nombre.value,
            apellido: event.target.apellido.value,
            email: event.target.correo.value,
            ciudad: event.target.ciudad.value,
            contraseña: event.target.contraseña.value
        };
        axios.put(`https://prueba-backend-phi.vercel.app/admin/update/${admin._id}`, updatedData, { withCredentials: true })
            .then(response => {
                console.log('Admin updated:', response.data);

            })
            .catch(error => {
                console.error('Error updating admin:', error);
            });
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
        <main className='justify-center p-8'>
            <div className='flex w-full justify-around'>
                <h1 className='text-4xl flex items-center font-medium font-serif'> Editar Perfil </h1>
                <Image src={UsuG} width={150} height={150} className="object-cover" alt="Admin Image" />
            </div>
            <div className='w-full mt-3'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 w-80 md:w-[930px] mx-auto">
                        <label className="block mb-2">Nombre:</label>
                        <input type="text" name="nombre" defaultValue={admin.nombre} className="p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4 w-80 md:w-[930px] mx-auto">
                        <label className="block mb-2">Correo:</label>
                        <input type="email" name="correo" defaultValue={admin.email} className="p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4 w-80 md:w-[930px] mx-auto">
                        <label className="block mb-2">Ciudad:</label>
                        <input type="text" name="ciudad" defaultValue={admin.ciudad} className="p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4 w-80 md:w-[930px] mx-auto">
                        <label className="block mb-2">Contraseña:</label>
                        <input type="password" name="contraseña" defaultValue={admin.contraseña} className="p-2 border rounded w-full" />
                    </div>
                    <div className="flex justify-center">
                        <button type="button" onClick={() => window.history.back()} className="mr-4 py-2 px-4 bg-gray-500 text-white rounded">Cancelar</button>
                        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Actualizar</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Page;
