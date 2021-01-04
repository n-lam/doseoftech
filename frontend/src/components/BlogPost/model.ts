export type BlogPostModel = {
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
  };
  slug: string;
};
