import * as React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { TOptions } from 'i18next';

import DashboardLayout from '@layouts/Dashboard/Dashboard';
import Page404 from '@pages/404/404';
import { getCurrencyName } from '@utils/appInfo';
import { RouteType } from '@utils/types/routes';
import ScrollToTop from '@utils/helpers/scrollToTop/scrollToTop';

import { pageRoutes } from './index';

import '@utils/perfect-scrollbar.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StringMap = { [key: string]: any };

const childRoutes = (
  Layout: React.ElementType,
  routes: Array<RouteType>,
  t: (_key: string, _option?: TOptions<StringMap>) => string,
) => {
  return routes.map(
    ({ component: Component, guard, children, path, id, seoTitle = '', fluid = false }) => {
      const Guard = guard || React.Fragment;

      if (children) {
        return children.map(element => {
          const ChildrenGuard = element.guard || React.Fragment;
          const ElementComponent = element.component || React.Fragment;

          return (
            <Route
              key={id}
              path={element.path}
              element={
                <Layout fluid={fluid}>
                  <ChildrenGuard>
                    <Helmet
                      title={t(`${element.seoTitle || seoTitle}.message`, {
                        currency: getCurrencyName(),
                        defaultValue: '',
                      })}
                    />
                    <ElementComponent />
                  </ChildrenGuard>
                </Layout>
              }
            />
          );
        });
      }

      if (Component) {
        return (
          <Route
            key={id}
            path={path}
            element={
              <Layout fluid={fluid}>
                <Guard>
                  <Helmet
                    title={t(`${seoTitle}.message`, {
                      currency: getCurrencyName(),
                    })}
                  />
                  <Component />
                </Guard>
              </Layout>
            }
          />
        );
      }

      return null;
    },
  );
};

const Routes: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        {childRoutes(DashboardLayout, pageRoutes, t)}
        <Route element={<Page404 />} />
      </Switch>
    </Router>
  );
};

export default Routes;
