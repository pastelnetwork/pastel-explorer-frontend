import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ExplorerPage from './pages/Explorer/Explorer.component';

const App: FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <ExplorerPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
