import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Menu as MenuIcon } from '@mui/icons-material';

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
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
        </Box>
        <Box
          sx={{ display: { xs: 'inline-block', md: 'none' }, paddingTop: { xs: '0', sm: '12px' } }}
        >
          <Grid item>
            <SearchBarStyles.IconButton
              color="inherit"
              aria-label={translate('components.searchBar.openDrawer')}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </SearchBarStyles.IconButton>
          </Grid>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar
            routes={routes}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar routes={routes} />
        </Box>
      </Styles.Menu>
      <SearchBar isDarkMode={isDarkMode} />
    </Styles.NavContainer>
  );
}
