import Axios from 'axios';
import { NextPage } from 'next';
import ErrorPage from 'next/error';
import Container from '@material-ui/core/Container';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { BlogPostModel } from '../components/BlogPost';
import Header from '../components/Header';
import BlogPreviewCard from '../components/BlogPreviewCard';

type BlogIndexModel = {
  posts: BlogPostModel[];
};

type Error = {
  error: unknown;
};

type BlogIndexProps = BlogIndexModel | Error;

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    padding: '50px',
  },
});

const BlogIndex: NextPage<BlogIndexProps> = (props) => {
  const classes = useStyles();
  const error = props as Error;
  if (error.error) {
    console.error(error);
    return <ErrorPage statusCode={404} />;
  }

  const { posts } = props as BlogIndexModel;
  const BlogList = posts.map((post) => {
    return (
      <>
        <BlogPreviewCard
          post={{
            date: post.created_at,
            description: post.content.substring(0, 50),
            image: post.coverPhoto.url,
            imageText: post.coverPhoto.alternativeText,
            title: post.title,
            link: post.slug,
          }}
        />
      </>
    );
  });
  return (
    <>
      <Header />
      <Container className={classes.root} maxWidth="lg">
        {BlogList}
      </Container>
    </>
  );
};

BlogIndex.getInitialProps = async () => {
  try {
    const { data } = await Axios.get<BlogPostModel[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs`
    );
    return {
      posts: data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: JSON.stringify(error),
    };
  }
};

export default BlogIndex;
