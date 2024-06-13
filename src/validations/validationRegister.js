import Swal from "sweetalert2";

export const validation = (response) => {
  if (response.id) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `¡Registrado con Exito!, Descarga nuestra app para poder iniciar sesión`,
      showConfirmButton: false,
      timer: 10000,
    });
  }

  if (!response.id) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El correo： ya está registrado en nuestro sistema.",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};
