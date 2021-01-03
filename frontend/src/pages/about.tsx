import React, { useEffect, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Markdown from 'react-markdown';
import { Grid, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import ConvertApiLink from '../utils/ConvertApiLink';

type AboutData = {
  description: string;
};

type AboutResponse = AxiosResponse & {
  data: AboutData;
};

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px',
  },
  aboutImages: {
    width: '90%',
    borderRadius: '10px',
    boxShadow: '3px 5px 2px 1px rgba(0, 0, 0, 0.2)',
    margin: '20px',
  },
  imagePlaceholder: {
    textAlign: 'center',
  },
}));

type AboutImgProps = {
  alt: string;
  src: string;
};

const About: NextPage = () => {
  const classes = useStyles();
  const [description, setDescription] = useState('Loading...');
  useEffect(() => {
    Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/about`)
      .then((res: AboutResponse) => {
        const { data } = res;
        setDescription(ConvertApiLink(data.description));
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, []);

  const AboutImg = (props: AboutImgProps) => {
    const { alt, src } = props;
    return (
      <div className={classes.imagePlaceholder}>
        <img alt={alt} src={src} className={classes.aboutImages} />;
      </div>
    );
  };

  // TODO: Fix typing
  const renderers = {
    image: AboutImg,
  };

  return (
    <>
      <Header />
      <main>
        <Container maxWidth="md">
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

export default About;
