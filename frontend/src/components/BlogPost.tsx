import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from './Image';
import { CoverPhoto } from '../models/CoverPhoto';

type BlogPostProps = {
  title: string;
  content: string;
  coverPhoto: CoverPhoto;
};

const BlogPostComponent: FunctionComponent<BlogPostProps> = ({
  title,
  content,
  coverPhoto,
}: BlogPostProps) => {
  const renderers = {
    image: Image,
  };
  return (
    <>
      <h1>{title}</h1>
      {!!coverPhoto && (
        <Image
          src={`${coverPhoto.formats.medium?.url || coverPhoto.url}`}
          alt={coverPhoto.alternativeText}
        />
      )}
      <ReactMarkdown source={content} renderers={renderers} />
    </>
  );
};

export default BlogPostComponent;
