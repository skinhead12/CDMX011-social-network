// eslint-disable-next-line import/no-cycle
import { Home } from './lib/components/Home.js';
// eslint-disable-next-line import/no-cycle
import { Register } from './lib/components/Register.js';
// eslint-disable-next-line import/no-cycle
import { Login } from './lib/components/Login.js';
// eslint-disable-next-line import/no-cycle
import { Wall } from './lib/components/wall.js';
// eslint-disable-next-line no-unused-vars
import firebase from './lib/secret.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
  '/wall': Wall,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname]());
};

const components = routes[window.location.pathname];

window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname]());
};

rootDiv.appendChild(components());

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    onNavigate('/wall');
  } else {
    onNavigate('/');
  }
});
