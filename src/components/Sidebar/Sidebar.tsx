import * as React from 'react';
import { NavLink, withRouter, RouteComponentProps, match } from 'react-router-dom';

import { useCallback } from 'react';
import { Collapse, List, Hidden, Button, Box } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';
import * as ROUTES from '@utils/constants/routes';
import { RouteType, RouteChildType } from '@utils/types/routes';
import { sidebarRoutes as routes } from '@routes/index';
import breakpoints from '@theme/breakpoints';

import PastelLogoWhite from '@assets/images/pastel-logo-white.png';
import PastelLogo from '@assets/images/pastel-logo.png';

import * as Styles from './Sidebar.styles';

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

interface SidebarCategoryPropsType {
  name: string;
  classes?: string;
  isOpen?: boolean;
  isCollapsable: boolean;
  badge?: string | number;
  activeClassName?: string;
  button: true;
  onClick?: () => void;
  to?: string;
  exact?: boolean;
  component?: typeof NavLink;
  isActive?: (_match: match, _location: Location) => boolean;
  category?: RouteType;
}

const SidebarCategory: React.FC<SidebarCategoryPropsType> = ({
  name,
  isOpen,
  isCollapsable,
  badge,
  category,
  ...rest
}) => {
  const [isMobile, setMobileView] = React.useState(false);
  const categoryIcon = isOpen ? <Styles.CategoryIconMore /> : <Styles.CategoryIconLess />;
  let active = '';
  if (
    (window.location.pathname === ROUTES.STATISTICS ||
      window.location.pathname === ROUTES.STATISTICS_OVERTIME) &&
    category?.path === ROUTES.STATISTICS_PARENT
  ) {
    active = 'active-submenu';
  }

  const handleShowSubMenu = () => {
    setMobileView(false);
    if (window.innerWidth < breakpoints.values.md) {
      setMobileView(true);
    }
  };

  React.useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  return (
    <Styles.Category {...rest}>
      <Styles.CategoryText className={`menu-text ${active}`}>
        {name}
        {isCollapsable ? categoryIcon : null}
      </Styles.CategoryText>
      {badge ? <Styles.CategoryBadge label={badge} /> : ''}
      {category?.children ? (
        <Collapse in={!isOpen || isMobile} timeout="auto" unmountOnExit className="submenu">
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
      ) : null}
    </Styles.Category>
  );
};

interface SidebarPropsType {
  staticContext: string | undefined;
  location: {
    pathname: string;
  };
  routes: Array<RouteType>;
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

  const handleIsActiveLink = useCallback(
    (path: string) => (matchLink: match, locationLink: Location) => {
      if (matchLink) {
        return true;
      }
      if (path.startsWith('/blocks')) {
        return !!['/block', '/tx'].some(el => locationLink.pathname.startsWith(el));
      }
      if (path.startsWith('/supernodes')) {
        return !!['/address'].some(el => locationLink.pathname.startsWith(el));
      }
      return false;
    },
    [],
  );
  const generateCategoryIcon = (category: RouteType): JSX.Element | null => {
    const { id, path, badge, exact = true } = category;

    if (id) {
      return (
        <SidebarCategory
          isCollapsable={false}
          name={id}
          to={path}
          activeClassName="active"
          component={NavLink}
          isActive={handleIsActiveLink(path)}
          exact={exact}
          button
          badge={badge}
        />
      );
    }

    return null;
  };

  const { open, onClose, variant } = rest;
  const isDarkMode = useSelector(getThemeState).darkMode;

  return (
    <Styles.DrawerMobile
      variant={variant || 'permanent'}
      className="main-menu"
      open={open}
      onClose={onClose}
    >
      <Hidden mdUp>
        <Styles.SlideMenuMobileWrapper>
          <Button type="button" className="close-button" onClick={onClose}>
            <CloseIcon className="close-icon" />
          </Button>
        </Styles.SlideMenuMobileWrapper>
        <Styles.SlideLogoMobileWrapper>
          <Styles.Brand component={NavLink} to={ROUTES.EXPLORER} button>
            <Box ml={1}>
              <Styles.BrandLogo src={isDarkMode ? PastelLogoWhite : PastelLogo} alt="Pastel Logo" />
            </Box>
          </Styles.Brand>
        </Styles.SlideLogoMobileWrapper>
      </Hidden>
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
                    button
                    onClick={() => toggle(index)}
                    category={category}
                  />
                </React.Fragment>
              ) : (
                generateCategoryIcon(category)
              )}
            </React.Fragment>
          ))}
        </Styles.Items>
      </List>
    </Styles.DrawerMobile>
  );
};

export default withRouter(Sidebar);
