// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../main.js';
import { LoginUser } from '../firebase.js';

export const Login = () => {
  document.body.style.backgroundColor = '#ffffff';
  const Homediv = document.createElement('div');
  const buttonHome = document.createElement('button');
  const labelLogin = document.createElement('label');
  labelLogin.classList.add('labelLogin');

  const username = document.createElement('input');
  username.placeholder = 'Email';

  const password = document.createElement('input');
  password.placeholder = 'Password';
  password.setAttribute('type', 'password');

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Inicia sesión';
  buttonLogin.id = 'btnLogin';

  buttonHome.textContent = 'Regresar';
  buttonHome.addEventListener('click', () => onNavigate('/'));

  const buttonGoogle = document.createElement('button');
  buttonGoogle.textContent = 'Continuar con Google';

  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => {
        window.location.assign('/wall');
        console.log('sign up with google');
      })
      .catch((error) => {
        console.error(error);
      });
  });

  buttonLogin.addEventListener('click', (e) => {
    const emailLogin = document.getElementById('email');
    const passwordLogin = document.getElementById('password');
    e.preventDefault();
    LoginUser(emailLogin, passwordLogin);
  });

  Homediv.append(buttonHome, labelLogin, username, password, buttonLogin, buttonGoogle);

  return Homediv;
};
