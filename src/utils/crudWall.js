// eslint-disable-next-line import/no-cycle
import {
  deletePost, onGetPost, getUser, updatePost, likePost, dislikePost,
} from '../lib/firebase.js';

export const divPostP = document.createElement('div');
divPostP.classList.add('divPostP');

export const loadPosts = async () => {
  onGetPost((querySnapshot) => {
    divPostP.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const contentPost = doc.data();
      contentPost.id = doc.id;

      const userLike = contentPost.like.includes(getUser().email);

      const divPost = document.createElement('div');
      divPost.classList.add('divPost');

      const postUsername = document.createElement('h3');
      postUsername.classList.add('postUn');
      postUsername.textContent = contentPost.username;

      const date = document.createElement('p');
      date.classList.add('date');
      date.textContent = `${contentPost.date} ${contentPost.time}`;

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

      const like = document.createElement('img');
      like.setAttribute('src', `${userLike ? 'https://firebasestorage.googleapis.com/v0/b/pata-de-perro-3a9dd.appspot.com/o/ritmo-cardiaco.png?alt=media&token=eaadd91c-4a04-4648-83d6-7c01606fd52e' : 'https://firebasestorage.googleapis.com/v0/b/social-network-ba343.appspot.com/o/ritmo-cardiaco.png?alt=media&token=7b66552b-b1e2-4f0e-8a67-51324dfa502f'}`);
      like.dataset.id = contentPost.id;
      like.id = 'like';

      const count = document.createElement('label');
      count.textContent = contentPost.like.length;

      const btnSave = document.createElement('button');
      btnSave.classList.add('btnSave');
      btnSave.textContent = 'Guardar';
      btnSave.style.display = 'none';

      const btnCancelEdit = document.createElement('button');
      btnCancelEdit.classList.add('btnCancelEdit');
      btnCancelEdit.textContent = 'Cancelar';
      btnCancelEdit.style.display = 'none';

      const btnDelete = document.createElement('button');
      btnDelete.classList.add('btnDelete');
      btnDelete.dataset.id = contentPost.id;

      const btnEdit = document.createElement('button');
      btnEdit.classList.add('btnEdit');
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
      btnMsgCancel.classList.add('btnMsgCancel');
      btnMsgCancel.textContent = 'Cancelar';

      divPostP.append(divPost);
      divPost.append(postUsername, date, areaPost, editArea, divBtns, modalContainer);
      divBtns.append(like, count, btnEdit, btnDelete, btnSave, btnCancelEdit);
      modalContainer.appendChild(modal);
      modal.append(msgDelete, btnMsgDelete, btnMsgCancel);

      const btnsDelete = divPost.querySelectorAll('.btnDelete');
      const modalDisplay = divPost.querySelector('.modalContainer');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          modalDisplay.style.display = 'block';
          modalContainer.classList.add('show');
          modalDisplay.addEventListener('click', (event) => {
            const deleteConfirm = () => deletePost(e.target.dataset.id);
            if (event.target.classList.contains('btnMsgDelete')) {
              console.log('No nos hacemos responsables por cosas que después no vas a poder recuperar');
              deleteConfirm();
              modalDisplay.style.display = 'none';
            } else if (event.target.classList.contains('btnMsgCancel')) {
              modalDisplay.style.display = 'none';
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
          btnCancelEdit.style.display = 'block';
          btnDelete.style.display = 'none';
          btnEdit.style.display = 'none';
          like.style.display = 'none';
          count.style.display = 'none';
        });
      });

      const btnsSave = divPost.querySelectorAll('.btnSave');
      btnsSave.forEach((btn) => {
        btn.(addEventListener'click', () => {
          const postChange = divPost.querySelector('.editArea').value;
          updatePost(contentPost.id, {
            post: postChange,
          });
          editArea.style.display = 'block';
        });
      });

      const btnsCancelEd = divPost.querySelector('.btnCancelEdit');
      btnsCancelEd.addEventListener('click', () => {
        areaPost.style.display = 'block';
        editArea.style.display = 'none';
        btnSave.style.display = 'none';
        btnCancelEdit.style.display = 'none';
        btnDelete.style.display = 'block';
        btnEdit.style.display = 'block';
        like.style.display = 'block';
        count.style.display = 'block';
      });

      const btnsLike = divBtns.querySelectorAll('#like');
      btnsLike.forEach((btn) => {
        btn.addEventListener('click', async () => {
          if (!contentPost.like.includes(getUser().email)) {
            try {
              await likePost(contentPost.id);
            } catch (error) {
              console.log('hay un error', error);
            }
          } else {
            try {
              await dislikePost(contentPost.id);
            } catch (error) {
              console.log('hubo un error', error);
            }
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
