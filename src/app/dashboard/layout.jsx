import Header from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <>
        <div className="flex min-h-screen w-screen">
            <Sidebar />
            <div className="flex flex-col w-full">  
            <Header />  
            {children}
            </div>
        </div>
        </>
    );
}
