import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from './Image';
import { BlogPostModel } from '../models/BlogPost';

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
