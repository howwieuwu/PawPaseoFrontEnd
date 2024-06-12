"use client";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@nextui-org/react";
import { CardContent } from "@/components/ui/card";

export const Comentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await fetch('https://prueba-backend-phi.vercel.app/api/resenas');
                const data = await response.json();
                setComentarios(data.resenaFound);
            } catch (error) {
                console.error("Error fetching comentarios:", error);
            }
        };

        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://prueba-backend-phi.vercel.app/api/usuarios');
                const data = await response.json();
                setUsuarios(data.userFound);
            } catch (error) {
                console.error("Error fetching usuarios:", error);
            }
        };

        fetchComentarios();
        fetchUsuarios();
    }, []);

    const getUsuarioInfo = (userId) => {
        return usuarios.find(usuario => usuario._id === userId) || {};
    };


    return (
        <div>
            <section id="resenas" className="bg-[url('/image/FondoPatas.png')]">
                <section className="mx-auto max-sm:flex max-sm:flex-col xl:flex-row my-10 items-center sm:hidden">
                    <div>
                        <h2 className="text-base xl:text-lg font-bold max-sm:text-3xl">Reseñas</h2>
                    </div>
                    <div className="items-center justify-center">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full max-w-sm"
                        >
                            <CarouselContent>
                                {comentarios.map((comentario) => {
                                    const usuario = getUsuarioInfo(comentario.user);
                                    return (
                                        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={comentario._id}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <div className="bg-sky-100 p-4 m-4 rounded-xl">
                                                            {comentario.imagen ? (
                                                                <img
                                                                    className='w-full h-52 object-contain rounded-xl'
                                                                    src={comentario.imagen}
                                                                    alt={comentario.user}
                                                                />
                                                            ) : (
                                                                <div className='w-full h-52 bg-gray-200 flex items-center justify-center rounded-xl'>
                                                                    <span className="text-gray-500">Sin imagen</span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <ul className="bg-[#124C5F] flex flex-col justify-center w-full h-full p-2 text-center text-white rounded-md">
                                                                    <li>{usuario.nombre}</li>
                                                                    <li>{comentario.descripcion}</li>
                                                                    <li>{comentario.calificacion}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>

                {/* Cartas de las demás medidas */}
                <section className="hidden md:block my-7 p-8 xl:py-12">
                    <div>
                        <h2 className="text-base font-semibold mb-5 max-lg:text-4xl max-xl:text-4xl max-2xl:text-4xl 2xl:text-5xl">Reseñas</h2>
                    </div>
                    <div className="flex justify-center">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-2/3"
                        >
                            <CarouselContent>
                                {comentarios.map((comentario) => {
                                    const usuario = getUsuarioInfo(comentario.user);
                                    return (
                                        <CarouselItem key={comentario._id} className="bg-sky-100 rounded-2xl">
                                            <Card>
                                                <CardContent>
                                                    {comentario.imagen ? (
                                                        <img
                                                            className='w-full h-52 object-contain rounded-xl'
                                                            src={comentario.imagen}
                                                            alt={comentario.user}
                                                        />
                                                    ) : (
                                                        <div className='w-full h-52 bg-gray-200 flex items-center justify-center rounded-xl'>
                                                            <span className="text-gray-500">Sin imagen</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <ul className="bg-[#124C5F] flex flex-col justify-center w-full h-full p-2 text-center text-white rounded-md">
                                                            <li>{usuario.nombre}</li>
                                                            <li>{comentario.descripcion}</li>
                                                            <li>{comentario.calificacion}</li>
                                                        </ul>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>
            </section>
        </div>
    );
};
