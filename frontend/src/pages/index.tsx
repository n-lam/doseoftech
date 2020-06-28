import React from 'react';
import { NextPage } from 'next';
import Header from '../components/header';
import MainFeaturedPost from '../components/mainFeaturedPost';

const sections = [{ title: 'About Me' }, { title: 'Blog' }];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const Home: NextPage = () => {
  return (
    <>
      <Header title="Dose of Tech" sections={sections} />
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
      </main>
    </>
  );
};

export default Home;
