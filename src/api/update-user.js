export const UpdateUser = async (formData) => {
  const localData = localStorage.getItem("identifier");
  const id = JSON.parse(localData).id;

  const response = await fetch(
    `https://pawpaseo-backend-phi.vercel.app/admin/update/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
  const result = await response.json();
  return result;
};
