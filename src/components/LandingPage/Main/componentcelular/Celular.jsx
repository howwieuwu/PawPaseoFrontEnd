import React from "react";
import Image from "next/image";
import Cel from "@/../public/image/Cel.png";
import Ubi from "@/../public/image/Ubi.png";
import Paseo from "@/../public/image/Paseo.png";

export const Celular = () => {
    return (
        <div className="">
            <div className="relative z-0 h-[280px] mx-auto  w-[280px] xl:h-[435px] xl:w-[450px] rounded-full bg-[#f3ba65] border">
                <Image
                    alt="celular"
                    src={Cel}
                    width={200}
                    height={200}
                    className="absolute -bottom-36 left-1/2 w-36 xl:w-52 -translate-x-1/2 rounded-3xl"
                />
                <Image
                    alt="Ubi"
                    src={Ubi}
                    width={200}
                    height={50}
                    className="max-sm:w-40 max-sm:top-80 -bottom-2 absolute xl:-bottom-10 border border-red-950"
                />
                <Image
                    alt="Paseo"
                    src={Paseo}
                    width={200}
                    height={50}
                    className="absolute max-sm:w-28 right-0 top-60  xl:top-2/3"
                />
            </div>
        </div>
    );
};
