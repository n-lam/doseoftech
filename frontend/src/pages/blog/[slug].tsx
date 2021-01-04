import { GetServerSideProps, NextPage } from 'next';
import ErrorPage from 'next/error';
import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Container from '@material-ui/core/Container';

// import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import Image from '../../components/Image';

type BlogPostProps = {
  title: string;
  content: string;
  coverPhoto: {
    name: string;
    url: string;
    alternativeText: string;
  };
};

type Error = {
  error: unknown;
};

type PropsWithError = BlogPostProps | Error;

const BlogPost: NextPage<PropsWithError> = (props) => {
  const errorProps = props as Error;
  if (errorProps.error) {
    return <ErrorPage statusCode={404} />;
  }

  const { title, content, coverPhoto } = props as BlogPostProps;
  const renderers = {
    image: Image,
  };
  return (
    <>
      <Header />
      <Container>
        <h1>{title}</h1>
        <Image src={coverPhoto.url} alt={coverPhoto.alternativeText} />
        <ReactMarkdown source={content} renderers={renderers} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PropsWithError> = async ({ params }) => {
  try {
    const { data } = await axios.get<BlogPostProps[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs?slug=${params.slug}`
    );

    if (!data[0]) {
      throw new Error('No blog found');
    }

    return { props: data[0] };
  } catch (error) {
    return {
      props: { error: JSON.stringify(error) },
    };
  }
};

export default BlogPost;
