import { GetServerSideProps, NextPage } from 'next';
import ErrorPage from 'next/error';
import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Container from '@material-ui/core/Container';

// import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import Image from '../../components/Image';
import { BlogPostModel } from '../../models/BlogPost';

type Error = {
  error: unknown;
};

type PropsWithError = BlogPostModel | Error;

const BlogPost: NextPage<PropsWithError> = (props) => {
  const errorProps = props as Error;
  if (errorProps.error) {
    return <ErrorPage statusCode={404} />;
  }

  const { title, content, coverPhoto } = props as BlogPostModel;
  const renderers = {
    image: Image,
  };
  return (
    <>
      <Header />
      <Container>
        <h1>{title}</h1>
        {!!coverPhoto && (
          <Image
            src={`${coverPhoto.formats.medium?.url || coverPhoto.url}`}
            alt={coverPhoto.alternativeText}
          />
        )}
        <ReactMarkdown source={content} renderers={renderers} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PropsWithError> = async ({ params }) => {
  try {
    const { data } = await axios.get<BlogPostModel[]>(
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
