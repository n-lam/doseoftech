import { GetServerSideProps, NextPage } from 'next';
import ErrorPage from 'next/error';
import React, { MouseEventHandler, useState } from 'react';

import Container from '@material-ui/core/Container';
import { IconButton, Typography } from '@material-ui/core';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import Snackbar from '@material-ui/core/Snackbar';
import Axios from 'axios';
import Header from '../../components/Header';
import { BlogPostModel } from '../../models/BlogPost';
import BlogPostComponent from '../../components/BlogPost';

type Error = {
  error: unknown;
};

type PropsWithError = BlogPostModel | Error;

const BlogPost: NextPage<PropsWithError> = (props) => {
  const [state, setState] = useState({
    likes: 0,
    hasLiked: false,
    openSnackbar: false,
  });

  const errorProps = props as Error;
  if (errorProps.error) {
    return <ErrorPage statusCode={404} />;
  }
  const { title, content, coverPhoto } = props as BlogPostModel;

  const likeHandler: MouseEventHandler = async () => {
    if (state.hasLiked) {
      setState({ ...state, likes: state.likes - 1, hasLiked: !state.hasLiked });
    } else {
      setState({ ...state, likes: state.likes + 1, hasLiked: !state.hasLiked });
    }
  };

  const handleClose = () => {
    setState({ ...state, openSnackbar: false });
  };

  return (
    <>
      <Header />
      <Container>
        <BlogPostComponent title={title} content={content} coverPhoto={coverPhoto} />
        <div>
          <IconButton
            color={state.hasLiked ? 'primary' : 'inherit'}
            aria-label="Like"
            onClick={likeHandler}
          >
            <ThumbUpRoundedIcon />
          </IconButton>
          <Typography variant="button">{state.likes}</Typography>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={state.openSnackbar}
            onClose={handleClose}
            message="You need to sign in first"
          />
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PropsWithError> = async ({ params }) => {
  try {
    const { data } = await Axios.get<BlogPostModel[]>(
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
