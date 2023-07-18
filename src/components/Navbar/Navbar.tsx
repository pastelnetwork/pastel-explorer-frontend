import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Menu as MenuIcon } from '@material-ui/icons';

import SearchBar from '@components/SearchBar/SearchBar';
import Sidebar from '@components/Sidebar/Sidebar';
import { RouteType } from '@utils/types/routes';
import { translate } from '@utils/helpers/i18n';
import { useSelector } from 'react-redux';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import * as ROUTES from '@utils/constants/routes';
import * as SearchBarStyles from '@components/SearchBar/SearchBar.styles';

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
        <SidebarStyles.Brand
          className="desktop-logo"
          component={NavLink}
          to={ROUTES.EXPLORER}
          button
        >
          <Box ml={1}>
            <SidebarStyles.BrandLogo
              src={isDarkMode ? PastelLogoWhite : PastelLogo}
              alt="Pastel Logo"
            />
          </Box>
        </SidebarStyles.Brand>
        <Hidden smUp>
          <Grid item>
            <SearchBarStyles.IconButton
              color="inherit"
              aria-label={translate('components.searchBar.openDrawer')}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </SearchBarStyles.IconButton>
          </Grid>
        </Hidden>
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
      <SearchBar isDarkMode={isDarkMode} />
    </Styles.NavContainer>
  );
}
