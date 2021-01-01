import { NextPage } from 'next';
import React from 'react';
import FeatureArticle from '../components/FeatureArticle';
import Header from '../components/Header';

type HomeProps = {
  isAuthenticated: boolean;
};

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <Header />
      <FeatureArticle />
    </>
  );
};

export default Home;
