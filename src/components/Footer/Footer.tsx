import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import TwitterIcon from '@material-ui/icons/Twitter';

import pastelLogo from '@assets/images/pastel-logo.png';

import useStyles from './Footer.styles';

const TWITTER_URL = 'https://twitter.com/pastelnetwork?lang=en';

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <img className={classes.logo} src={pastelLogo} alt="Pastel Logo" />
        </Grid>
        <Grid item>
          <IconButton target="_blank" href={TWITTER_URL} color="inherit">
            <TwitterIcon />
          </IconButton>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
