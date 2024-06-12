"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Girl from '@/../public/image/ChicayDog.png';
import Paw from '@/../public/image/Paw.png';
import Link from 'next/link';

function Page() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkIfExists = async (field, value) => {
        try {
            const response = await fetch(`https://prueba-backend-phi.vercel.app/api/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value }),
            });

            const data = await response.json();
            return data.exists;
        } catch (error) {
            console.error('Error checking existence:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(formData.nombre)) {
            setError('El nombre solo puede contener letras y espacios');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const emailExists = await checkIfExists('email', formData.email);
        if (emailExists) {
            setError('El correo electrónico ya existe');
            return;
        }

        const { nombre, email, telefono, password } = formData;

        try {
            const response = await fetch('https://prueba-backend-phi.vercel.app/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    email: email,
                    telefono: telefono,
                    password: password,
                    estado: true,
                }),
            });

            if (response.ok) {
                setSuccess('Usuario registrado exitosamente');
                setFormData({
                    user: '',
                    email: '',
                    telefono: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error al registrar usuario');
            }
        } catch (err) {
            setError('Error de red');
        }
    };

    return (
        <main className="flex flex-col md:flex-row items-center max-xl:w-full max-h-screen overflow-hidden">
            {/* Sección izquierda */}
            <section className="max-md:w-1/2 max-sm:w-1/2 max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 h-full max-sm:hidden bg-gray-100">
                <Image src={Girl} width={756} height={500} className="w-full object-cover" alt="Girl" />
            </section>

            {/* Sección derecha */}
            <section className="max-md:w-1/2 max-sm:w-full max-lg:w-1/2 max-xl:w-1/2 max-2xl:w-1/2 2xl:w-1/2 max-sm:mt-7">
                <div className="max-xl:w-full">
                    <h2 className="text-[#124C5F] sm:text-sm font-bold text-center text-2xl max-sm:text-5xl max-sm:w-full lg:text-4xl">
                        Paw<span className="text-[#EEB154] font-semibold">-Paseo</span>
                    </h2>
                    <div className="flex justify-center mt-4">
                        <Image src={Paw} width={264} height={121} className="max-sm:h-[20vh] 2xl:h-[25vh] max-xl:h-[30vh] max-lg:h-[20vh]" alt="Paw" />
                    </div>
                    <div className="px-4 md:px-14 py-8 max-xl:w-full">
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                        <form onSubmit={handleSubmit}>
                            <h5 className="">Nombre Completo:</h5>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                                required
                            />

                            <h5 className="">Correo Electrónico:</h5>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                                required
                            />

                            <h5 className="">Telefono:</h5>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                                required
                            />

                            <h5 className="">Contraseña:</h5>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
                                required
                            />

                            <h5 className="">Confirmar Contraseña:</h5>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
                                required
                            />

                            <button type="submit" className="bg-[#EEB154] w-full h-[45px] rounded-3xl text-white my-2">
                                Registrarse
                            </button>
                        </form>
                        <h5 className="text-center">¿Ya tienes una cuenta? <Link href="/Inicio_sesion"><u>Inicia Sesion</u></Link></h5>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Page;
