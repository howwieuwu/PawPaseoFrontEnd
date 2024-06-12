import { Comentarios, Header, Main, Servicios } from "@/components/LandingPage";
import AcercaDe from "@/components/LandingPage/AcercaDe/AcercaDe";
import Footer from "@/components/LandingPage/Footer/Footer";



export default function Home() {
    return (
        <>
            <Header />
            <Main />
            <Servicios />
            <AcercaDe />
            <Comentarios />
            <Footer />
        </>
    );
}
