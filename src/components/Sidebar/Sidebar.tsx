import * as React from 'react';
import { NavLink, useParams, RouteComponentProps, match } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useCallback } from 'react';
import { Collapse, List, Hidden, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import IconButton from '@mui/material/IconButton';

import { getThemeState } from '@redux/reducers/appThemeReducer';
import * as ROUTES from '@utils/constants/routes';
import { RouteType, RouteChildType } from '@utils/types/routes';
import { sidebarRoutes as routes } from '@routes/index';
import useWindowDimensions from '@hooks/useWindowDimensions';

import PastelLogoWhite from '@assets/images/pastel-logo-white.png';
import PastelLogo from '@assets/images/pastel-logo.png';

import * as Styles from './Sidebar.styles';

const useStyles = makeStyles(() => ({
  close: {
    minWidth: 'auto',
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: '100%',
    padding: '6px 14px',
  },
}));

interface SidebarLinkPropsType {
  name: string | React.ReactNode;
  to: string;
  badge?: string | number;
}

const SidebarLink: React.FC<SidebarLinkPropsType> = ({ name, to, badge }) => {
  const isActive = window.location.pathname.includes(to);

  return (
    <Styles.NavLinkStyle exact to={to} className={isActive ? 'active' : ''}>
      <Styles.LinkText>{parse(name?.toString() || '')}</Styles.LinkText>
      {badge ? <Styles.LinkBadge label={badge} /> : ''}
    </Styles.NavLinkStyle>
  );
};

SidebarLink.defaultProps = {
  badge: undefined,
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
  const { t } = useTranslation();
  const categoryIcon = isOpen ? (
    <>
      <Styles.CategoryIconMore />
      <Styles.CategoryIconAddIcon />
    </>
  ) : (
    <>
      <Styles.CategoryIconLess />
      <Styles.CategoryIconRemoveIcon />
    </>
  );
  let active = '';
  if (
    (window.location.pathname === ROUTES.STATISTICS ||
      window.location.pathname === ROUTES.STATISTICS_OVERTIME ||
      window.location.pathname === ROUTES.CASCADE_AND_SENSE_STATISTICS ||
      window.location.pathname.includes(ROUTES.STATISTICS_OVERTIME)) &&
    category?.path === ROUTES.STATISTICS_PARENT
  ) {
    active = 'active-submenu';
  }

  return (
    <Styles.Category className={category?.children ? 'has-sub' : ''} {...rest}>
      <Styles.CategoryText
        className={`menu-text ${active} ${category?.children ? 'sub-menu' : ''} ${
          !isOpen ? 'opened' : ''
        }`}
      >
        <Hidden mdUp implementation="js">
          {category?.icon}
        </Hidden>
        {parse(t(`${name}.message`, { defaultValue: '<span class="skeleton-text"></span>' }))}
        {isCollapsable ? categoryIcon : null}
      </Styles.CategoryText>
      {badge ? <Styles.CategoryBadge label={badge} /> : ''}
      {category?.children ? (
        <Collapse in={!isOpen} timeout="auto" unmountOnExit className="submenu">
          {category.children.map((route: RouteChildType) => (
            <SidebarLink
              key={route.name}
              name={t(`${route.name}.message`, {
                defaultValue: '<span class="skeleton-text"></span>',
              })}
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

SidebarCategory.defaultProps = {
  classes: undefined,
  isOpen: undefined,
  badge: undefined,
  activeClassName: undefined,
  onClick: undefined,
  to: undefined,
  exact: undefined,
  component: undefined,
  isActive: undefined,
  category: undefined,
}

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
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const classes = useStyles();

  const initOpenRoutes = (): InitOptionsProps => {
    const pathName = location.pathname;

    let currentRoutes = {};

    routes.forEach((route: RouteType, index: number) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === '/';
      let isActiveSub = false;
      if (
        (pathName === ROUTES.STATISTICS ||
          pathName === ROUTES.STATISTICS_OVERTIME ||
          pathName === ROUTES.CASCADE_AND_SENSE_STATISTICS ||
          pathName.includes(ROUTES.STATISTICS_OVERTIME)) &&
        route.path === ROUTES.STATISTICS_PARENT &&
        width < 960
      ) {
        isActiveSub = true;
      }
      currentRoutes = { ...currentRoutes, [index]: isActive || isOpen || isHome || isActiveSub };
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
        return !!['/block'].some(el => locationLink.pathname.startsWith(el));
      }
      if (path.startsWith('/movement')) {
        return !!['/tx'].some(el => locationLink.pathname.startsWith(el));
      }
      if (path.startsWith('/supernodes')) {
        return !!['/address'].some(
          el =>
            locationLink.pathname.startsWith(el) && !locationLink.search?.includes('p=richlist'),
        );
      }
      if (path.startsWith('/richlist')) {
        return !!['/address'].some(
          el => locationLink.pathname.startsWith(el) && locationLink.search?.includes('p=richlist'),
        );
      }
      if (
        path.startsWith('/tickets') ||
        path.startsWith('/cascade') ||
        path.startsWith('/sense') ||
        path.startsWith('/nft') ||
        path.startsWith('/pastelid') ||
        path.startsWith('/tickets') ||
        path.startsWith('/collection')
      ) {
        if (locationLink.pathname === '/cascade-and-sense-statistics') {
          return false;
        }
        return !!['/tickets', '/cascade', '/sense', '/nft', '/pastelid', '/collection'].some(el =>
          locationLink.pathname.startsWith(el),
        );
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
          category={category}
          button
          badge={badge}
        />
      );
    }

    return null;
  };

  const { open, onClose, variant } = rest;
  const isDarkMode = useSelector(getThemeState).darkMode;

  React.useEffect(() => {
    if (location && onClose && open) {
      onClose();
    }
  }, [location]);

  React.useEffect(() => {
    if (open) {
      setOpenRoutes(initOpenRoutes());
    }
  }, [open]);

  return (
    <Styles.DrawerMobile
      variant={variant || 'permanent'}
      className="main-menu"
      open={open}
      onClose={onClose}
    >
      <Hidden mdUp>
        <Styles.SlideLogoMobileWrapper>
          <Styles.Brand component={NavLink} to={ROUTES.EXPLORER} button>
            <Box ml={1}>
              <Styles.BrandLogo
                src={isDarkMode ? PastelLogoWhite : PastelLogo}
                alt={t('components.footer.pastelLogo.message', { defaultValue: '' }) || ''}
              />
            </Box>
          </Styles.Brand>
          <IconButton type="button" className={classes.close} onClick={onClose}>
            ×
          </IconButton>
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

Sidebar.defaultProps = {
  variant: undefined,
  open: undefined,
  onClose: undefined,
};

export default useParams(Sidebar);
