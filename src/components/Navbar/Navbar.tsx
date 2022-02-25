import React from 'react';
import { Hidden } from '@material-ui/core';

import SearchBar from '@components/SearchBar/SearchBar';
import Sidebar from '@components/Sidebar/Sidebar';
import { RouteType } from '@utils/types/routes';

import * as Styles from './Navbar.styles';

export default function Navbar({ routes }: { routes: Array<RouteType> }): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Styles.NavContainer>
      <Styles.Menu>
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
