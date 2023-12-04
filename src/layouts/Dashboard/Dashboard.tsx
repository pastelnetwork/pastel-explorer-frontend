import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Breakpoint, Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Footer from '@components/Footer/Footer';
import Summary from '@components/Summary/Summary';
import Navbar from '@components/Navbar/Navbar';
import * as ROUTES from '@utils/constants/routes';

import { RouteType } from '@utils/types/routes';

import * as Styles from './Dashboard.styles';

type BreakpointOrNull = Breakpoint | null;

function useWidth() {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

interface DashboardPropsType {
  routes: Array<RouteType>;
  fluid?: boolean;
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardPropsType> = ({ children, routes, fluid = false }) => {
  const location = useLocation();
  const width = useWidth();

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
        <Styles.MainContent className={fluid ? 'fluid' : ''} sx={{ p: width === 'lg' ? 12 : 5 }}>
          {children}
        </Styles.MainContent>
      </Styles.MainWrapper>
      <Footer />
    </Styles.Root>
  );
};

Dashboard.defaultProps = {
  fluid: false,
};

export default Dashboard;
