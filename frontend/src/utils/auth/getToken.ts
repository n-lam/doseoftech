import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { IncomingMessage } from 'http';

type UserToken = {
  username?: string;
  jwt?: string;
};

export const getUserFromLocalCookie = (): UserToken => {
  return { username: Cookies.get('username'), jwt: Cookies.get('jwt') };
};

export const getUserFromServerCookie = (req: IncomingMessage): UserToken => {
  if (!req.headers.cookie || '') {
    return {
      username: undefined,
      jwt: undefined,
    };
  }

  let username = req.headers.cookie.split(';').find((user) => user.trim().startsWith('username='));
  if (username) {
    [username] = username.split('=');
  }

  const jwtCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('jwt='));
  if (!jwtCookie) {
    return {
      username: undefined,
      jwt: undefined,
    };
  }
  const jwt = jwtCookie.split('=')[1];
  return { jwt: jwtDecode(jwt), username };
};
