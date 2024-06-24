"use server";

export const RegisterUserAction = async (formData) => {
  const { nombre, email, telefono, password, confirmPassword } =
    Object.fromEntries(formData);

  const DataforBackend = { nombre, email, telefono, password, confirmPassword };

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

  const respData = await resp.json();

  return respData;
};
