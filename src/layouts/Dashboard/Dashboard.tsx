import * as React from 'react';
import { CssBaseline, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { useLocation } from 'react-router-dom';

import Footer from '@components/Footer/Footer';
import Summary from '@components/Summary/Summary';
import Navbar from '@components/Navbar/Navbar';
import * as ROUTES from '@utils/constants/routes';

import { RouteType } from '@utils/types/routes';

import * as Styles from './Dashboard.styles';

interface DashboardPropsType {
  routes: Array<RouteType>;
  width: 'md' | 'xs' | 'sm' | 'lg' | 'xl';
  fluid?: boolean;
}

const Dashboard: React.FC<DashboardPropsType> = ({ children, width, routes, fluid = false }) => {
  const location = useLocation();

  return (
    <Styles.Root>
      <CssBaseline />
      <Styles.GlobalStyle />
      <Navbar routes={routes} />
      <Styles.MainWrapper>
        {location.pathname === ROUTES.EXPLORER ? (
          <Summary />
        ) : (
          <Styles.EmptySection className={fluid ? 'hidden' : ''} />
        )}
        <Styles.MainContent className={fluid ? 'fluid' : ''} p={isWidthUp('lg', width) ? 12 : 5}>
          {children}
        </Styles.MainContent>
      </Styles.MainWrapper>
      <Footer />
    </Styles.Root>
  );
};

export default withWidth()(Dashboard);
