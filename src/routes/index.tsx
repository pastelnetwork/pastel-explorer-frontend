import SearchIcon from '@material-ui/icons/Search';
import MoneyIcon from '@material-ui/icons/Money';
import ShareIcon from '@material-ui/icons/Share';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import InfoIcon from '@material-ui/icons/Info';

import Explorer from '@pages/Explorer/Explorer';
import Movement from '@pages/Movement/Movement';
import Network from '@pages/Network/Network';
import Richlist from '@pages/Richlist/Richlist';
import Info from '@pages/Info/Info';

import * as ROUTES from '@utils/constants/routes';

const explorerRoutes = {
  id: 'Explorer',
  path: ROUTES.EXPLORER,
  icon: <SearchIcon />,
  component: Explorer,
  containsHome: true,
  children: null,
};

const movementRoutes = {
  id: 'Movement',
  path: ROUTES.MOVEMENT,
  icon: <MoneyIcon />,
  component: Movement,
  children: null,
};

const networkRoutes = {
  id: 'Network',
  path: ROUTES.NETWORK,
  icon: <ShareIcon />,
  component: Network,
  children: null,
};

const richlistRoutes = {
  id: 'TOP 100',
  path: ROUTES.RICHLIST,
  icon: <LocalAtmIcon />,
  component: Richlist,
  children: null,
};

const infoRoutes = {
  id: 'API',
  path: ROUTES.INFO,
  icon: <InfoIcon />,
  component: Info,
  children: null,
};

export const pageRoutes = [
  explorerRoutes,
  movementRoutes,
  networkRoutes,
  richlistRoutes,
  infoRoutes,
];

export const sidebarRoutes = [
  explorerRoutes,
  movementRoutes,
  networkRoutes,
  richlistRoutes,
  infoRoutes,
];
