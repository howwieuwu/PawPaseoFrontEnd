export const getProfileUser = async () => {
  const adminData = localStorage.getItem("identifier");
  const id = JSON.parse(adminData).id;

  const response = await fetch(`https://pawpaseo-backend-phi.vercel.app/admin/data/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { adminFound } = await response.json();
  return adminFound;
};
