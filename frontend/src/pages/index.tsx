import Axios from 'axios';
import { NextPage } from 'next';
import ErrorPage from 'next/error';
import React from 'react';
import FeaturePost from '../components/FeaturePost';
import Header from '../components/Header';
import { BlogPostModel } from '../models/BlogPost';
import post2Props from '../utils/post2preview';

type Error = {
  error: unknown;
};

type HomeProps = BlogPostModel | Error;

const Home: NextPage<HomeProps> = (props) => {
  const error = props as Error;
  if (error.error) {
    return <ErrorPage statusCode={404} />;
  }
  const post = props as BlogPostModel;
  return (
    <>
      <Header />
      <FeaturePost post={post2Props(post).post} />
    </>
  );
};

Home.getInitialProps = async () => {
  try {
    const { data } = await Axios.get<BlogPostModel[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs`
    );
    if (!data[0]) {
      throw new Error('No blog found');
    }
    return data[0];
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export default Home;
