import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';

import { RouteType } from '@utils/types/routes';

import DashboardLayout from '../layouts/Dashboard/Dashboard';
import Page404 from '../pages/404/404';

import { pageRoutes } from './index';

import '@utils/perfect-scrollbar.css';

const childRoutes = (Layout: React.ElementType, routes: Array<RouteType>) =>
  routes.map(({ component: Component, guard, children, path }, index: number) => {
    const Guard = guard || React.Fragment;

    // eslint-disable-next-line no-nested-ternary
    return children ? (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      children.map((element, index: number) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const Guard = element.guard || React.Fragment;
        const ElementComponent = element.component || React.Fragment;

        return (
          <Route
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            path={element.path}
            exact
            render={(props: RouteComponentProps) => (
              <Layout>
                <Guard>
                  <ElementComponent {...props} />
                </Guard>
              </Layout>
            )}
          />
        );
      })
    ) : Component ? (
      <Route
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Guard>
              <Component {...props} />
            </Guard>
          </Layout>
        )}
      />
    ) : null;
  });

const Routes: React.FC = () => (
  <Router>
    <Switch>
      {childRoutes(DashboardLayout, pageRoutes)}
      <Route render={() => <Page404 />} />
    </Switch>
  </Router>
);

export default Routes;
