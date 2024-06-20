export const UpdateUser = async (dataUpdate) => {
  const localData = localStorage.getItem("identifier");
  const id = JSON.parse(localData).id;

  const response = await fetch(
    `https://pawpaseo-backend-phi.vercel.app/admin/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    }
  );
  const result = await response.json();

  return result;
};
