/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

import { Box, Grid, Collapse, Drawer, List, IconButton } from '@material-ui/core';
import { Twitter as TwitterIcon } from '@material-ui/icons';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { RouteType, RouteChildType } from '@utils/types/routes';

import { sidebarRoutes as routes } from '@routes/index';

import PastelLogo from '@assets/images/pastel-logo-white.png';

import * as Styles from './Sidebar.styles';

interface SidebarCategoryPropsType {
  name: string;
  icon: JSX.Element;
  classes?: string;
  isOpen?: boolean;
  isCollapsable: boolean;
  badge?: string | number;
  activeClassName?: string;
  button: true;
  onClick?: () => void;
  to?: string;
  component?: typeof NavLink;
  exact?: boolean;
}

const SidebarCategory: React.FC<SidebarCategoryPropsType> = ({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) => {
  const categoryIcon = isOpen ? <Styles.CategoryIconMore /> : <Styles.CategoryIconLess />;

  return (
    <Styles.Category {...rest}>
      {icon}
      <Styles.CategoryText>{name}</Styles.CategoryText>
      {isCollapsable ? categoryIcon : null}
      {badge ? <Styles.CategoryBadge label={badge} /> : ''}
    </Styles.Category>
  );
};

interface SidebarLinkPropsType {
  name: string;
  to: string;
  badge?: string | number;
  icon?: JSX.Element;
}

const SidebarLink: React.FC<SidebarLinkPropsType> = ({ name, to, badge, icon }) => {
  return (
    <Styles.Link button dense component={NavLink} exact to={to} activeClassName="active">
      <Styles.LinkText>{name}</Styles.LinkText>
      {badge ? <Styles.LinkBadge label={badge} /> : ''}
    </Styles.Link>
  );
};

interface SidebarPropsType {
  classes?: string;
  staticContext: string;
  location: {
    pathname: string;
  };
  routes: Array<RouteType>;
  PaperProps: {
    style: {
      width: number;
    };
  };
  variant?: 'permanent' | 'persistent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<RouteComponentProps & SidebarPropsType> = ({
  classes,
  staticContext,
  location,
  ...rest
}) => {
  interface tplotOptions {
    [key: number]: boolean;
  }
  const initOpenRoutes = (): tplotOptions => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname;

    let currentRoutes = {};

    routes.forEach((route: RouteType, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === '/';

      currentRoutes = { ...currentRoutes, [index]: isActive || isOpen || isHome };
    });

    return currentRoutes;
  };

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes());

  const toggle = (index: number) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      item =>
        openRoutes[index] || setOpenRoutes(currentRoute => ({ ...currentRoute, [item]: false })),
    );

    // Toggle selected element
    setOpenRoutes(currentRoute => ({ ...currentRoute, [index]: !currentRoute[index] }));
  };

  return (
    <Drawer variant="permanent" {...rest}>
      <Styles.Brand component={NavLink} to={ROUTES.EXPLORER} button>
        <Box ml={1}>
          <Styles.BrandLogo src={PastelLogo} alt="Pastel Logo" />
        </Box>
      </Styles.Brand>
      <Styles.Scrollbar>
        <List disablePadding>
          <Styles.Items>
            {routes.map((category: RouteType, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                {category.header ? (
                  <Styles.SidebarSection>{category.header}</Styles.SidebarSection>
                ) : null}

                {category.children && category.icon ? (
                  <React.Fragment key={index}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable
                      name={category.id}
                      icon={category.icon}
                      button
                      onClick={() => toggle(index)}
                    />

                    <Collapse in={openRoutes[index]} timeout="auto" unmountOnExit>
                      {category.children.map((route: RouteChildType, index: number) => (
                        <SidebarLink
                          key={index}
                          name={route.name}
                          to={route.path}
                          icon={route.icon}
                          badge={route.badge}
                        />
                      ))}
                    </Collapse>
                  </React.Fragment>
                ) : category.icon ? (
                  <SidebarCategory
                    isCollapsable={false}
                    name={category.id}
                    to={category.path}
                    activeClassName="active"
                    component={NavLink}
                    icon={category.icon}
                    exact
                    button
                    badge={category.badge}
                  />
                ) : null}
              </React.Fragment>
            ))}
          </Styles.Items>
        </List>
      </Styles.Scrollbar>
      <Styles.SidebarFooter>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton target="_blank" href={URLS.TWITTER_URL} color="primary">
              <TwitterIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Styles.SidebarFooter>
    </Drawer>
  );
};

export default withRouter(Sidebar);
