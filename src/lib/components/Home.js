// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../main.js';
import { auth } from '../secret.js';

export const Home = () => {
  const Homediv = document.createElement('div');
  const airplane = document.createElement('img');
  const logo = document.createElement('img');
  const labelWelcome = document.createElement('label');
  const passport = document.createElement('img');
  // const divWhite = document.createElement('div');
  const buttonRegister = document.createElement('button');
  const buttonLogin = document.createElement('button');
  const labelOr = document.createElement('label');
  const buttonGoogle = document.createElement('button');

  airplane.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/avion.png?alt=media&token=1719248f-44c5-4d22-b32b-664e31992608');
  airplane.id = 'airplane';
  logo.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/logo-pata-de-perro.png?alt=media&token=338afd9b-ad90-453b-9007-05416b3dda22');
  logo.id = 'logo';
  labelWelcome.textContent = 'Travelers conectados';
  labelWelcome.id = 'welcome';
  passport.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/passport.png?alt=media&token=bd477459-fe1f-4c31-9b2b-33cd4692d145');
  passport.id = 'passport';
  //  divWhite.id = 'divWhite';
  buttonRegister.textContent = 'Regístrate';
  buttonRegister.id = 'btnRegister';
  buttonLogin.textContent = 'Iniciar Sesión';
  buttonLogin.id = 'btnLogin';
  labelOr.textContent = 'o';
  labelOr.id = 'labelO';
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.id = 'btnGoogle';

  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
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

  Homediv.appendChild(airplane);
  Homediv.appendChild(logo);
  Homediv.appendChild(labelWelcome);
  Homediv.appendChild(passport);
  // Homediv.appendChild(divWhite);
  Homediv.appendChild(buttonRegister);
  Homediv.appendChild(buttonLogin);
  Homediv.appendChild(labelOr);
  Homediv.appendChild(buttonGoogle);

  return Homediv;
};
