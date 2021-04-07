import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import pastelLogo from '@assets/images/pastel-logo.png';

import useStyles from './Header.styles';

interface HeaderProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsMenuOpen }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              {/* TODO Move routes urls to shared const file */}
              <Link to="/">
                <img src={pastelLogo} alt="Pastel Logo" className={classes.image} />
              </Link>
            </Grid>
            <Grid item>
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                onClick={() => setIsMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
