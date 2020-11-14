import React from 'react';
import { NextPage } from 'next';
import Header from '../components/Header';
import { getUserFromLocalCookie, getUserFromServerCookie } from '../utils/auth';
import FeatureArticle from '../components/FeatureArticle';

type HomeProps = {
  isAuthenticated: boolean;
};

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <Header />
      <main>
        <FeatureArticle />
      </main>
    </>
  );
};

Home.getInitialProps = ({ req }) => {
  const { username, jwt } = process.browser
    ? getUserFromLocalCookie()
    : getUserFromServerCookie(req);
  return {
    username,
    jwt,
    isAuthenticated: !!username,
  };
};

export default Home;
