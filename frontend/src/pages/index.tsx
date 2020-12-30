import React from 'react';
import { NextPage } from 'next';
import Header from '../components/Header';
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

export default Home;
