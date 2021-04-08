import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '@theme/theme';

import Menu from '@components/Menu/Menu';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import NotFoundPage from '@pages/404/404';

import ExplorerPage from '@pages/Explorer/Explorer';

import useStyles from './App.styles';

const App: React.FC = () => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div className={classes.container}>
        <Switch>
          <Route path="/" exact>
            <ExplorerPage />
          </Route>
          <Route path="/movement" exact>
            Movement Page
          </Route>
          <Route path="/network" exact>
            Network Page
          </Route>
          <Route path="/richlist" exact>
            Top 100 Page
          </Route>
          <Route path="/info" exact>
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
