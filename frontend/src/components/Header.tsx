import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Router from 'next/router';
import { unsetToken } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

type Section = {
  title: string;
  url?: string;
};

type HeaderProps = {
  sections: Section[];
  title: string;
  isAuthenticated: boolean;
};

export default function Header(props: HeaderProps): JSX.Element {
  const classes = useStyles();
  const { sections, title, isAuthenticated } = props;
  const logout = () => {
    unsetToken();
    console.log('Unset token');
    Router.push('/');
  };

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {isAuthenticated ? (
          <Button variant="outlined" size="small" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button variant="outlined" size="small" href="/signup">
            Sign up
          </Button>
        )}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url && '#'}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
}
