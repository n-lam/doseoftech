import { ImageModel } from './Image';

export type BlogPostModel = {
  id: number;
  title: string;
  content: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  // eslint-disable-next-line camelcase
  updated_at: string;
  coverPhoto: {
    name: string;
    url: string;
    alternativeText: string;
    formats: {
      large?: ImageModel;
      small?: ImageModel;
      medium?: ImageModel;
      thumbnail?: ImageModel;
    };
  };
  slug: string;
};
