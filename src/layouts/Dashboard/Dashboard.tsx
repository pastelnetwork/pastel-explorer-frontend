import * as React from 'react';
import { CssBaseline, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';

import Footer from '@components/Footer/Footer';
import Summary from '@components/Summary/Summary';
import Navbar from '@components/Navbar/Navbar';

import { RouteType } from '@utils/types/routes';

import * as Styles from './Dashboard.styles';

interface DashboardPropsType {
  routes: Array<RouteType>;
  width: 'md' | 'xs' | 'sm' | 'lg' | 'xl';
}

const Dashboard: React.FC<DashboardPropsType> = ({ children, width, routes }) => {
  return (
    <Styles.Root>
      <CssBaseline />
      <Styles.GlobalStyle />
      <Navbar routes={routes} />
      <main>
        <Summary />
        <Styles.MainContent p={isWidthUp('lg', width) ? 12 : 5}>{children}</Styles.MainContent>
      </main>
      <Footer />
    </Styles.Root>
  );
};

export default withWidth()(Dashboard);
