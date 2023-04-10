import * as routes from '@utils/constants/routes';
import { PeriodTypes, TGranularity } from '@utils/helpers/statisticsLib';
import { TStatisticsInfo } from '@utils/types/IStatistics';
import { TCsvHeaderType } from './types';
import { getCurrencyName } from '../appInfo';

const BASE_API_URL = process.env.REACT_APP_EXPLORER_WEB_API_URL as string;
export const getBaseURL = () => {
  try {
    const persist = localStorage.getItem('persist:root');
    if (persist) {
      const store = JSON.parse(persist);
      const tmp = JSON.parse(store.cluster);
      return tmp.url;
    }
    return BASE_API_URL;
  } catch {
    return BASE_API_URL;
  }
};

function generatePreviewUrl(path: string): string {
  const lastPath = path.split('/').pop();
  return `${getBaseURL()}/static/charts/${lastPath}/${lastPath}.png`;
}

export const statistics = [
  {
    id: 'blockchainsize',
    title: 'constants.statistics.blockchainSize',
    url: routes.STATISTICS_BLOCKCHAIN_SIZE,
    image: generatePreviewUrl(routes.STATISTICS_BLOCKCHAIN_SIZE),
  },
  {
    id: 'averageBlockSize',
    title: 'constants.statistics.averageBlockSize',
    url: routes.STATISTICS_AVERAGE_BLOCK_SIZE,
    image: generatePreviewUrl(routes.STATISTICS_AVERAGE_BLOCK_SIZE),
  },
  {
    id: 'difficulty',
    title: 'constants.statistics.difficulty',
    url: routes.STATISTICS_DIFFICULTY,
    image: generatePreviewUrl(routes.STATISTICS_DIFFICULTY),
  },
  {
    id: 'pslPrice',
    title: 'constants.statistics.pslPrice',
    url: routes.STATISTICS_PSLPRICE,
    image: generatePreviewUrl(routes.STATISTICS_PSLPRICE),
  },
  {
    id: 'hashrate',
    title: 'constants.statistics.hashrate',
    url: routes.STATISTICS_HASHRATE,
    image: generatePreviewUrl(routes.STATISTICS_HASHRATE),
  },
  {
    id: 'mempoolsize',
    title: 'constants.statistics.mempoolSize',
    url: routes.STATISTICS_MEMPOOL_SIZE,
    image: generatePreviewUrl(routes.STATISTICS_MEMPOOL_SIZE),
  },
  {
    id: 'nettotals',
    title: 'constants.statistics.nettotals',
    url: routes.STATISTICS_NETTOTALS,
    image: generatePreviewUrl(routes.STATISTICS_NETTOTALS),
  },
  {
    id: 'transactionsCount',
    title: 'constants.statistics.transactionsCount',
    url: routes.STATISTICS_TRANSACTION_COUNT,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_COUNT),
  },
  {
    id: 'totaltransactioncount',
    title: 'constants.statistics.totalTransactionCount',
    url: routes.STATISTICS_TOTAL_TRANSACTION_COUNT,
    image: generatePreviewUrl(routes.STATISTICS_TOTAL_TRANSACTION_COUNT),
  },
  {
    id: 'transactionfee',
    title: 'constants.statistics.transactionFee',
    url: routes.STATISTICS_TRANSACTION_FEE,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_FEE),
  },
  {
    id: 'transactionPerSecond',
    title: 'constants.statistics.transactionPerSecond',
    url: routes.STATISTICS_TRANSACTION_PER_SECOND,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_PER_SECOND),
  },
  {
    id: 'transactionInBlock',
    title: 'constants.statistics.transactionInBlock',
    url: routes.STATISTICS_TRANSACTION_IN_BLOCK,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_IN_BLOCK),
  },
  {
    id: 'averageTransactionsPerBlock',
    title: 'constants.statistics.averageTransactionsPerBlock',
    url: routes.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK,
    image: generatePreviewUrl(routes.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK),
  },
  {
    id: 'totalTransactionFees',
    title: 'constants.statistics.totalTransactionFees',
    url: routes.STATISTICS_TOTAL_TRANSACTION_FEES,
    image: generatePreviewUrl(routes.STATISTICS_TOTAL_TRANSACTION_FEES),
  },
  {
    id: 'totalTransactionsPerDay',
    title: 'constants.statistics.totalTransactionsPerDay',
    url: routes.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY,
    image: generatePreviewUrl(routes.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY),
  },
  {
    id: 'marketPriceVolume',
    title: 'constants.statistics.marketPriceVolume',
    url: routes.STATISTICS_MARKET_VOLUME_PRICE,
    image: generatePreviewUrl(routes.STATISTICS_MARKET_VOLUME_PRICE),
  },
  {
    id: 'marketCapVolume',
    title: 'constants.statistics.marketCapVolume',
    url: routes.STATISTICS_MARKET_CAP_PRICE,
    image: generatePreviewUrl(routes.STATISTICS_MARKET_CAP_PRICE),
  },
  {
    id: 'circulatingSupply',
    title: 'constants.statistics.circulatingSupply',
    url: routes.STATISTICS_CIRCULATING_SUPPLY,
    image: generatePreviewUrl(routes.STATISTICS_CIRCULATING_SUPPLY),
  },
  {
    id: 'totalSupply',
    title: 'constants.statistics.totalSupply',
    url: routes.STATISTICS_TOTAL_SUPPLY,
    image: generatePreviewUrl(routes.STATISTICS_TOTAL_SUPPLY),
  },
  {
    id: 'percentOfPSLStaked',
    title: 'constants.statistics.percentOfPSLStaked',
    url: routes.STATISTICS_PERCENT_OF_PSL_STAKED,
    image: generatePreviewUrl(routes.STATISTICS_PERCENT_OF_PSL_STAKED),
  },
  {
    id: 'accounts',
    title: 'constants.statistics.accounts',
    url: routes.STATISTICS_ACCOUNTS,
    image: generatePreviewUrl(routes.STATISTICS_ACCOUNTS),
  },
];

export const themes = [
  {
    name: 'theme1',
    backgroundColor: '#2D3748',
    splitLineColor: '#53658C',
    color: '#F8F8FA',
  },
  {
    name: 'theme2',
    backgroundColor: '#FFF7C6',
    stack: 'confidence-band',
    splitLineColor: '#53658C',
    smooth: true,
    color: '#100c2a',
  },
  {
    name: 'theme3',
    backgroundColor: '#FFF',
    splitLineColor: '#6C80A2',
    color: '#202021',
  },
];

const commonCsvFields = [
  { label: 'constants.statistics.value', key: 'value' },
  { label: 'constants.statistics.createdTime', key: 'time' },
];

export const csvHeaders: TCsvHeaderType = {
  averageblocksize: commonCsvFields,
  difficulty: commonCsvFields,
  hashrate: commonCsvFields,
  mempoolsize: commonCsvFields,
  blockchainSize: commonCsvFields,
  transactionCount: commonCsvFields,
  totalTransactionCount: commonCsvFields,
  accounts: commonCsvFields,
  averageTransactionsPerBlock: commonCsvFields,
  totalTransactionFees: commonCsvFields,
  totalTransactionsPerDay: commonCsvFields,
  circulatingSupply: commonCsvFields,
  totalSupply: commonCsvFields,
  percentOfPSLStaked: commonCsvFields,
  networktotals: [
    { label: 'constants.statistics.receiveSent', key: 'value' },
    { label: 'constants.statistics.createdTimeCSV', key: 'time' },
  ],
  transactionfee: [
    { label: 'constants.statistics.transactionFeeCSV', key: 'value' },
    { label: 'constants.statistics.createdTimeCSV', key: 'time' },
  ],
  transactionsinblock: [
    { label: 'constants.statistics.blockHeight', key: 'height' },
    { label: 'constants.statistics.transactions', key: 'transactions' },
    { label: 'constants.statistics.createdTimeCSV', key: 'time' },
  ],
  transactionspersecond: [
    { label: 'constants.statistics.transactions', key: 'value' },
    { label: 'constants.statistics.createdTimeCSV', key: 'time' },
  ],
};

export const pricesCSVHeaders = [
  { label: 'constants.statistics.usdPrice', key: 'usd' },
  { label: 'constants.statistics.btcPrice', key: 'btc' },
  { label: 'constants.statistics.createdTimeCSV', key: 'time' },
];

export const periods: PeriodTypes[][] = [
  ['2h', '2d', '4d', 'max'],
  ['30d', '60d', '180d', '1y', 'max'],
  ['1h', '3h', '6h', '12h'],
  ['24h', '7d', '14d', '30d', '60d', '180d', '1y', 'max'],
  ['30d', '60d', '180d'],
  ['1h', '1d', '7d', '30d'],
  ['24h', '7d', '14d', '30d', '90d', '180d', '1y', 'max'],
  ['24h', '7d', '30d', '1y', 'max'],
  ['24h', '7d', '14d'],
  ['7d', '14d'],
  ['1y', '2y', 'max'],
];

export const CHART_THEME_BACKGROUND_DEFAULT_COLOR = '#2D3748';
export const CHART_THEME_BACKGROUND_DEFAULT_COLOR_LIGHT = '#fff';
export const BLOCK_CHART_DEFAULT_GRANULARITY = 'none';

export const info: TStatisticsInfo = {
  connections: 8,
  currencyName: getCurrencyName(),
  disconnected: false,
  latestBlock: 71976,
  pslPrice: undefined,
  solps: 2652525,
  testnet: false,
  verificationProgress: 0.9999843360337557,
  version: 1000029,
};

export const granularities: TGranularity[][] = [['1d', '30d', '1y'], ['1d'], ['1d', '30d']];

export const cacheList = {
  hashRate: 'explorerHashRate',
  blockchainSize: 'explorerBlockchainSize',
  averageBlockSize: 'explorerAverageBlockSize',
  difficulty: 'explorerDifficulty',
  mempoolSize: 'explorerMempoolSize',
  networkTotal: 'explorerNetworkTotal',
  priceOvertime: 'explorerPriceOvertime',
  marketVolumePrice: 'explorerMarketVolumePrice',
  marketCapPrice: 'explorerMarketCapPrice',
  transactionCount: 'explorerTransactionCount',
  totalTransactionsCount: 'explorerTotalTransactionsCount',
  transactionFee: 'explorerTransactionFee',
  transactionPerSecond: 'explorerTransactionPerSecond',
  totalTransactionFees: 'explorerTotalTransactionFees',
  averageTransactionPerBlock: 'explorerAverageTransactionPerBlock',
  totalTransactionsPerDay: 'explorerTotalTransactionsPerDay',
  accounts: 'explorerAccounts',
  percentOfPslStaked: 'explorerPercentOfPslStaked',
  circulatingSupply: 'explorerCirculatingSupply',
  transactionInBlock: 'explorerTransactionInBlock',
  totalSupply: 'explorerTotalSupply',
  averageRarenessScoreOfNFTsOnSense: 'explorerAverageRarenessScoreOfNFTsOnSense',
  averageSizeOfNFTStoredOnCascade: 'explorerAverageSizeOfNFTStoredOnCascade',
  totalFingerprintsOnSense: 'explorerTotalFingerprintsOnSense',
  totalOfCascadeRequests: 'explorerTotalOfCascadeRequests',
  totalOfSenseRequests: 'explorerTotalOfSenseRequests',
  totalSizeOfDataStored: 'explorerTotalSizeOfDataStored',
  totalPSLBurned: 'explorerTotalPSLBurned',
  burnedByMonth: 'explorerBurnedByMonth',
  volumeTransactions: 'explorerStatisticsVolumeTransactions',
  incomingTransactions: 'explorerStatisticsIncomingTransactions',
  statisticsHashrate: 'explorerStatisticsHashrate',
  blockSizes: 'explorerStatisticsBlockSizes',
};

export const sense_chart_colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

export const SWR_OPTIONS = {
  refreshInterval: 0,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  keepPreviousData: false,
};
