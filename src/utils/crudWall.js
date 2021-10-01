// eslint-disable-next-line import/no-cycle
import { deletePost, onGetPost, editPost } from '../lib/firebase.js';

export const divPostP = document.createElement('div');
divPostP.classList.add('divPostP');

export const loadPosts = async () => {
  onGetPost((querySnapshot) => {
    divPostP.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const contentPost = doc.data();
      contentPost.id = doc.id;

      const divPost = document.createElement('div');
      divPost.classList.add('divPost');

      const postUsername = document.createElement('h3');
      postUsername.classList.add('postUn');
      postUsername.textContent = contentPost.username;

      const areaPost = document.createElement('p');
      areaPost.classList.add('areaPost');
      areaPost.textContent = contentPost.post;

      const btnDelete = document.createElement('button');
      btnDelete.classList.add('btnDelete');
      btnDelete.textContent = 'Eliminar';
      btnDelete.dataset.id = contentPost.id;

      const btnUpdate = document.createElement('button');
      btnUpdate.classList.add('btnUpdate');
      btnUpdate.textContent = 'Editar';
      btnUpdate.dataset.id = contentPost.id;

      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modalContainer');
      modalContainer.style.display = 'none';
      const modal = document.createElement('div');
      modal.classList.add('modal');
      const msgDelete = document.createElement('p');
      msgDelete.classList.add('msgDelete');
      msgDelete.textContent = '¿Estás seguro de querer borrar este post?';
      const btnMsgDelete = document.createElement('button');
      btnMsgDelete.classList.add('btnMsgDelete');
      btnMsgDelete.textContent = 'Eliminar';
      btnMsgDelete.dataset.id = contentPost.id;
      const btnMsgCancel = document.createElement('button');
      btnMsgCancel.textContent = 'Cancelar';

      divPostP.append(divPost);
      divPost.append(postUsername, areaPost, btnDelete, modalContainer, btnUpdate);
      modalContainer.appendChild(modal);
      modal.append(msgDelete, btnMsgDelete, btnMsgCancel);
      /*     const btnsDelete = divPosts.querySelectorAll('.btnDelete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        console.log(e.target.dataset.id);
      });
    }); */
      const btnsDelete = divPost.querySelectorAll('.btnDelete');
      const prueba = divPost.querySelector('.modalContainer');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          prueba.style.display = 'block';
          const pruebados = () => deletePost(e.target.dataset.id);
          prueba.addEventListener('click', (event) => {
            console.log(event.target);
            if (event.target.classList.contains('btnMsgDelete')) {
              console.log('soy el boton eliminar');
              pruebados();
              prueba.style.display = 'none';
            } else if (event.target.classList.contains('btnMsgCancel')) {
              prueba.style.display = 'none';
              console.log('cancel event');
            }
          });
        });
      });
      const btnsEdit = divPost.querySelectorAll('.btnUpdate');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const back = editPost(e.target.dataset.id);
          console.log(back);
        });
      });
    });
  });
};
