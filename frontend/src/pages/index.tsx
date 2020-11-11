import React from 'react';
import { NextPage } from 'next';
import Header from '../components/Header';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { getUserFromLocalCookie, getUserFromServerCookie } from '../utils/auth';

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

type HomeProps = {
  isAuthenticated: boolean;
};

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <Header />
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
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
