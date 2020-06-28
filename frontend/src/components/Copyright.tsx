import React, { FunctionComponent } from 'react';

import { Typography, Link } from '@material-ui/core';

const Copyright: FunctionComponent = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Dose of Tech
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
