// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../main.js';
import { registerUser } from '../firebase.js';
import firebase, { auth } from '../secret.js';

export const Register = () => {
  const Homediv = document.createElement('div');
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Regresar';

  const labelRegister = document.createElement('label');
  labelRegister.textContent = 'Regístrate';
  labelRegister.id = 'labelRegister';

  const labelSubtitle = document.createElement('label');
  labelSubtitle.textContent = 'Inicia la aventura';
  labelSubtitle.id = 'labelSub';
  /*   const formRegister = document.createElement('form');
  formRegister.setAttribute('type', 'submit');
  formRegister.id = 'formRegister'; */
  const inputUsername = document.createElement('input');
  inputUsername.setAttribute('type', 'text');
  inputUsername.placeholder = 'Nombre de usuario';
  inputUsername.id = 'inputUsername';

  const eyeShow = document.createElement('span');
  eyeShow.id = 'showPass';

  const eyeHide = document.createElement('span');
  eyeHide.id = 'hidePass';

  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.id = 'inputEmail';

  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.placeholder = 'Contraseña';
  inputPassword.id = 'inputPassword';

  const inputPasswordConfirm = document.createElement('input');
  inputPasswordConfirm.setAttribute('type', 'password');
  inputPasswordConfirm.placeholder = 'Confirmación';
  inputPasswordConfirm.id = 'inputConfirm';

  const buttonRegister = document.createElement('button');
  buttonRegister.setAttribute('type', 'submit');
  buttonRegister.id = 'buttonRegister';
  buttonRegister.textContent = 'Regístrate';

  const buttonGoogleRegister = document.createElement('button');
  buttonGoogleRegister.textContent = 'Registrarse con Google';
  buttonGoogleRegister.id = 'btnGoogleRegister';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  buttonGoogleRegister.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line import/no-named-as-default-member
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        onNavigate('/wall');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  buttonRegister.addEventListener('click', (e) => {
    const emailRegister = Homediv.querySelector('#inputEmail').value;
    const passwordRegister = Homediv.querySelector('#inputPassword').value;
    e.preventDefault();
    registerUser(emailRegister, passwordRegister);
    console.log(registerUser);
    onNavigate('/login');
  });
  /*
  Homediv.appendChild(formRegister); */
  Homediv.appendChild(buttonHome);
  Homediv.appendChild(labelRegister);
  Homediv.appendChild(labelSubtitle);
  Homediv.appendChild(inputUsername);
  Homediv.appendChild(inputEmail);
  Homediv.appendChild(eyeShow);
  Homediv.appendChild(eyeHide);
  Homediv.appendChild(inputPassword);
  Homediv.appendChild(inputPasswordConfirm);
  Homediv.appendChild(buttonRegister);
  Homediv.appendChild(buttonGoogleRegister);

  return Homediv;
};
