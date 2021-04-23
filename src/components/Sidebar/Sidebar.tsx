import * as React from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

import { Box, Grid, Collapse, Drawer, List, IconButton } from '@material-ui/core';

import * as ROUTES from '@utils/constants/routes';
import { RouteType, RouteChildType } from '@utils/types/routes';

import { sidebarRoutes as routes } from '@routes/index';

import PastelLogo from '@assets/images/pastel-logo-white.png';

import { footerIcons } from './SideBar.helpers';
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

const SidebarLink: React.FC<SidebarLinkPropsType> = ({ name, to, badge }) => {
  return (
    <Styles.Link button dense component={NavLink} exact to={to} activeClassName="active">
      <Styles.LinkText>{name}</Styles.LinkText>
      {badge ? <Styles.LinkBadge label={badge} /> : ''}
    </Styles.Link>
  );
};

interface SidebarPropsType {
  staticContext: string | undefined;
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

const Sidebar: React.FC<RouteComponentProps & SidebarPropsType> = ({ location, ...rest }) => {
  interface InitOptionsProps {
    [key: number]: boolean;
  }
  const initOpenRoutes = (): InitOptionsProps => {
    const pathName = location.pathname;

    let currentRoutes = {};

    routes.forEach((route: RouteType, index: number) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === '/';

      currentRoutes = { ...currentRoutes, [index]: isActive || isOpen || isHome };
    });

    return currentRoutes;
  };

  const [openRoutes, setOpenRoutes] = React.useState(() => initOpenRoutes());

  const toggle = (index: number) => {
    Object.keys(openRoutes).forEach(
      item =>
        openRoutes[index] || setOpenRoutes(currentRoute => ({ ...currentRoute, [item]: false })),
    );

    setOpenRoutes(currentRoute => ({ ...currentRoute, [index]: !currentRoute[index] }));
  };

  const generateCategoryIcon = (category: RouteType): JSX.Element | null => {
    const { id, icon, path, badge } = category;

    if (icon) {
      return (
        <SidebarCategory
          isCollapsable={false}
          name={id}
          to={path}
          activeClassName="active"
          component={NavLink}
          icon={icon}
          exact
          button
          badge={badge}
        />
      );
    }

    return null;
  };

  const { PaperProps, open, onClose, variant } = rest;

  return (
    <Drawer variant={variant || 'permanent'} PaperProps={PaperProps} open={open} onClose={onClose}>
      <Styles.Brand component={NavLink} to={ROUTES.EXPLORER} button>
        <Box ml={1}>
          <Styles.BrandLogo src={PastelLogo} alt="Pastel Logo" />
        </Box>
      </Styles.Brand>
      <Styles.Scrollbar>
        <List disablePadding>
          <Styles.Items>
            {routes.map((category: RouteType, index: number) => (
              <React.Fragment key={category.id}>
                {category.header ? (
                  <Styles.SidebarSection>{category.header}</Styles.SidebarSection>
                ) : null}

                {category.children && category.icon ? (
                  <React.Fragment key={category.id}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable
                      name={category.id}
                      icon={category.icon}
                      button
                      onClick={() => toggle(index)}
                    />

                    <Collapse in={openRoutes[index]} timeout="auto" unmountOnExit>
                      {category.children.map((route: RouteChildType) => (
                        <SidebarLink
                          key={route.name}
                          name={route.name}
                          to={route.path}
                          icon={route.icon}
                          badge={route.badge}
                        />
                      ))}
                    </Collapse>
                  </React.Fragment>
                ) : (
                  generateCategoryIcon(category)
                )}
              </React.Fragment>
            ))}
          </Styles.Items>
        </List>
      </Styles.Scrollbar>
      <Styles.SidebarFooter>
        <Styles.SidebarContainer container spacing={2} justify="space-around" alignItems="center">
          {footerIcons.map(({ id, url, icon }) => (
            <Grid item key={id}>
              <IconButton target="_blank" href={url} color="primary" style={{ padding: '4px' }}>
                {icon}
              </IconButton>
            </Grid>
          ))}
        </Styles.SidebarContainer>
      </Styles.SidebarFooter>
    </Drawer>
  );
};

export default withRouter(Sidebar);
