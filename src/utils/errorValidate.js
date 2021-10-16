export const ErrorValidate = (error) => {
  let result;
  switch (error) {
    default:
      result = 'Se ha registrado un error. Intenta de nuevo';
      break;
    case 'auth/invalid-email':
      result = 'Formato de correo inválido';
      break;
    case 'auth/weak-password':
      result = 'La contraseña es muy corta';
      break;
    case 'auth/email-already-in-use':
      result = 'Este usuario ya está registrado';
      break;
    case 'auth/wrong-password':
      result = 'Contraseña incorrecta';
      break;
    case 'auth/user-not-found':
      result = 'Este usuario no está registrado';
      break;
  }
  return result;
};
