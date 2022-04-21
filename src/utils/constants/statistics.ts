import * as routes from '@utils/constants/routes';
import { PeriodTypes, TGranularity } from '@utils/helpers/statisticsLib';
import { TStatisticsInfo } from '@utils/types/IStatistics';
import { TCsvHeaderType } from './types';
import { getCurrencyName } from '../appInfo';

const BASE_API_URL = process.env.REACT_APP_EXPLORER_WEB_API_URL as string;
const getBaseURL = () => {
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
    title: 'Blockchain Size',
    url: routes.STATISTICS_BLOCKCHAIN_SIZE,
    image: generatePreviewUrl(routes.STATISTICS_BLOCKCHAIN_SIZE),
  },
  {
    id: 'averageBlockSize',
    title: 'Average Block Size',
    url: routes.STATISTICS_AVERAGE_BLOCK_SIZE,
    image: generatePreviewUrl(routes.STATISTICS_AVERAGE_BLOCK_SIZE),
  },
  {
    id: 'difficulty',
    title: 'Difficulty',
    url: routes.STATISTICS_DIFFICULTY,
    image: generatePreviewUrl(routes.STATISTICS_DIFFICULTY),
  },
  {
    id: 'pslPrice',
    title: 'Price',
    url: routes.STATISTICS_PSLPRICE,
    image: generatePreviewUrl(routes.STATISTICS_PSLPRICE),
  },
  {
    id: 'hashrate',
    title: 'Hashrate',
    url: routes.STATISTICS_HASHRATE,
    image: generatePreviewUrl(routes.STATISTICS_HASHRATE),
  },
  {
    id: 'mempoolsize',
    title: 'Mempool Size',
    url: routes.STATISTICS_MEMPOOL_SIZE,
    image: generatePreviewUrl(routes.STATISTICS_MEMPOOL_SIZE),
  },
  {
    id: 'nettotals',
    title: 'Network Total',
    url: routes.STATISTICS_NETTOTALS,
    image: generatePreviewUrl(routes.STATISTICS_NETTOTALS),
  },
  {
    id: 'transactionsCount',
    title: 'Transaction Count',
    url: routes.STATISTICS_TRANSACTION_COUNT,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_COUNT),
  },
  {
    id: 'totaltransactioncount',
    title: 'Total Transaction Count',
    url: routes.STATISTICS_TOTAL_TRANSACTION_COUNT,
    image: generatePreviewUrl(routes.STATISTICS_TOTAL_TRANSACTION_COUNT),
  },
  {
    id: 'transactionfee',
    title: 'Average Transaction Fee',
    url: routes.STATISTICS_TRANSACTION_FEE,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_FEE),
  },
  {
    id: 'transactionPerSecond',
    title: 'Transaction Per Second',
    url: routes.STATISTICS_TRANSACTION_PER_SECOND,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_PER_SECOND),
  },
  {
    id: 'transactionInBlock',
    title: 'Transactions In Block',
    url: routes.STATISTICS_TRANSACTION_IN_BLOCK,
    image: generatePreviewUrl(routes.STATISTICS_TRANSACTION_IN_BLOCK),
  },
  {
    id: 'averageTransactionsPerBlock',
    title: 'Average Transactions Per Block',
    url: routes.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK,
    image: generatePreviewUrl(routes.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK),
  },
  {
    id: 'totalTransactionFees',
    title: 'Total Transaction Fees',
    url: routes.STATISTICS_TOTAL_TRANSACTION_FEES,
    image: generatePreviewUrl(routes.STATISTICS_TOTAL_TRANSACTION_FEES),
  },
  {
    id: 'totalTransactionsPerDay',
    title: 'Total Transactions Per Day',
    url: routes.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY,
    image: generatePreviewUrl(routes.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY),
  },
  {
    id: 'marketPriceVolume',
    title: 'Market Price and Volume',
    url: routes.STATISTICS_MARKET_VOLUME_PRICE,
    image: generatePreviewUrl(routes.STATISTICS_MARKET_VOLUME_PRICE),
  },
  {
    id: 'marketCapVolume',
    title: 'Market Price and Cap',
    url: routes.STATISTICS_MARKET_CAP_PRICE,
    image: generatePreviewUrl(routes.STATISTICS_MARKET_CAP_PRICE),
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
  { label: 'Value', key: 'value' },
  { label: 'Created time', key: 'time' },
];

export const csvHeaders: TCsvHeaderType = {
  averageblocksize: commonCsvFields,
  difficulty: commonCsvFields,
  hashrate: commonCsvFields,
  mempoolsize: commonCsvFields,
  networktotals: [
    { label: 'Receive, Sent', key: 'value' },
    { label: 'Created time', key: 'time' },
  ],
  transactionfee: [
    { label: 'Transaction Fee', key: 'value' },
    { label: 'Created time', key: 'time' },
  ],
  transactionsinblock: [
    { label: 'Block Height', key: 'height' },
    { label: 'Transactions', key: 'transactions' },
    { label: 'Created time', key: 'time' },
  ],
  transactionspersecond: [
    { label: 'Transactions', key: 'value' },
    { label: 'Created time', key: 'time' },
  ],
};

export const pricesCSVHeaders = [
  { label: 'USD Price', key: 'usd' },
  { label: 'BTC Price', key: 'btc' },
  { label: 'Created time', key: 'time' },
];

export const periods: PeriodTypes[][] = [
  ['2h', '2d', '4d', 'all'],
  ['30d', '60d', '180d', '1y', 'all'],
  ['1h', '3h', '6h', '12h'],
  ['24h', '7d', '14d', '30d', '60d', '180d', '1y', 'all'],
  ['30d', '60d', '180d'],
  ['1h', '1d', '7d', '30d'],
];

export const CHART_THEME_BACKGROUND_DEFAULT_COLOR = '#2D3748';
export const CHART_THEME_BACKGROUND_DEFAULT_COLOR_LIGHT = '#fff';
export const BLOCK_CHART_DEFAULT_GRANULARITY = '1d';

export const CHART_DEFAULT_PERIOD = 'all';

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

export const granularities: TGranularity[][] = [['1d', '30d', '1y']];
