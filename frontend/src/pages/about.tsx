import React, { useEffect, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Markdown from 'react-markdown';

type AboutData = {
  description: string;
};

type AboutResponse = AxiosResponse & {
  data: AboutData;
};

const About: NextPage = () => {
  const [description, setDescription] = useState('Loading...');
  useEffect(() => {
    Axios.get('http://localhost:1337/about')
      .then((res: AboutResponse) => {
        const { data } = res;
        console.log(data);
        setDescription(data.description);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, []);
  return (
    <>
      <Markdown source={description} />
    </>
  ) as JSX.Element;
};

export default About;
