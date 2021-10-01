// eslint-disable-next-line import/no-cycle
import {
  getUser, posts, logOut,
} from '../firebase.js';
// eslint-disable-next-line import/no-cycle
import { loadPosts, divPostP } from '../../utils/crudWall.js';

export const Wall = () => {
  document.body.style.backgroundColor = '#ffffff';

  const wallDiv = document.createElement('div');
  wallDiv.id = 'wallDiv';

  const user = getUser();
  let displayName = '';
  if (user) {
    displayName = user.displayName;
  }
  const logoWall = document.createElement('img');
  logoWall.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/logo-pata-de-perro-red.png?alt=media&token=dc5ad00d-8d94-4a1b-88a2-1bf72802fb04');
  logoWall.setAttribute('alt', 'logo pata de perro');
  logoWall.classList.add('logoWall');

  const labelUser = document.createElement('label');
  labelUser.classList.add('labelUser');
  labelUser.innerText = displayName;

  const btnLogOut = document.createElement('button');
  btnLogOut.classList.add('btnLogOut');
  btnLogOut.textContent = 'Log out';

  const labelWelcome = document.createElement('label');
  labelWelcome.classList.add('labelWelcome');
  labelWelcome.innerText = 'Bienvenid@';

  const postBox = document.createElement('div');
  postBox.id = 'postBox';

  const postUser = document.createElement('textarea');
  postUser.id = 'post';
  postUser.placeholder = 'Escribe tus consejos aqui';

  const errorText = document.createElement('label');
  errorText.classList.add('errorTextLabel');

  const btnPublish = document.createElement('button');
  btnPublish.id = 'btnPublish';
  btnPublish.textContent = 'Publicar';

  window.onload = loadPosts();

  btnLogOut.addEventListener('click', () => logOut());

  btnPublish.addEventListener('click', (e) => {
    e.preventDefault();
    const textUser = wallDiv.querySelector('#post').value;
    const newPost = (textUser === '')
      ? errorText.textContent = 'No has escrito nada aún'
      : posts(user.displayName, textUser)
        .then((result) => {
          wallDiv.querySelector('#post').value = '';
          errorText.textContent = '';
        })
        .catch((error) => {
          console.log(error.message);
        });
    return newPost;
  });

  wallDiv.append(logoWall, labelUser, btnLogOut, labelWelcome, postBox);
  postBox.append(postUser, errorText, btnPublish, divPostP);

  return wallDiv;
};
