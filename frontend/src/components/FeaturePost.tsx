import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { BlogPreviewModel } from '../models/BlogPreview';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '10px',
  },
  feature: {
    width: 'auto',
  },
  card: {
    // maxWidth: 345,
    // width: '50%',
  },
  media: {
    padding: '60% 0% 0% 0%',
    // width: '50%',
  },
});

type FeatureArticleProps = BlogPreviewModel;

export default function FeaturePost({ post }: FeatureArticleProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center" className={classes.feature}>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea component="a" href={`/blog/${post.link}`}>
                <CardMedia
                  className={classes.media}
                  image={
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${post.image}` ||
                    'https://source.unsplash.com/random'
                  }
                  title={post.imageText || 'Feature Article Cover Photo'}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title || 'This is a feature article with a long title'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {post.description ||
                      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
