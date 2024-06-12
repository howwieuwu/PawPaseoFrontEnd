"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Girl from '@/../public/image/ChicayDog.png';
import Paw from '@/../public/image/Paw.png';
import Link from 'next/link';
import Swal from 'sweetalert2';

function Page() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    });

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
    
            if (response.ok) {
                return { exists: data.exists }; 
            } else {
                
                return { error: data.error || 'Error al verificar existencia' };
            }
        } catch (error) {
            console.error('Error al verificar existencia:', error);
            return { error: 'Error al conectar con el servidor' };
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|edu|gov|mil|biz|info|name|museum|coop|aero|jobs|mobi|travel|[a-zA-Z]{2})$/;
        if (!emailRegex.test(formData.email)){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa un correo valido',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return;
        }

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(formData.nombre)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre solo puede contener letras y espacios',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return;
        }

        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (!passwordRegex.test(formData.password)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe contener al menos 8 caracteres, incluyendo al menos un número, una letra minúscula y una letra mayúscula',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return;
        }

        const emailExists = await checkIfExists('email', formData.email);

        if (emailExists) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El correo electrónico ya está registrado en nuestro sistema.',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false
            });
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

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: 'Usuario registrado exitosamente',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });

                setSuccess('Usuario registrado exitosamente');
                setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                if (data.error && data.error.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El correo electrónico ya está registrado en nuestro sistema.',
                        timer: 5000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'Error al registrar usuario',
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    setError(data.message || 'Error al registrar usuario');
                }
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Red',
                text: 'Hubo un problema al conectar con el servidor',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false
            });
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
                        {/* {success && <p className="text-green-500">{success}</p>} */}
                        <form onSubmit={handleSubmit}>
                            <h5 className="">Nombre Completo:</h5>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Ingresa tu nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                                required
                            />

                            <h5 className="">Correo Electrónico:</h5>
                            <input
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                                required
                            />

                            <h5 className="">Telefono:</h5>
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Ingresa tu número de celular"
                                pattern="[0-9]+"
                                title="Solo se permiten números"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-4 max-sm:w-full"
                                required
                            />

                            <h5 className="">Contraseña:</h5>
                            <input
                                type="password"
                                name="password"
                                placeholder="Ingrese la contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-[#8f8a8a] bg-opacity-25 rounded-2xl w-full h-10 px-4 mb-6"
                                required
                            />

                            <h5 className="">Confirmar Contraseña:</h5>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirme la contraseña"
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
