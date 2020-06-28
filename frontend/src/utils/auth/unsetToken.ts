import Cookies from 'js-cookie';

const unsetToken = (): void => {
  if (!process.browser) {
    return;
  }
  Cookies.remove('username');
  Cookies.remove('jwt');
};

export default unsetToken;
