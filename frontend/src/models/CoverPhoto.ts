import { ImageModel } from './Image';

export type CoverPhoto = {
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
