import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { getUserFromLocalCookie, getUserFromServerCookie } from '../utils/auth';

type SecurePageProps = {
  username: string;
  jwt: string;
  isAuthenticated: boolean;
};

export default (Page: NextPage): NextPage => {
  const SecurePage: NextPage<SecurePageProps> = (props) => {
    const { isAuthenticated } = props;
    if (!isAuthenticated) {
      Router.push('/');
    }
    return <Page {...props} />;
  };

  SecurePage.getInitialProps = ({ req }) => {
    const { username, jwt } = process.browser
      ? getUserFromLocalCookie()
      : getUserFromServerCookie(req);
    return {
      ...this.props,
      username,
      jwt,
      isAuthenticated: !!username,
    };
  };

  return SecurePage;
};

// export default SecurePage;
