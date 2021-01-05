import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { BlogPreviewModel } from '../models/BlogPreview';

const useStyles = makeStyles({
  root: {
    padding: '10px',
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: '250px',
  },
});

const BlogPreviewCard: FunctionComponent<BlogPreviewModel> = (props) => {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid className={classes.root} item xs={12} md={6}>
      <CardActionArea component="a" href={`/blog/${post.link}`}>
        <Card className={classes.card}>
          <Hidden smDown>
            <CardMedia
              className={classes.cardMedia}
              image={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${post.image}`}
              title={post.imageText}
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {`${post.description} ...`}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default BlogPreviewCard;
