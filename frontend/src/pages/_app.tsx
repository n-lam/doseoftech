import React, { useContext, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Head from 'next/head';
import theme from '../styles/theme';
import AuthContext from '../utils/AuthContext';

type UserData = {
  username: string;
};

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const initialTime: Date = null;
  const initialToken: string = null;
  const initialData: UserData = null;

  const TIME_TO_LIVE = 1000 * 60 * 60;

  const router = useRouter();

  const initialAuthData = {
    token: initialToken,
    userData: initialData,
    tokenExpiration: initialTime,
  };

  const authContext = useContext(AuthContext);

  const [authData, setAuthData] = useState(initialAuthData);
  const [cookies, setCookie] = useCookies(['name']);

  const login = (newToken, newUserData) => {
    const expiration = new Date(new Date().getTime() + TIME_TO_LIVE);
    console.log('Logging in with', { newToken, expiration, newUserData });
    setAuthData({ token: newToken, tokenExpiration: expiration, userData: newUserData });
    router.push('/');
  };

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const data = cookies.user;

    if (data && data.token) {
      console.log('Found user data', data);
      setAuthData(data);
    }
  }, [cookies]);

  useEffect(() => {
    console.log('Current state', authData);
    setCookie('user', authData, { path: '/' });
  }, [setCookie, authData]);

  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;
    if (authData.tokenExpiration) {
      const expirationTime = new Date(authData.tokenExpiration);
      const remainingTime = expirationTime.getTime() - new Date().getTime();
      console.log('Setting timeout for', expirationTime);
      logoutTimer = setTimeout(authContext.logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
      console.log('Logged out');
    }
  }, [authContext.logout, authData.tokenExpiration]);

  const logout = () => {
    setAuthData({ token: null, userData: null, tokenExpiration: null });
    setCookie('user', {});
    router.push('/');
  };

  const { token, userData } = authData;

  return (
    <>
      <Head>
        <title>Dose of Tech</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthContext.Provider value={{ isAuthenticated: !!token, userData, token, login, logout }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthContext.Provider>
    </>
  );
};

export default MyApp;
