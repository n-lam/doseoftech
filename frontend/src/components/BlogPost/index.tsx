import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPostModel } from './model';
import Image from '../Image';

type BlogPostProps = BlogPostModel;

const BlogPost: FunctionComponent<BlogPostProps> = ({
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
      <Image src={coverPhoto.url} alt={coverPhoto.alternativeText} />
      <ReactMarkdown source={content} renderers={renderers} />
    </>
  );
};

export default BlogPost;

export * from './model';
