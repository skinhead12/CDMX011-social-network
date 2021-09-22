// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../main.js';
// eslint-disable-next-line import/no-cycle
import { authGoogle } from '../firebase.js';

export const Home = () => {
  document.body.style.backgroundColor = '#F2B705';
  const Homediv = document.createElement('div');

  const airplane = document.createElement('img');
  airplane.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/avion.png?alt=media&token=1719248f-44c5-4d22-b32b-664e31992608');
  airplane.id = 'airplane';

  const logo = document.createElement('img');
  logo.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/logo-pata-de-perro.png?alt=media&token=338afd9b-ad90-453b-9007-05416b3dda22');
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
  buttonGoogle.addEventListener('click', () => {
    authGoogle(onNavigate);
  });

  Homediv.append(airplane, logo, labelWelcome, passport);
  Homediv.appendChild(divButtons);
  divButtons.append(buttonRegister, buttonLogin, labelOr, buttonGoogle, imgGoogle);

  return Homediv;
};
