import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '@theme/theme';

import Menu from '@components/Menu/Menu';
import Header from '@components/Header/Header';

import ExplorerPage from '@pages/Explorer/Explorer';

import { WithRequestAlert } from '@utils/axios/axios';
import * as routes from '@utils/constants/routes';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <WithRequestAlert />
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
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
        <Route path={routes.REACHLIST} exact>
          Top 100 Page
        </Route>
        <Route path={routes.INFO} exact>
          API Page
        </Route>
        <Redirect to={routes.EXPLORER} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
