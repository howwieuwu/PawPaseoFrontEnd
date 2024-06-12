import { Services } from "./ServiceData";
import Image from "next/image";

export const Servicios = () => {
    return (
        <section id="servicios" className="bg-[#f0f0f0] p-8 max-lg:mt-5 max-md:mt-16 max-xl:mt-16">

            <div className="max-w-[1500px] mx-auto">
                <h2 className="text-base max-sm:text-center font-semibold max-sm:text-3xl max-lg:text-4xl max-xl:text-4xl max-2xl:text-4xl 2xl:text-5xl">Nuestros Servicios</h2>
                <div className="w-full h-full grid grid-cols-[repeat(auto-fit,_minmax(120px,1fr))] gap-3 place-items-center max-sm:mt-5 max-lg:mt-4 max-xl:mt-4 max-2xl:mt-4">
                    {Services.map((service) => {
                        return (
                            <div
                                key={service.id}
                                className="p-4 flex h-full py-5 xl:py-6 flex-col gap-3 items-center justify-center bg-white rounded  w-full xl:w-60 px-8  "
                            >
                                <Image
                                    width={100}
                                    height={100}
                                    src={service.image}
                                    className="w-2/3 h-2/3  object-contain"
                                    alt="service"
                                />

                                <p className="text-base max-sm:text-base 2xl:text-xl font-normal">{service.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
