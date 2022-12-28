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
// import BlockStatistics from '@pages/Statistics/BlockStatistics/BlockStatistics';
// import NetworkStatistics from '@pages/Statistics/NetworkStatistics/NetworkStatistics';
// import TransactionStatistics from '@pages/Statistics/TransactionStatistics/TransactionStatistics';

import TransactionDetails from '@pages/Details/TransactionDetails/TransactionDetails';
import BlockDetails from '@pages/Details/BlockDetails/BlockDetails';
import AddressDetails from '@pages/Details/AddressDetails/AddressDetails';

// Statistics overview components
import StatisticsOvertime from '@pages/HistoricalStatistics';
import DifficultyStatistics from '@pages/HistoricalStatistics/Difficulty';
import PricesStatistics from '@pages/HistoricalStatistics/Prices';
import HashRateStatistics from '@pages/HistoricalStatistics/HashRate';
import TransactionFeeStatistics from '@pages/HistoricalStatistics/TransactionFee';
import MempoolSize from '@pages/HistoricalStatistics/MempoolSize';
import Nettotals from '@pages/HistoricalStatistics/Nettotals';
import TransactionInBlock from '@pages/HistoricalStatistics/TransactionInBlock';
import Statistics from '@pages/Statistics';
import AverageBlockSize from '@pages/HistoricalStatistics/AverageBlockSize';
import TransactionPerSecond from '@pages/HistoricalStatistics/TransactionPerSecond';
import TransactionCount from '@pages/HistoricalStatistics/TransactionCount';
import AverageTransactionsPerBlock from '@pages/HistoricalStatistics/AverageTransactionsPerBlock';
import BlockchainSize from '@pages/HistoricalStatistics/BlockchainSize';
import TotalTransactionCount from '@pages/HistoricalStatistics/TotalTransactionsCount';
import TotalTransactionPerDay from '@pages/HistoricalStatistics/TotalTransactionsPerDay';
import MarketVolumePrice from '@pages/HistoricalStatistics/MarketVolumePrice';
import MarketCapPrice from '@pages/HistoricalStatistics/MarketCapPrice';
import CirculatingSupply from '@pages/HistoricalStatistics/CirculatingSupply';
import TotalSupply from '@pages/HistoricalStatistics/TotalSupply';
import PercentOfPSLStaked from '@pages/HistoricalStatistics/PercentOfPSLStaked';
import Accounts from '@pages/HistoricalStatistics/Accounts';
import CascadeAndSenseStatistics from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics';
import SenseDetails from '@pages/Details/SenseDetails/SenseDetails';
import PastelIdDetails from '@pages/Details/PastelIdDetails/PastelIdDetails';

import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';
import TotalTransactionFees from '@pages/HistoricalStatistics/TotalTransactionFees';

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
  id: 'Richlist',
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
  path: ROUTES.STATISTICS_PARENT,
  icon: (
    <svg
      fill="#eeeeee"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="50px"
      height="50px"
    >
      <path d="M 24.90625 -0.03125 C 24.863281 -0.0234375 24.820313 -0.0117188 24.78125 0 C 24.316406 0.105469 23.988281 0.523438 24 1 L 24 4 L 0 4 L 0 38 L 24 38 L 24 39.5625 L 15.28125 48.28125 C 14.882813 48.679688 14.882813 49.320313 15.28125 49.71875 C 15.679688 50.117188 16.320313 50.117188 16.71875 49.71875 L 24 42.4375 L 24 45 C 23.996094 45.359375 24.183594 45.695313 24.496094 45.878906 C 24.808594 46.058594 25.191406 46.058594 25.503906 45.878906 C 25.816406 45.695313 26.003906 45.359375 26 45 L 26 42.4375 L 33.28125 49.71875 C 33.679688 50.117188 34.320313 50.117188 34.71875 49.71875 C 35.117188 49.320313 35.117188 48.679688 34.71875 48.28125 L 26 39.59375 L 26 38 L 50 38 L 50 4 L 26 4 L 26 1 C 26.011719 0.710938 25.894531 0.433594 25.6875 0.238281 C 25.476563 0.0390625 25.191406 -0.0585938 24.90625 -0.03125 Z M 2 6 L 48 6 L 48 36 L 25.1875 36 C 25.054688 35.972656 24.914063 35.972656 24.78125 36 L 2 36 Z M 41 14 C 39.894531 14 39 14.894531 39 16 C 39 16.085938 39.019531 16.167969 39.03125 16.25 L 28.78125 24.15625 C 28.542969 24.054688 28.277344 24 28 24 C 27.722656 24 27.457031 24.054688 27.21875 24.15625 L 27.1875 24.15625 L 19 18.1875 C 19.003906 18.125 19 18.0625 19 18 C 19 16.894531 18.105469 16 17 16 C 15.894531 16 15 16.894531 15 18 C 15 18.074219 15.023438 18.144531 15.03125 18.21875 L 9.78125 22.15625 C 9.542969 22.054688 9.277344 22 9 22 C 7.894531 22 7 22.894531 7 24 C 7 25.105469 7.894531 26 9 26 C 10.105469 26 11 25.105469 11 24 C 11 23.925781 10.976563 23.855469 10.96875 23.78125 L 16.21875 19.84375 C 16.457031 19.945313 16.722656 20 17 20 C 17.277344 20 17.542969 19.945313 17.78125 19.84375 L 17.8125 19.84375 L 26 25.8125 C 25.996094 25.875 26 25.9375 26 26 C 26 27.105469 26.894531 28 28 28 C 29.105469 28 30 27.105469 30 26 C 30 25.914063 29.980469 25.832031 29.96875 25.75 L 40.21875 17.84375 L 40.25 17.84375 C 40.480469 17.9375 40.734375 18 41 18 C 42.105469 18 43 17.105469 43 16 C 43 14.894531 42.105469 14 41 14 Z" />
    </svg>
  ),
  component: Statistics,
  seoTitle: 'Statistics',
  children: [
    {
      path: ROUTES.STATISTICS,
      name: 'Current Statistics',
      component: Statistics,
    },
    {
      path: ROUTES.STATISTICS_OVERTIME,
      name: 'Historical Statistics',
      component: StatisticsOvertime,
      seoTitle: 'Historical Statistics',
    },
    {
      path: ROUTES.CASCADE_AND_SENSE_STATISTICS,
      name: 'Cascade and Sense Statistics',
      component: CascadeAndSenseStatistics,
      seoTitle: 'Cascade and Sense Statistics',
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
  exact: false,
};

const cascadeAndSenseStatisticsRoutes = {
  id: 'Cascade and Sense Statistics',
  path: ROUTES.CASCADE_AND_SENSE_STATISTICS,
  component: CascadeAndSenseStatistics,
  icon: <BarChartIcon />,
  seoTitle: 'Cascade and Sense Statistics',
  children: null,
  exact: false,
};

const difficultyStatisticsRoutes = {
  id: 'Network Difficulty',
  path: ROUTES.STATISTICS_DIFFICULTY,
  component: DifficultyStatistics,
  seoTitle: 'Network Difficulty',
  children: null,
  exact: false,
};

const pricesStatisticsRoutes = {
  id: `${getCurrencyName()} Prices Overtime`,
  path: ROUTES.STATISTICS_PSLPRICE,
  component: PricesStatistics,
  seoTitle: `${getCurrencyName()} Prices Overtime`,
  children: null,
  exact: false,
};

const hashRateStatisticsRoutes = {
  id: 'HashRate Overtime',
  path: ROUTES.STATISTICS_HASHRATE,
  component: HashRateStatistics,
  seoTitle: 'HashRate Overtime',
  children: null,
  exact: false,
};

const transactionFeeStatisticsRoutes = {
  id: 'Transaction Fee Overtime',
  path: ROUTES.STATISTICS_TRANSACTION_FEE,
  component: TransactionFeeStatistics,
  seoTitle: 'Transaction Fee Overtime',
  children: null,
  exact: false,
};

const mempoolSizeStatisticsRoutes = {
  id: 'Mempool Size',
  path: ROUTES.STATISTICS_MEMPOOL_SIZE,
  component: MempoolSize,
  seoTitle: 'Mempool Size',
  children: null,
  exact: false,
};

const nettotalsStatisticsRoutes = {
  id: 'Nettotals',
  path: ROUTES.STATISTICS_NETTOTALS,
  component: Nettotals,
  seoTitle: 'Network Total',
  children: null,
  exact: false,
};

const transactionInBlockStatisticsRoutes = {
  id: 'transactionInBlock',
  path: ROUTES.STATISTICS_TRANSACTION_IN_BLOCK,
  component: TransactionInBlock,
  seoTitle: 'Transactions In Block',
  children: null,
  exact: false,
};

const averageBlockSizeStatisticsRoutes = {
  id: 'averageBlockSize',
  path: ROUTES.STATISTICS_AVERAGE_BLOCK_SIZE,
  component: AverageBlockSize,
  seoTitle: 'Cumulative Overall Average Block Size',
  children: null,
  exact: false,
};

const transactionPerSecondStatisticsRoutes = {
  id: 'transactionPerSecond',
  path: ROUTES.STATISTICS_TRANSACTION_PER_SECOND,
  component: TransactionPerSecond,
  seoTitle: 'Transaction Per Second',
  children: null,
  exact: false,
};

const transactionCountStatisticsRoutes = {
  id: 'transactionCount',
  path: ROUTES.STATISTICS_TRANSACTION_COUNT,
  component: TransactionCount,
  seoTitle: 'Transaction Count',
  children: null,
  exact: false,
};

const averageTransactionsPerBlockStatisticsRoutes = {
  id: 'transactionCount',
  path: ROUTES.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK,
  component: AverageTransactionsPerBlock,
  seoTitle: 'Transaction Count',
  children: null,
  exact: false,
};

const blockchainSizeStatisticsRoutes = {
  id: 'blockchainsize',
  path: ROUTES.STATISTICS_BLOCKCHAIN_SIZE,
  component: BlockchainSize,
  seoTitle: 'Blockchain Size',
  children: null,
  exact: false,
};

const totalTransactionCountStatisticsRoutes = {
  id: 'totaltransactioncount',
  path: ROUTES.STATISTICS_TOTAL_TRANSACTION_COUNT,
  component: TotalTransactionCount,
  seoTitle: 'Total Transaction Count',
  children: null,
  exact: false,
};

const totalTransactionFeesStatisticsRoutes = {
  id: 'totalTransactionFees',
  path: ROUTES.STATISTICS_TOTAL_TRANSACTION_FEES,
  component: TotalTransactionFees,
  icon: null,
  seoTitle: 'Total Transaction Fees',
  children: null,
};

const totalTransactionsPerDayStatisticsRoutes = {
  id: 'totalTransactionsPerDay',
  path: ROUTES.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY,
  component: TotalTransactionPerDay,
  icon: null,
  seoTitle: 'Total Transactions Per Day',
  children: null,
};

const marketVolumePriceStatisticsRoutes = {
  id: 'marketcapprice',
  path: ROUTES.STATISTICS_MARKET_VOLUME_PRICE,
  component: MarketVolumePrice,
  icon: null,
  seoTitle: 'Market Price and Volume ($USD)',
  children: null,
};

const marketCapPriceStatisticsRoutes = {
  id: 'marketCapUSD',
  path: ROUTES.STATISTICS_MARKET_CAP_PRICE,
  component: MarketCapPrice,
  icon: null,
  seoTitle: 'Market Price and Circ. Cap ($USD)',
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

const circulatingSupplyStatisticsRoutes = {
  id: 'circulatingSupply',
  path: ROUTES.STATISTICS_CIRCULATING_SUPPLY,
  component: CirculatingSupply,
  icon: null,
  seoTitle: 'Circulating Supply',
  children: null,
};

const totalSupplyStatisticsRoutes = {
  id: 'totalSupply',
  path: ROUTES.STATISTICS_TOTAL_SUPPLY,
  component: TotalSupply,
  icon: null,
  seoTitle: 'Total Supply',
  children: null,
};

const percentOfPSLStakedStatisticsRoutes = {
  id: 'percentOfPSLStaked',
  path: ROUTES.STATISTICS_PERCENT_OF_PSL_STAKED,
  component: PercentOfPSLStaked,
  icon: null,
  seoTitle: '% of PSL Staked',
  children: null,
};

const accountsStatisticsRoutes = {
  id: 'accounts',
  path: ROUTES.STATISTICS_ACCOUNTS,
  component: Accounts,
  icon: null,
  seoTitle: 'Accounts',
  children: null,
};

const senseDetailsRoutes = {
  id: 'Sense Details',
  path: `${ROUTES.SENSE_DETAILS}/:id`,
  component: SenseDetails,
  seoTitle: 'Sense Details',
  children: null,
};

const pastelIdDetailsRoutes = {
  id: 'Sense Details',
  path: `${ROUTES.PASTEL_ID_DETAILS}/:id`,
  component: PastelIdDetails,
  seoTitle: 'Pastel ID Details',
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
  mempoolSizeStatisticsRoutes,
  nettotalsStatisticsRoutes,
  transactionInBlockStatisticsRoutes,
  averageBlockSizeStatisticsRoutes,
  transactionPerSecondStatisticsRoutes,
  transactionCountStatisticsRoutes,
  averageTransactionsPerBlockStatisticsRoutes,
  blockchainSizeStatisticsRoutes,
  totalTransactionCountStatisticsRoutes,
  totalTransactionFeesStatisticsRoutes,
  totalTransactionsPerDayStatisticsRoutes,
  marketVolumePriceStatisticsRoutes,
  marketCapPriceStatisticsRoutes,
  circulatingSupplyStatisticsRoutes,
  totalSupplyStatisticsRoutes,
  percentOfPSLStakedStatisticsRoutes,
  accountsStatisticsRoutes,
  cascadeAndSenseStatisticsRoutes,
  senseDetailsRoutes,
  pastelIdDetailsRoutes,
];

export const sidebarRoutes = [
  explorerRoutes,
  movementRoutes,
  blocksRoutes,
  supernodesRoutes,
  richlistRoutes,
  statisticsRoutes,
  // statisticsOvertimeRoutes,
  // infoRoutes,
];
