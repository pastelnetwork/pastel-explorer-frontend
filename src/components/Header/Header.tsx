import React, { FC, Dispatch, SetStateAction } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './Header.styles';

import pastelLogo from '../../assets/images/pastel-logo.png';

interface HeaderProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ setIsMenuOpen }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <img src={pastelLogo}
            alt="Pastel Logo"
            className={classes.image}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
