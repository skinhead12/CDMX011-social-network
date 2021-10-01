import firebase from './secret.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const registerUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const authGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      onNavigate('/wall');
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const loginUser = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

// eslint-disable-next-line max-len
export const userPersistence = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const logOut = () => firebase.auth()
  .signOut()
  .then(() => {
    onNavigate('/');
    console.log('Terminó sesión exitosamente');
  })
  .catch((error) => {
    console.log(error.message);
    alert('Lo sentimos. Ha ocurrido un error');
  });

export const auth = firebase.auth();

export const db = firebase.firestore();

export const getUser = () => firebase.auth().currentUser;

export const getPosts = () => db.collection('posts').get();

export const editPost = (id) => db.collection('posts').doc(id).get(); // ontener de nuevo los datos para editar

export const editSatus = false;

export const onGetPost = (callback) => db.collection('posts').onSnapshot(callback); // obtener datos tiempo real

export const deletePost = (id) => db.collection('posts').doc(id).delete(); // eliminar posts

export const posts = (username, post) => db.collection('posts').add({
  username,
  post,
});
