// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../main.js';
// eslint-disable-next-line import/no-cycle
import { authGoogle, registerUser } from '../firebase.js';
// eslint-disable-next-line import/no-cycle
import { ErrorValidate } from '../../utils/errorValidate.js';

export const Register = () => {
  document.body.style.backgroundColor = '#ffffff';
  const Homediv = document.createElement('div');
  Homediv.classList.add('homediv');

  const buttonHome = document.createElement('button');
  buttonHome.classList.add('buttonBack');

  const labelRegister = document.createElement('label');
  labelRegister.textContent = 'Regístrate';
  labelRegister.id = 'labelRegister';

  const labelSubtitle = document.createElement('label');
  labelSubtitle.textContent = 'Inicia la aventura';
  labelSubtitle.id = 'labelSub';

  const divFormRegister = document.createElement('div');
  divFormRegister.classList.add('divFormRegister');

  const inputUsername = document.createElement('input');
  inputUsername.setAttribute('type', 'text');
  inputUsername.placeholder = 'Nombre de usuario';
  inputUsername.id = 'inputUsername';
  inputUsername.required = true;

  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.id = 'inputEmail';
  inputEmail.required = true;

  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.placeholder = 'Contraseña';
  inputPassword.id = 'inputPassword';
  inputPassword.required = true;

  const eyeOff = document.createElement('img');
  eyeOff.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/outline_visibility_off_black_24dp.png?alt=media&token=981cfa55-bea9-47cb-a710-c27509e22066');
  eyeOff.id = 'eyeOff';
  eyeOff.style.display = 'block';

  const eyeOn = document.createElement('img');
  eyeOn.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/outline_visibility_black_24dp.png?alt=media&token=655a1895-dbf3-4495-a2f5-7b1f1bf977b1');
  eyeOn.id = 'eyeOn';
  eyeOn.style.display = 'none';

  const inputPasswordConfirm = document.createElement('input');
  inputPasswordConfirm.setAttribute('type', 'password');
  inputPasswordConfirm.placeholder = 'Confirmación';
  inputPasswordConfirm.id = 'inputConfirm';
  inputPasswordConfirm.required = true;

  const buttonRegister = document.createElement('button');
  buttonRegister.setAttribute('type', 'submit');
  buttonRegister.id = 'buttonRegister';
  buttonRegister.textContent = 'Regístrate';

  const labelErr = document.createElement('label');
  labelErr.classList.add('labelErr');

  const buttonGoogleRegister = document.createElement('button');
  buttonGoogleRegister.textContent = 'Registrarse con Google';
  buttonGoogleRegister.id = 'btnGoogle';

  const imgGoogle = document.createElement('img');
  imgGoogle.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/logoGoogle.png?alt=media&token=558171fa-a3a2-485d-8ee0-14a5493ec4d3');
  imgGoogle.classList.add('imgGoogleReg');

  buttonHome.addEventListener('click', () => onNavigate('/'));

  eyeOff.addEventListener('click', () => {
    const passwordValue = Homediv.querySelector('#inputPassword');
    const passwordConfirmValue = Homediv.querySelector('#inputConfirm');
    if (passwordValue.type === 'password') {
      passwordValue.type = 'text';
      passwordConfirmValue.type = 'text';
      eyeOff.style.display = 'none';
      eyeOn.style.display = 'block';
    }
  });

  eyeOn.addEventListener('click', () => {
    const passwordValue = Homediv.querySelector('#inputPassword');
    const passwordConfirmValue = Homediv.querySelector('#inputConfirm');
    if (passwordValue.type === 'text') {
      passwordValue.type = 'password';
      passwordConfirmValue.type = 'password';
      eyeOff.style.display = 'block';
      eyeOn.style.display = 'none';
    }
  });

  buttonGoogleRegister.addEventListener('click', () => {
    authGoogle(onNavigate);
  });

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const emailRegister = Homediv.querySelector('#inputEmail').value;
    const passwordRegister = Homediv.querySelector('#inputPassword').value;
    registerUser(emailRegister, passwordRegister)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        userCredential.user.updateProfile({ displayName: document.getElementById('inputUsername').value });
        alert('Registro exitoso');
        onNavigate('/login');
      })
      .catch((error) => {
        console.log(error);
        labelErr.innerText = ErrorValidate(error.code);
      });
  });

  Homediv.append(buttonHome, labelRegister, labelSubtitle);
  Homediv.appendChild(divFormRegister);
  divFormRegister.append(inputUsername, inputEmail, inputPassword, eyeOn,
    eyeOff, inputPasswordConfirm, buttonRegister, buttonGoogleRegister, imgGoogle, labelErr);

  return Homediv;
};
