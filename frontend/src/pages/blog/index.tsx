import Axios from 'axios';
import { NextPage } from 'next';
import ErrorPage from 'next/error';
import Container from '@material-ui/core/Container';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import remark from 'remark';
import strip from 'strip-markdown';
import Header from '../../components/Header';
import BlogPreviewCard from '../../components/BlogPreviewCard';
import { BlogPostModel } from '../../models/BlogPost';

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
    padding: '10px',
  },
});

const Blog: NextPage<BlogIndexProps> = (props) => {
  const classes = useStyles();
  const error = props as Error;
  if (error.error) {
    console.error(error);
    return <ErrorPage statusCode={404} />;
  }

  const { posts } = props as BlogIndexModel;
  const BlogList = (
    <Grid container justify="center" direction="column" alignItems="center">
      {posts.map((post) => {
        const postDate = new Date(post.created_at).toLocaleDateString('en-GB');
        const description = remark().use(strip).processSync(post.content).toString();
        return (
          <BlogPreviewCard
            key={post.id}
            post={{
              date: postDate,
              description: description.substring(0, 100),
              image: post.coverPhoto?.formats.thumbnail?.url,
              imageText: post.coverPhoto?.alternativeText,
              title: post.title,
              link: post.slug,
            }}
          />
        );
      })}
    </Grid>
  );
  return (
    <>
      <Header />
      <Container className={classes.root} maxWidth="lg">
        {BlogList}
      </Container>
    </>
  );
};

Blog.getInitialProps = async () => {
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

export default Blog;
