import loadable from '@loadable/component';
import SearchIcon from '@material-ui/icons/Search';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import WidgetsIcon from '@material-ui/icons/Widgets';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BarChartIcon from '@material-ui/icons/BarChart';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import * as ROUTES from '@utils/constants/routes';

const Explorer = loadable(() => import('@pages/Explorer/Explorer'));
const Movement = loadable(() => import('@pages/Movement/Movement'));
const Richlist = loadable(() => import('@pages/Richlist/Richlist'));
const Blocks = loadable(() => import('@pages/Blocks/Blocks'));
const Supernodes = loadable(() => import('@pages/Supernodes/Supernodes'));

const TransactionDetails = loadable(
  () => import('@pages/Details/TransactionDetails/TransactionDetails'),
);
const BlockDetails = loadable(() => import('@pages/Details/BlockDetails/BlockDetails'));
const AddressDetails = loadable(() => import('@pages/Details/AddressDetails/AddressDetails'));

// Statistics overview components
const StatisticsOvertime = loadable(() => import('@pages/HistoricalStatistics'));
const DifficultyStatistics = loadable(() => import('@pages/HistoricalStatistics/Difficulty'));
const PricesStatistics = loadable(() => import('@pages/HistoricalStatistics/Prices'));
const HashRateStatistics = loadable(() => import('@pages/HistoricalStatistics/HashRate'));
const TransactionFeeStatistics = loadable(
  () => import('@pages/HistoricalStatistics/TransactionFee'),
);
const MempoolSize = loadable(() => import('@pages/HistoricalStatistics/MempoolSize'));
const Nettotals = loadable(() => import('@pages/HistoricalStatistics/Nettotals'));
const TransactionInBlock = loadable(() => import('@pages/HistoricalStatistics/TransactionInBlock'));
const Statistics = loadable(() => import('@pages/Statistics'));
const AverageBlockSize = loadable(() => import('@pages/HistoricalStatistics/AverageBlockSize'));
const TransactionPerSecond = loadable(
  () => import('@pages/HistoricalStatistics/TransactionPerSecond'),
);
const TransactionCount = loadable(() => import('@pages/HistoricalStatistics/TransactionCount'));
const AverageTransactionsPerBlock = loadable(
  () => import('@pages/HistoricalStatistics/AverageTransactionsPerBlock'),
);
const BlockchainSize = loadable(() => import('@pages/HistoricalStatistics/BlockchainSize'));
const TotalTransactionCount = loadable(
  () => import('@pages/HistoricalStatistics/TotalTransactionsCount'),
);
const TotalTransactionPerDay = loadable(
  () => import('@pages/HistoricalStatistics/TotalTransactionsPerDay'),
);
const MarketVolumePrice = loadable(() => import('@pages/HistoricalStatistics/MarketVolumePrice'));
const MarketCapPrice = loadable(() => import('@pages/HistoricalStatistics/MarketCapPrice'));
const CirculatingSupply = loadable(() => import('@pages/HistoricalStatistics/CirculatingSupply'));
const TotalSupply = loadable(() => import('@pages/HistoricalStatistics/TotalSupply'));
const PercentOfPSLStaked = loadable(() => import('@pages/HistoricalStatistics/PercentOfPSLStaked'));
const Accounts = loadable(() => import('@pages/HistoricalStatistics/Accounts'));
const CascadeAndSenseStatistics = loadable(
  () => import('@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics'),
);
const SenseDetails = loadable(() => import('@pages/Details/SenseDetails/SenseDetails'));
const PastelIdDetails = loadable(() => import('@pages/Details/PastelIdDetails/PastelIdDetails'));
const TotalTransactionFees = loadable(
  () => import('@pages/HistoricalStatistics/TotalTransactionFees'),
);
const Tickets = loadable(() => import('@pages/Tickets/Tickets'));
const TicketsType = loadable(() => import('@pages/TicketsType/TicketsType'));
const Burned = loadable(() => import('@pages/Burned/Burned'));
const CollectionDetails = loadable(
  () => import('@pages/Details/CollectionDetails/CollectionDetails'),
);
const CascadeDetails = loadable(() => import('@pages/Details/CascadeDetails/CascadeDetails'));
const NftDetails = loadable(() => import('@pages/Details/NftDetails/NftDetails'));
const FeeSchedule = loadable(() => import('@pages/HistoricalStatistics/FeeSchedule'));

const explorerRoutes = {
  id: 'routes.explorer',
  path: ROUTES.EXPLORER,
  icon: <SearchIcon />,
  component: Explorer,
  containsHome: true,
  seoTitle: 'routes.explorer',
  children: null,
};

const movementRoutes = {
  id: 'routes.movement',
  path: ROUTES.MOVEMENT,
  icon: <CallSplitIcon />,
  component: Movement,
  seoTitle: 'routes.movementTransactions',
  children: null,
};

const blocksRoutes = {
  id: 'routes.blocks',
  path: ROUTES.BLOCKS,
  icon: <WidgetsIcon />,
  component: Blocks,
  seoTitle: 'routes.blocksList',
  children: null,
};

const richlistRoutes = {
  id: 'routes.richlist',
  path: ROUTES.RICHLIST,
  icon: <LocalAtmIcon />,
  component: Richlist,
  seoTitle: 'routes.richlistTop100',
  children: null,
};

const supernodesRoutes = {
  id: 'routes.supernodes',
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
  seoTitle: 'routes.supernodesList',
  children: null,
};

const statisticsRoutes = {
  id: 'routes.statistics',
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
  seoTitle: 'routes.statistics',
  children: [
    {
      path: ROUTES.STATISTICS,
      name: 'routes.currentStatistics',
      component: Statistics,
    },
    {
      path: ROUTES.STATISTICS_OVERTIME,
      name: 'routes.historicalStatistics',
      component: StatisticsOvertime,
      seoTitle: 'routes.historicalStatistics',
    },
    {
      path: ROUTES.CASCADE_AND_SENSE_STATISTICS,
      name: 'routes.cascadeAndSenseStatistics',
      component: CascadeAndSenseStatistics,
      seoTitle: 'routes.cascadeAndSenseStatistics',
    },
  ],
};
// Statistics overtime routes
const statisticsOvertimeRoutes = {
  id: 'routes.historicalStatistics',
  path: ROUTES.STATISTICS_OVERTIME,
  component: StatisticsOvertime,
  icon: <BarChartIcon />,
  seoTitle: 'routes.statisticsOvertime',
  children: null,
  exact: false,
};

const cascadeAndSenseStatisticsRoutes = {
  id: 'routes.cascadeAndSenseStatistics',
  path: ROUTES.CASCADE_AND_SENSE_STATISTICS,
  component: CascadeAndSenseStatistics,
  icon: <BarChartIcon />,
  seoTitle: 'routes.cascadeAndSenseStatistics',
  children: null,
  exact: false,
};

const difficultyStatisticsRoutes = {
  id: 'routes.networkDifficulty',
  path: ROUTES.STATISTICS_DIFFICULTY,
  component: DifficultyStatistics,
  seoTitle: 'routes.cascadeAndSenseStatistics',
  children: null,
  exact: false,
};

const pricesStatisticsRoutes = {
  id: 'routes.networkDifficulty',
  path: ROUTES.STATISTICS_PSLPRICE,
  component: PricesStatistics,
  seoTitle: 'routes.pricesOvertime',
  children: null,
  exact: false,
};

const hashRateStatisticsRoutes = {
  id: 'routes.hashRateOvertime',
  path: ROUTES.STATISTICS_HASHRATE,
  component: HashRateStatistics,
  seoTitle: 'routes.hashRateOvertime',
  children: null,
  exact: false,
};

const transactionFeeStatisticsRoutes = {
  id: 'routes.transactionFeeOvertime',
  path: ROUTES.STATISTICS_TRANSACTION_FEE,
  component: TransactionFeeStatistics,
  seoTitle: 'routes.transactionFeeOvertime',
  children: null,
  exact: false,
};

const mempoolSizeStatisticsRoutes = {
  id: 'routes.mempoolSize',
  path: ROUTES.STATISTICS_MEMPOOL_SIZE,
  component: MempoolSize,
  seoTitle: 'routes.mempoolSize',
  children: null,
  exact: false,
};

const nettotalsStatisticsRoutes = {
  id: 'routes.nettotals',
  path: ROUTES.STATISTICS_NETTOTALS,
  component: Nettotals,
  seoTitle: 'routes.networkTotal',
  children: null,
  exact: false,
};

const transactionInBlockStatisticsRoutes = {
  id: 'transactionInBlock',
  path: ROUTES.STATISTICS_TRANSACTION_IN_BLOCK,
  component: TransactionInBlock,
  seoTitle: 'routes.transactionInBlock',
  children: null,
  exact: false,
};

const averageBlockSizeStatisticsRoutes = {
  id: 'averageBlockSize',
  path: ROUTES.STATISTICS_AVERAGE_BLOCK_SIZE,
  component: AverageBlockSize,
  seoTitle: 'routes.averageBlockSize',
  children: null,
  exact: false,
};

const transactionPerSecondStatisticsRoutes = {
  id: 'transactionPerSecond',
  path: ROUTES.STATISTICS_TRANSACTION_PER_SECOND,
  component: TransactionPerSecond,
  seoTitle: 'routes.transactionPerSecond',
  children: null,
  exact: false,
};

const transactionCountStatisticsRoutes = {
  id: 'transactionCount',
  path: ROUTES.STATISTICS_TRANSACTION_COUNT,
  component: TransactionCount,
  seoTitle: 'routes.transactionCount',
  children: null,
  exact: false,
};

const averageTransactionsPerBlockStatisticsRoutes = {
  id: 'transactionCount',
  path: ROUTES.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK,
  component: AverageTransactionsPerBlock,
  seoTitle: 'routes.averageTransactionsPerBlock',
  children: null,
  exact: false,
};

const blockchainSizeStatisticsRoutes = {
  id: 'blockchainsize',
  path: ROUTES.STATISTICS_BLOCKCHAIN_SIZE,
  component: BlockchainSize,
  seoTitle: 'routes.blockchainSize',
  children: null,
  exact: false,
};

const totalTransactionCountStatisticsRoutes = {
  id: 'totaltransactioncount',
  path: ROUTES.STATISTICS_TOTAL_TRANSACTION_COUNT,
  component: TotalTransactionCount,
  seoTitle: 'routes.totalTransactionCount',
  children: null,
  exact: false,
};

const totalTransactionFeesStatisticsRoutes = {
  id: 'totalTransactionFees',
  path: ROUTES.STATISTICS_TOTAL_TRANSACTION_FEES,
  component: TotalTransactionFees,
  icon: null,
  seoTitle: 'routes.totalTransactionFees',
  children: null,
};

const totalTransactionsPerDayStatisticsRoutes = {
  id: 'totalTransactionsPerDay',
  path: ROUTES.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY,
  component: TotalTransactionPerDay,
  icon: null,
  seoTitle: 'routes.totalTransactionsPerDay',
  children: null,
};

const marketVolumePriceStatisticsRoutes = {
  id: 'marketcapprice',
  path: ROUTES.STATISTICS_MARKET_VOLUME_PRICE,
  component: MarketVolumePrice,
  icon: null,
  seoTitle: 'routes.marketCapPrice',
  children: null,
};

const marketCapPriceStatisticsRoutes = {
  id: 'marketCapUSD',
  path: ROUTES.STATISTICS_MARKET_CAP_PRICE,
  component: MarketCapPrice,
  icon: null,
  seoTitle: 'routes.marketCapUSD',
  children: null,
};

const transactionDetailsRoutes = {
  id: 'routes.transactionDetails',
  path: `${ROUTES.TRANSACTION_DETAILS}/:id`,
  component: TransactionDetails,
  seoTitle: 'routes.transactionDetails',
  children: null,
};

const blockDetailsRoutes = {
  id: 'routes.blockDetails',
  path: `${ROUTES.BLOCK_DETAILS}/:id`,
  component: BlockDetails,
  seoTitle: 'routes.blockDetails',
  children: null,
};

const addressDetailsRoutes = {
  id: 'routes.addressDetails',
  path: `${ROUTES.ADDRESS_DETAILS}/:id`,
  component: AddressDetails,
  seoTitle: 'routes.addressDetails',
  children: null,
};

const circulatingSupplyStatisticsRoutes = {
  id: 'circulatingSupply',
  path: ROUTES.STATISTICS_CIRCULATING_SUPPLY,
  component: CirculatingSupply,
  icon: null,
  seoTitle: 'routes.circulatingSupply',
  children: null,
};

const totalSupplyStatisticsRoutes = {
  id: 'totalSupply',
  path: ROUTES.STATISTICS_TOTAL_SUPPLY,
  component: TotalSupply,
  icon: null,
  seoTitle: 'routes.totalSupply',
  children: null,
};

const percentOfPSLStakedStatisticsRoutes = {
  id: 'percentOfPSLStaked',
  path: ROUTES.STATISTICS_PERCENT_OF_PSL_STAKED,
  component: PercentOfPSLStaked,
  icon: null,
  seoTitle: 'routes.percentOfPSLStaked',
  children: null,
};

const accountsStatisticsRoutes = {
  id: 'accounts',
  path: ROUTES.STATISTICS_ACCOUNTS,
  component: Accounts,
  icon: null,
  seoTitle: 'routes.accounts',
  children: null,
};

const feeScheduleStatisticsRoutes = {
  id: 'feeSchedule',
  path: ROUTES.STATISTICS_FEE_SCHEDULE,
  component: FeeSchedule,
  icon: null,
  seoTitle: 'routes.feeSchedule',
  children: null,
};

const senseDetailsRoutes = {
  id: 'routes.senseDetails',
  path: ROUTES.SENSE_DETAILS,
  component: SenseDetails,
  seoTitle: 'routes.senseDetails',
  children: null,
};

const pastelIdDetailsRoutes = {
  id: 'routes.pastelIdDetails',
  path: `${ROUTES.PASTEL_ID_DETAILS}/:id`,
  component: PastelIdDetails,
  seoTitle: 'routes.pastelIdDetails',
  children: null,
};

const ticketsRoutes = {
  id: 'routes.tickets',
  path: ROUTES.TICKETS,
  icon: <ConfirmationNumberIcon />,
  component: Tickets,
  seoTitle: 'routes.ticketsList',
  children: null,
};

const ticketsTypeRoutes = {
  id: 'routes.ticketsType',
  path: `${ROUTES.TICKETS_TYPE}/:type`,
  icon: <LocalAtmIcon />,
  component: TicketsType,
  seoTitle: 'routes.ticketsType',
  children: null,
};

const burnedRoutes = {
  id: 'routes.burned',
  path: `${ROUTES.PASTEL_BURN_ADDRESS}`,
  icon: <LocalAtmIcon />,
  component: Burned,
  seoTitle: 'routes.burned',
  children: null,
};

const collectionDetailsRoutes = {
  id: 'routes.collectionDetails',
  path: `${ROUTES.COLLECTION_DETAILS_PAGE}/:id`,
  icon: <LocalAtmIcon />,
  component: CollectionDetails,
  seoTitle: 'routes.collectionDetails',
  children: null,
  fluid: true,
};

const cascadeDetailsRoutes = {
  id: 'routes.cascadeDetails',
  path: ROUTES.CASCADE_DETAILS,
  icon: <LocalAtmIcon />,
  component: CascadeDetails,
  seoTitle: 'routes.cascadeDetails',
  children: null,
};

const nftDetailsRoutes = {
  id: 'routes.nftDetails',
  path: ROUTES.NFT_DETAILS,
  icon: <LocalAtmIcon />,
  component: NftDetails,
  seoTitle: 'routes.nftDetails',
  children: null,
};

export const pageRoutes = [
  explorerRoutes,
  movementRoutes,
  blocksRoutes,
  ticketsRoutes,
  richlistRoutes,
  supernodesRoutes,
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
  ticketsTypeRoutes,
  burnedRoutes,
  collectionDetailsRoutes,
  cascadeDetailsRoutes,
  nftDetailsRoutes,
  feeScheduleStatisticsRoutes,
];

export const sidebarRoutes = [
  movementRoutes,
  blocksRoutes,
  ticketsRoutes,
  supernodesRoutes,
  richlistRoutes,
  statisticsRoutes,
];
