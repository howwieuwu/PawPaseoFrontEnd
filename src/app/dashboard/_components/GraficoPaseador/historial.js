"use server";
export const getPaseadores = async () => {
    const id  = JSON.parse().id;

    const resp = await fetch("https://pawpaseo-backend-phi.vercel.app/api/peticionhistorial", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const {historialFound} = await resp.json();

    return historialFound;
};


