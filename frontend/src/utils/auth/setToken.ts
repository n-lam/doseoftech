import Cookies from 'js-cookie';
import Router from 'next/router';

const setToken = (username: string, jwt: string): void => {
  if (!process.browser) {
    return;
  }
  Cookies.set('username', username);
  Cookies.set('jwt', jwt);

  if (Cookies.get('username')) {
    Router.push('/');
  }
};

export default setToken;
