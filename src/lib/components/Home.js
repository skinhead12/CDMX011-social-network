// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../main.js';
// eslint-disable-next-line import/no-cycle
import { authGoogle } from '../firebase.js';

export const Home = () => {
  const Homediv = document.createElement('div');
  Homediv.style.backgroundColor = '#ffffff';
  Homediv.classList.add('homediv');

  const airplane = document.createElement('img');
  airplane.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/airplane-yellow.png?alt=media&token=834352f1-665e-4bb3-8924-d682e786c8ec');
  airplane.id = 'airplane';

  const logo = document.createElement('img');
  logo.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/logo-pata-de-perro-red.png?alt=media&token=dc5ad00d-8d94-4a1b-88a2-1bf72802fb04');
  logo.alt = 'logo pata de perro';
  logo.id = 'logo';

  const labelWelcome = document.createElement('label');
  labelWelcome.textContent = 'Travelers conectados';
  labelWelcome.id = 'welcome';

  const passport = document.createElement('img');
  passport.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/passport.png?alt=media&token=bd477459-fe1f-4c31-9b2b-33cd4692d145');
  passport.id = 'passport';

  const divButtons = document.createElement('div');
  divButtons.classList.add('divButtons');

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Regístrate';
  buttonRegister.id = 'btnRegister';

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Iniciar Sesión';
  buttonLogin.id = 'btnLogin';

  const labelOr = document.createElement('label');
  labelOr.textContent = 'o';
  labelOr.id = 'labelO';

  const buttonGoogle = document.createElement('button');
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.id = 'btnGoogle';

  const imgGoogle = document.createElement('img');
  imgGoogle.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/logoGoogle.png?alt=media&token=558171fa-a3a2-485d-8ee0-14a5493ec4d3');
  imgGoogle.classList.add('imgGoogle');

  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonGoogle.addEventListener('click', () => authGoogle(onNavigate));

  Homediv.append(airplane, logo, labelWelcome, passport);
  Homediv.appendChild(divButtons);
  divButtons.append(buttonRegister, buttonLogin, labelOr, buttonGoogle, imgGoogle);
  return Homediv;
};
