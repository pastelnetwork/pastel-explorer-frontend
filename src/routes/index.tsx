import SearchIcon from '@material-ui/icons/Search';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import WidgetsIcon from '@material-ui/icons/Widgets';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BarChartIcon from '@material-ui/icons/BarChart';
// Uncomment this when API page will be ready
// import InfoIcon from '@material-ui/icons/Info';

import Explorer from '@pages/Explorer/Explorer';
import Movement from '@pages/Movement/Movement';
import Richlist from '@pages/Richlist/Richlist';
import Blocks from '@pages/Blocks/Blocks';
// Uncomment this when API page will be ready
// import Info from '@pages/Info/Info';
import Supernodes from '@pages/Supernodes/Supernodes';
import BlockStatistics from '@pages/Statistics/BlockStatistics/BlockStatistics';
import NetworkStatistics from '@pages/Statistics/NetworkStatistics/NetworkStatistics';
import TransactionStatistics from '@pages/Statistics/TransactionStatistics/TransactionStatistics';

import TransactionDetails from '@pages/Details/TransactionDetails/TransactionDetails';
import BlockDetails from '@pages/Details/BlockDetails/BlockDetails';
import AddressDetails from '@pages/Details/AddressDetails/AddressDetails';

// Statistics overview components
import StatisticsOvertime from '@pages/HistoricalStatistics';
import DifficultyStatistics from '@pages/HistoricalStatistics/Difficulty';
import PricesStatistics from '@pages/HistoricalStatistics/Prices';
import HashRateStatistics from '@pages/HistoricalStatistics/HashRate';
import TransactionFeeStatistics from '@pages/HistoricalStatistics/TransactionFee';

import * as ROUTES from '@utils/constants/routes';

const explorerRoutes = {
  id: 'Explorer',
  path: ROUTES.EXPLORER,
  icon: <SearchIcon />,
  component: Explorer,
  containsHome: true,
  seoTitle: 'Explorer',
  children: null,
};

const movementRoutes = {
  id: 'Movement',
  path: ROUTES.MOVEMENT,
  icon: <CallSplitIcon />,
  component: Movement,
  seoTitle: 'Movement Transactions',
  children: null,
};

const blocksRoutes = {
  id: 'Blocks',
  path: ROUTES.BLOCKS,
  icon: <WidgetsIcon />,
  component: Blocks,
  seoTitle: 'Blocks List',
  children: null,
};

const richlistRoutes = {
  id: 'Richlist (Top 100)',
  path: ROUTES.RICHLIST,
  icon: <LocalAtmIcon />,
  component: Richlist,
  seoTitle: 'Richlist (Top 100)',
  children: null,
};

const supernodesRoutes = {
  id: 'Supernodes',
  path: ROUTES.SUPERNODES,
  icon: <LocalLibraryIcon />,
  component: Supernodes,
  seoTitle: 'Supernodes List',
  children: null,
};

const statisticsRoutes = {
  id: 'Statistics',
  path: ROUTES.STATISTICS,
  icon: <BarChartIcon />,
  component: null,
  seoTitle: 'Statistics',
  children: [
    {
      path: ROUTES.STATISTICS_BLOCKS,
      name: 'Blocks',
      component: BlockStatistics,
    },
    {
      path: ROUTES.STATISTICS_NETWORK,
      name: 'Network',
      component: NetworkStatistics,
    },
    {
      path: ROUTES.STATISTICS_TRANSACTIONS,
      name: 'Transactions',
      component: TransactionStatistics,
    },
  ],
};
// Statistics overtime routes
const statisticsOvertimeRoutes = {
  id: 'Historical Statistics',
  path: ROUTES.STATISTICS_OVERTIME,
  component: StatisticsOvertime,
  icon: <BarChartIcon />,
  seoTitle: 'Statistics Overtime',
  children: null,
};

const difficultyStatisticsRoutes = {
  id: 'Difficulty Overtime',
  path: ROUTES.STATISTICS_DIFFICULTY,
  component: DifficultyStatistics,
  icon: <BarChartIcon />,
  seoTitle: 'Difficulty Overtime',
  children: null,
};

const pricesStatisticsRoutes = {
  id: 'PSL Prices Overtime',
  path: ROUTES.STATISTICS_PSLPRICE,
  component: PricesStatistics,
  icon: <BarChartIcon />,
  seoTitle: 'PSL Prices Overtime',
  children: null,
};

const hashRateStatisticsRoutes = {
  id: 'HashRate Overtime',
  path: ROUTES.STATISTICS_HASHRATE,
  component: HashRateStatistics,
  icon: <BarChartIcon />,
  seoTitle: 'HashRate Overtime',
  children: null,
};

const transactionFeeStatisticsRoutes = {
  id: 'Transaction Fee Overtime',
  path: ROUTES.STATISTICS_TRANSACTION_FEE,
  component: TransactionFeeStatistics,
  icon: <BarChartIcon />,
  seoTitle: 'Transaction Fee Overtime',
  children: null,
};

// Uncomment this when API page will be ready
// const infoRoutes = {
//   id: 'API',
//   path: ROUTES.INFO,
//   icon: <InfoIcon />,
//   component: Info,
//   seoTitle: 'API Documentation',
//   children: null,
// };

const transactionDetailsRoutes = {
  id: 'Transaction Details',
  path: `${ROUTES.TRANSACTION_DETAILS}/:id`,
  component: TransactionDetails,
  seoTitle: 'Transaction Details',
  children: null,
};

const blockDetailsRoutes = {
  id: 'Block Details',
  path: `${ROUTES.BLOCK_DETAILS}/:id`,
  component: BlockDetails,
  seoTitle: 'Block Details',
  children: null,
};

const addressDetailsRoutes = {
  id: 'Address Details',
  path: `${ROUTES.ADDRESS_DETAILS}/:id`,
  component: AddressDetails,
  seoTitle: 'Address Details',
  children: null,
};

export const pageRoutes = [
  explorerRoutes,
  movementRoutes,
  blocksRoutes,
  richlistRoutes,
  supernodesRoutes,
  // Uncomment this when API page will be ready
  // infoRoutes,
  transactionDetailsRoutes,
  blockDetailsRoutes,
  addressDetailsRoutes,
  statisticsRoutes,
  statisticsOvertimeRoutes,
  difficultyStatisticsRoutes,
  pricesStatisticsRoutes,
  hashRateStatisticsRoutes,
  transactionFeeStatisticsRoutes,
];

export const sidebarRoutes = [
  explorerRoutes,
  movementRoutes,
  blocksRoutes,
  richlistRoutes,
  supernodesRoutes,
  statisticsRoutes,
  statisticsOvertimeRoutes,
  // infoRoutes,
];
