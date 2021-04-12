import React, { useState } from 'react';

import { Hidden, CssBaseline, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/SearchBar/SearchBar';
import Footer from '../../components/Footer/Footer';

import { RouteType } from '../../types/routes';

import * as Styles from './Dashboard.styles';

const { drawerWidth } = Styles;

interface DashboardPropsType {
  routes: Array<RouteType>;
  width: 'md' | 'xs' | 'sm' | 'lg' | 'xl';
}

const Dashboard: React.FC<DashboardPropsType> = ({ children, routes, width }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Styles.Root>
      <CssBaseline />
      <Styles.GlobalStyle />
      <Styles.Drawer>
        <Hidden mdUp implementation="js">
          <Sidebar
            routes={routes}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar routes={routes} PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </Styles.Drawer>
      <Styles.AppContent>
        <Header onDrawerToggle={handleDrawerToggle} />
        <Styles.MainContent p={isWidthUp('lg', width) ? 12 : 5}>{children}</Styles.MainContent>
        <Footer />
      </Styles.AppContent>
    </Styles.Root>
  );
};

export default withWidth()(Dashboard);
