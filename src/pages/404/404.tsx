import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useStyles from './404.styles';

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} alignItems="center" justify="center">
      <Grid item alignItems="center">
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h3" component="h3" gutterBottom>
          Page not found
        </Typography>

        {/* TODO Move routes urls to shared const file */}
        <Button variant="contained" color="secondary" size="large" href="/">
          GO BACK TO HOMEPAGE
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFound;
