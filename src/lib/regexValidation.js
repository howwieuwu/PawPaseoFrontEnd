const emailRegex =
/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|edu|gov|mil|biz|info|name|museum|coop|aero|jobs|mobi|travel|[a-zA-Z]{2})$/;
if (!emailRegex.test(formData.email)) {
Swal.fire({
  icon: "error",
  title: "Error",
  text: "Ingresa un correo valido",
  timer: 5000,
  timerProgressBar: true,
  showConfirmButton: false,
});
return;
}

const nameRegex = /^[a-zA-Z\s]+$/;
if (!nameRegex.test(formData.nombre)) {
Swal.fire({
  icon: "error",
  title: "Error",
  text: "El nombre solo puede contener letras y espacios",
  timer: 5000,
  timerProgressBar: true,
  showConfirmButton: false,
});
return;
}

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
if (!passwordRegex.test(formData.password)) {
Swal.fire({
  icon: "error",
  title: "Error",
  text: "La contraseña debe contener al menos 8 caracteres, incluyendo al menos un número, una letra minúscula y una letra mayúscula",
  timer: 5000,
  timerProgressBar: true,
  showConfirmButton: false,
});
return;
}

if (formData.password !== formData.confirmPassword) {
Swal.fire({
  icon: "error",
  title: "Error",
  text: "Las contraseñas no coinciden",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});
return;
}

const emailExists = await checkIfExists("email", formData.email);

console.log(emailExists);

if (!emailExists.error) {
Swal.fire({
  icon: "error",
  title: "Error",
  text: "El correo electrónico ya está registrado en nuestro sistema.",
  timer: 5000,
  timerProgressBar: true,
  showConfirmButton: false,
});
return;
}