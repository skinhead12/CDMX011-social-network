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
    console.log(displayName);
  }
  const logoWall = document.createElement('img');
  logoWall.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/logo-pata-de-perro-red.png?alt=media&token=dc5ad00d-8d94-4a1b-88a2-1bf72802fb04');
  logoWall.setAttribute('alt', 'logo pata de perro');
  logoWall.classList.add('logoWall');

  const labelUser = document.createElement('label');
  labelUser.innerText = displayName;

  const btnLogOut = document.createElement('button');
  btnLogOut.textContent = 'Log out';
  btnLogOut.classList.add('logOut');

  const postBox = document.createElement('div');
  postBox.id = 'postBox';
  postBox.classList.add('postBox');

  const postUser = document.createElement('textarea');
  postUser.id = 'post';
  postUser.classList.add('postUser');
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

  wallDiv.append(logoWall, labelUser, btnLogOut, postBox);
  postBox.append(postUser, errorText, btnPublish, divPostP);

  return wallDiv;
};
