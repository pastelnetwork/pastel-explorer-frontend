import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Hidden } from '@material-ui/core';

import SearchBar from '@components/SearchBar/SearchBar';
import Sidebar from '@components/Sidebar/Sidebar';
import { RouteType } from '@utils/types/routes';

import { useSelector } from 'react-redux';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import * as ROUTES from '@utils/constants/routes';

import PastelLogoWhite from '@assets/images/pastel-logo-white.svg';
import PastelLogo from '@assets/images/pastel-logo.svg';

import * as Styles from './Navbar.styles';
import * as SidebarStyles from '../Sidebar/Sidebar.styles';

export default function Navbar({ routes }: { routes: Array<RouteType> }): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isDarkMode = useSelector(getThemeState).darkMode;

  return (
    <Styles.NavContainer>
      <Styles.Menu>
        <SidebarStyles.Brand component={NavLink} to={ROUTES.EXPLORER} button>
          <Box ml={1}>
            <SidebarStyles.BrandLogo
              src={isDarkMode ? PastelLogoWhite : PastelLogo}
              alt="Pastel Logo"
            />
          </Box>
        </SidebarStyles.Brand>
        <Hidden mdUp implementation="js">
          <Sidebar
            routes={routes}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar routes={routes} />
        </Hidden>
      </Styles.Menu>
      <SearchBar onDrawerToggle={handleDrawerToggle} />
    </Styles.NavContainer>
  );
}
