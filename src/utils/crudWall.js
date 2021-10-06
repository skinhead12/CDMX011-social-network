// eslint-disable-next-line import/no-cycle
import {
  deletePost, onGetPost, getUser, updatePost,
} from '../lib/firebase.js';

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
      areaPost.style.display = 'block';

      const editArea = document.createElement('textarea');
      editArea.classList.add('editArea');
      editArea.style.display = 'none';
      editArea.textContent = contentPost.post;

      const divBtns = document.createElement('div');
      divBtns.classList.add('divBtns');

      const labelCount = document.createElement('label');
      labelCount.textContent = 0;
      labelCount.classList.add('labelCount');

      const like = document.createElement('button');
      like.textContent = 'like';
      like.classList.add('like');

      const btnSave = document.createElement('button');
      btnSave.classList.add('btnSave');
      btnSave.textContent = 'Guardar';
      btnSave.style.display = 'none';

      const btnDelete = document.createElement('button');
      btnDelete.classList.add('btnDelete');
      btnDelete.textContent = 'Eliminar';
      btnDelete.dataset.id = contentPost.id;

      const btnEdit = document.createElement('button');
      btnEdit.classList.add('btnEdit');
      btnEdit.textContent = 'Editar';
      btnEdit.dataset.id = contentPost.id;

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
      divPost.append(postUsername, areaPost, editArea, divBtns, modalContainer);
      divBtns.append(labelCount, like, btnDelete, btnEdit, btnSave);
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
      const btnsEdit = divPost.querySelectorAll('.btnEdit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          console.log(e.target.dataset.id);
          areaPost.style.display = 'none';
          editArea.style.display = 'block';
          btnSave.style.display = 'block';
          btnDelete.style.display = 'none';
          btnEdit.style.display = 'none';
          like.style.display = 'none';
        });
      });

      const btnsSave = divPost.querySelectorAll('.btnSave');
      btnsSave.forEach((btn) => {
        btn.addEventListener('click', () => {
          console.log(contentPost.id);
          const postChange = divPost.querySelector('.editArea').value;
          console.log(postChange);
          updatePost(contentPost.id, { post: postChange });
        });
      });
      let clicked = false;
      const btnsLike = divPost.querySelectorAll('.like');
      const count = divPost.querySelector('.labelCount');
      btnsLike.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!clicked) {
            clicked = true;
            // eslint-disable-next-line no-plusplus
            count.textContent++;
          } else {
            clicked = false;
            // eslint-disable-next-line no-plusplus
            count.textContent--;
          }
        });
      });

      if (contentPost.username !== getUser().displayName) {
        btnDelete.style.display = 'none';
        btnEdit.style.display = 'none';
      }
    });
  });
};
