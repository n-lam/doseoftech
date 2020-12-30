import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  userData: null,
  token: null,
  login: (newToken, newUserData) => {
    console.log(newToken, newUserData);
  },
  logout: () => {
    console.log('Logout function');
  },
});

export default AuthContext;
