
// eslint-disable-next-line import/no-cycle
import { getPosts, getUser, posts } from '../firebase.js';

export const Wall = () => {
  const wallDiv = document.createElement('div');
  wallDiv.id = 'wallDiv';

  const labelWall = document.createElement('label');
  labelWall.textContent = 'Log out';

  const postBox = document.createElement('div');
  postBox.id = 'postBox';

  const labelUser = document.createElement('label');
  labelUser.textContent = 'Usuario';

  const labelDate = document.createElement('label');
  labelDate.textContent = 'Fecha';

  const postUser = document.createElement('textarea');
  postUser.id = 'post';
  postUser.placeholder = 'Escribe tus consejos aqui';

  const btnPublish = document.createElement('button');
  btnPublish.id = 'btnPublish';
  btnPublish.textContent = 'Publicar';

  const divPosts = document.createElement('div');

  const areaPost = document.createElement('p');
  areaPost.classList.add('areaPost');

  window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getPosts();
    querySnapshot.forEach((doc) => {
      const contentPost = doc.data();
      console.log(doc.data());
      areaPost.textContent = contentPost.username + contentPost.post;
    });
  });

  btnPublish.addEventListener('click', async (e) => {
    e.preventDefault();
    const textUser = document.getElementById('post').value;
    const user = getUser().displayName;
    await posts(user, textUser)
      .then((result) => {
        document.getElementById('post').value = '';
        console.log(textUser);
        console.log(result, user);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  wallDiv.appendChild(labelWall);
  wallDiv.append(postBox);
  postBox.append(labelUser, labelDate, postUser, btnPublish, divPosts);
  divPosts.appendChild(areaPost);

  return wallDiv;
};
