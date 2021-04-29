import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import DashboardLayout from '@layouts/Dashboard/Dashboard';
import Page404 from '@pages/404/404';

import { RouteType } from '@utils/types/routes';
import ScrollToTop from '@utils/helpers/scrollToTop/scrollToTop';

import { pageRoutes } from './index';

import '@utils/perfect-scrollbar.css';

const childRoutes = (Layout: React.ElementType, routes: Array<RouteType>) =>
  routes.map(({ component: Component, guard, children, path, id, seoTitle = '' }) => {
    const Guard = guard || React.Fragment;

    if (children) {
      return children.map(element => {
        const ChildrenGuard = element.guard || React.Fragment;
        const ElementComponent = element.component || React.Fragment;

        return (
          <Route
            key={id}
            path={element.path}
            exact
            render={(props: RouteComponentProps) => (
              <Layout>
                <ChildrenGuard>
                  <Helmet title={seoTitle} />
                  <ElementComponent {...props} />
                </ChildrenGuard>
              </Layout>
            )}
          />
        );
      });
    }

    if (Component) {
      return (
        <Route
          key={id}
          path={path}
          exact
          render={props => (
            <Layout>
              <Guard>
                <Helmet title={seoTitle} />
                <Component {...props} />
              </Guard>
            </Layout>
          )}
        />
      );
    }

    return null;
  });

const Routes: React.FC = () => (
  <Router>
    <ScrollToTop />
    <Switch>
      {childRoutes(DashboardLayout, pageRoutes)}
      <Route render={() => <Page404 />} />
    </Switch>
  </Router>
);

export default Routes;
