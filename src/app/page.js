"use client";
import { Comentarios, Header, Main, Servicios } from "@/components/LandingPage";
import AcercaDe from "@/components/LandingPage/AcercaDe/AcercaDe";
import Footer from "@/components/LandingPage/Footer/Footer";
import { useState } from "react";



export default function Home() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div>
                <Header setOpen={setOpen} open={open} />
                <Main open={open} setOpen={setOpen} />
                <Servicios />
                <AcercaDe />
                <Comentarios />
                <Footer />
            </div>
        </>
    );
}
