import React from 'react';
import Axios from 'axios';
import { NextPage } from 'next';
import Markdown from 'react-markdown';
import { Grid, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import ErrorPage from 'next/error';
import Header from '../components/Header';
import Image from '../components/Image';

type AboutData = {
  description: string;
};

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px',
  },
}));

interface AboutPageProps {
  description?: string;
  error?: string;
}

const About: NextPage<AboutPageProps> = ({ description, error }) => {
  const classes = useStyles();

  if (error) {
    console.error(error);
    return <ErrorPage statusCode={404} />;
  }

  // TODO: Fix typing
  const renderers = {
    image: Image,
  };

  return (
    <>
      <Header />
      <main>
        <Container maxWidth="md" className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={12}>
              <Markdown source={description} renderers={renderers} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  ) as JSX.Element;
};

About.getInitialProps = async () => {
  try {
    const response = await Axios.get<AboutData>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/about`);
    const { data } = response;
    return {
      description: data.description,
    };
  } catch (error) {
    return { error };
  }
};

export default About;
