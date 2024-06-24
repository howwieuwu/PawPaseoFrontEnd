"use server";

export const RegisterUserAction = async (formData) => {
  const { nombre, email, telefono, password, confirmPassword } =
    Object.fromEntries(formData);

  const DataforBackend = { nombre, email, telefono, password, confirmPassword };

<<<<<<< HEAD
  const resp = await fetch(
    "https://pawpaseo-backend-phi.vercel.app/api/usuario",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataforBackend),
    }
  );
=======
  const resp = await fetch("https://pawpaseo-backend-phi.vercel.app/api/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(DataforBackend),
  });
>>>>>>> e9b5bcd5d2ca1e065f88bc4499652deaaa1018cd

  const respData = await resp.json();

  return respData;
};
