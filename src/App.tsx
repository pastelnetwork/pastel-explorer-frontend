import React, { FC, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';

import ExplorerPage from './pages/Explorer/Explorer';

const App: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
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
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
