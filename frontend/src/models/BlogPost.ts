import { CoverPhoto } from './CoverPhoto';

export type BlogPostModel = {
  id: number;
  title: string;
  content: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  // eslint-disable-next-line camelcase
  updated_at: string;
  coverPhoto: CoverPhoto;
  slug: string;
};
