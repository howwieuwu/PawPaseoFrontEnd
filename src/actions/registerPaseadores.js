"use server";

export const RegisterPaseadorAction = async (formData) => {
  const { nombre, telefono, ciudad, email, services,  password, confirmPassword } =
    Object.fromEntries(formData);

  const DataforBackend = { nombre, telefono, ciudad, email, services,  password, confirmPassword };

  const resp = await fetch("https://pawpaseo-backend-phi.vercel.app/api/paseador", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(DataforBackend),
  });

  const respData = await resp.json();

  return respData;
};
