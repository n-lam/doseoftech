import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

type ImageProps = {
  alt: string;
  src: string;
};

const useStyles = makeStyles(() => ({
  aboutImages: {
    width: 'auto',
    maxWidth: '80%',
    borderRadius: '10px',
    boxShadow: '3px 5px 2px 1px rgba(0, 0, 0, 0.2)',
    margin: '20px',
  },
  imagePlaceholder: {
    textAlign: 'center',
  },
}));

const Image = ({ alt, src }: ImageProps): JSX.Element => {
  const classes = useStyles();
  const imgSrc =
    src.match('https://')?.length > 0 ? src : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${src}`;
  return (
    <div className={classes.imagePlaceholder}>
      <img alt={alt} src={imgSrc} className={classes.aboutImages} />
    </div>
  );
};

export default Image;
