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

export const logOut = () => firebase.auth()
  .signOut()
  .then(() => {
    onNavigate('/');
  })
  .catch((error) => {
    console.log(error.message);
  });

// Posts
const db = firebase.firestore();
export const getUser = () => firebase.auth().currentUser;

export const getPosts = () => db.collection('posts').get();

export const posts = (username, post) => db.collection('posts').add({
  username,
  post,
});
