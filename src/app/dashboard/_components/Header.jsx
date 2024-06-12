import React from 'react'
import Paw from "@/../public/image/Paw.png"
import Image from 'next/image'

function HeaderAdmin() {
    return (
        <header className='flex items-center justify-between h-20 bg-[#e2e1e1] w-full'>
            <h1 className='font-bold text-3xl mx-10'>Bienvenido, Nick</h1>
            <div className='flex-1'></div>
            <picture className='text-[#FFB749] font-bold max-2xl:text-2xl flex items-center'>Paw<span className='text-[#124C5F] font-bold'>-Paseo</span>
            <Image
            alt="Paw-Paseo"
            src={Paw}
            width={264} 
            height={121} 
            className="w-24 h-16 mr-5"
            />
            </picture>
        </header>
    )
}

export default HeaderAdmin