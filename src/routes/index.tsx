import SearchIcon from '@material-ui/icons/Search';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import WidgetsIcon from '@material-ui/icons/Widgets';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
// import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BarChartIcon from '@material-ui/icons/BarChart';
// import LocalLibraryIcon from '@assets/icons/supernode.svg';
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
  icon: (
    <svg
      fill="#eeeeee"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32px"
      height="32px"
    >
      <path d="M 24.878906 5 L 6.933594 5 L 2.023438 11.019531 L 15.996094 27.058594 L 30.097656 11.003906 Z M 27.421875 10.976563 C 26.464844 12.082031 25.503906 12.902344 24.546875 14.066406 C 23.296875 12.382813 21.835938 11.644531 20.0625 11.644531 C 18.1875 11.539063 16.210938 11.644531 14.332031 11.539063 C 12.976563 11.328125 10.476563 10.695313 10.476563 9.539063 C 10.476563 8.277344 12.769531 7.328125 13.8125 7.117188 C 14.183594 7.046875 14.570313 7.011719 14.949219 7 L 15.417969 7 C 16.570313 7.027344 17.652344 7.285156 18.292969 7.644531 C 19.960938 8.484375 20.378906 9.84375 20.6875 11 C 22.148438 11 23.539063 11 25 11 C 25 10.203125 24.957031 8.902344 24.957031 8.167969 Z M 6.203125 12.695313 C 5.90625 12.34375 5.585938 12.019531 5.261719 11.691406 L 4.640625 10.976563 L 7.882813 7 L 9.382813 7 C 6.496094 8.492188 5.59375 11.148438 6.203125 12.695313 Z M 22.566406 7.011719 C 22.253906 7.433594 21.835938 7.855469 21.523438 8.273438 C 21.210938 7.855469 20.792969 7.433594 20.167969 7.011719 C 20.898438 7.011719 21.730469 7.011719 22.566406 7.011719 Z M 8.4375 15.339844 C 11.636719 15.550781 15.425781 15.960938 18.8125 16.0625 C 19.230469 16.0625 21.210938 16.378906 21.316406 17.328125 C 21.105469 18.695313 16.730469 19.117188 15.6875 18.484375 C 14.964844 17.652344 12.304688 16.925781 10.429688 17.628906 Z M 12.976563 20.378906 C 15.046875 21.214844 17.519531 21.117188 19.1875 20.394531 L 16.003906 24.023438 L 15.386719 23.316406 C 14.582031 22.335938 13.808594 21.386719 12.976563 20.378906 Z" />
    </svg>
  ),
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
