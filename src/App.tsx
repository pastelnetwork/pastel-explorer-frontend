import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '@theme/theme';

import Menu from '@components/Menu/Menu';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

import ExplorerPage from '@pages/Explorer/Explorer';
import NotFoundPage from '@pages/404/404';

import { WithRequestAlert } from '@utils/axios/axios';
import * as routes from '@utils/constants/routes';

import useStyles from './App.styles';

const App: React.FC = () => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <WithRequestAlert />
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div className={classes.container}>
        <Switch>
          <Route path={routes.EXPLORER} exact>
            <ExplorerPage />
          </Route>
          <Route path={routes.MOVEMENT} exact>
            Movement Page
          </Route>
          <Route path={routes.NETWORK} exact>
            Network Page
          </Route>
          <Route path={routes.RICHLIST} exact>
            Top 100 Page
          </Route>
          <Route path={routes.INFO} exact>
            API Page
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
