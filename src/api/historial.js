export const getHistorialPaseadores = async () => {
  const resp = await fetch(
    "https://pawpaseo-backend-phi.vercel.app/api/peticionhistorial",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const {historialFound} = await resp.json();
  return historialFound;
};
