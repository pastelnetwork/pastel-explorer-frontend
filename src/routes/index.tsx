import SearchIcon from '@material-ui/icons/Search';
import MoneyIcon from '@material-ui/icons/Money';
import ShareIcon from '@material-ui/icons/Share';
import WidgetsIcon from '@material-ui/icons/Widgets';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import InfoIcon from '@material-ui/icons/Info';

import Explorer from '@pages/Explorer/Explorer';
import Movement from '@pages/Movement/Movement';
import Network from '@pages/Network/Network';
import Richlist from '@pages/Richlist/Richlist';
import Blocks from '@pages/Blocks/Blocks';
import Info from '@pages/Info/Info';

import TransactionDetails from '@pages/Details/TransactionDetails/TransactionDetails';
import BlockDetails from '@pages/Details/BlockDetails/BlockDetails';
import AddressDetails from '@pages/Details/AddressDetails/AddressDetails';

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

const blocksRoutes = {
  id: 'Blocks',
  path: ROUTES.BLOCKS,
  icon: <WidgetsIcon />,
  component: Blocks,
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

const transactionDetailsRoutes = {
  id: 'Transaction Details',
  path: `${ROUTES.TRANSACTION_DETAILS}/:id`,
  component: TransactionDetails,
  children: null,
};

const blockDetailsRoutes = {
  id: 'Block Details',
  path: `${ROUTES.BLOCK_DETAILS}/:id`,
  component: BlockDetails,
  children: null,
};

const addressDetailsRoutes = {
  id: 'Address Details',
  path: `${ROUTES.ADDRESS_DETAILS}/:id`,
  component: AddressDetails,
  children: null,
};

export const pageRoutes = [
  explorerRoutes,
  movementRoutes,
  networkRoutes,
  blocksRoutes,
  richlistRoutes,
  infoRoutes,
  transactionDetailsRoutes,
  blockDetailsRoutes,
  addressDetailsRoutes,
];

export const sidebarRoutes = [
  explorerRoutes,
  movementRoutes,
  networkRoutes,
  blocksRoutes,
  richlistRoutes,
  infoRoutes,
];
