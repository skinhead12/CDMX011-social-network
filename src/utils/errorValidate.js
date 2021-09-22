export const ErrorValidate = (error) => {
  let result = '';
  if (error === 'auth/invalid-email') {
    result = 'Formato de correo inválido';
  } else if (error === 'auth/weak-password') {
    result = 'La contraseña es muy corta';
  } else if (error === 'auth/email-already-in-use') {
    result = 'Este usuario ya está registrado';
  } else if (error === 'auth/wrong-password') {
    result = 'Contraseña incorrecta';
  } else if (error === 'auth/user-not-found') {
    result = 'Este usuario no está registrado';
  }
  return result;
};
