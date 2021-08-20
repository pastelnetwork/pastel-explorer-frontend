import * as routes from '@utils/constants/routes';
import { PeriodTypes, TGranularity } from '@utils/helpers/statisticsLib';
import { TStatisticsInfo } from '@utils/types/IStatistics';
import { TCsvHeaderType } from './types';

const BASE_API_URL = process.env.REACT_APP_EXPLORER_WEB_API_URL as string;

export const statistics = [
  {
    id: 'blockchainsize',
    title: 'Blockchain Size',
    url: routes.STATISTICS_BLOCKCHAIN_SIZE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_BLOCKCHAIN_SIZE.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'averageBlockSize',
    title: 'Average Block Size',
    url: routes.STATISTICS_AVERAGE_BLOCK_SIZE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_AVERAGE_BLOCK_SIZE.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'difficulty',
    title: 'Difficulty',
    url: routes.STATISTICS_DIFFICULTY,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_DIFFICULTY.split('/').pop()}.png`,
  },
  {
    id: 'pslPrice',
    title: 'Price',
    url: routes.STATISTICS_PSLPRICE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_PSLPRICE.split('/').pop()}.png`,
  },
  {
    id: 'hashrate',
    title: 'Hashrate',
    url: routes.STATISTICS_HASHRATE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_HASHRATE.split('/').pop()}.png`,
  },
  {
    id: 'mempoolsize',
    title: 'Mempool Size',
    url: routes.STATISTICS_MEMPOOL_SIZE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_MEMPOOL_SIZE.split('/').pop()}.png`,
  },
  {
    id: 'nettotals',
    title: 'Network Total',
    url: routes.STATISTICS_NETTOTALS,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_NETTOTALS.split('/').pop()}.png`,
  },
  {
    id: 'transactionsCount',
    title: 'Transaction Count',
    url: routes.STATISTICS_TRANSACTION_COUNT,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_TRANSACTION_COUNT.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'totaltransactioncount',
    title: 'Total Transaction Count',
    url: routes.STATISTICS_TOTAL_TRANSACTION_COUNT,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_TOTAL_TRANSACTION_COUNT.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'transactionfee',
    title: 'Average Transaction Fee',
    url: routes.STATISTICS_TRANSACTION_FEE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_TRANSACTION_FEE.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'transactionPerSecond',
    title: 'Transaction Per Second',
    url: routes.STATISTICS_TRANSACTION_PER_SECOND,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_TRANSACTION_PER_SECOND.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'transactionInBlock',
    title: 'Transactions In Block',
    url: routes.STATISTICS_TRANSACTION_IN_BLOCK,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_TRANSACTION_IN_BLOCK.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'averageTransactionsPerBlock',
    title: 'Average Transactions Per Block',
    url: routes.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_BLOCKCHAIN_SIZE.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'totalTransactionFees',
    title: 'Total Transaction Fees',
    url: routes.STATISTICS_TOTAL_TRANSACTION_FEES,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_TOTAL_TRANSACTION_FEES.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'totalTransactionsPerDay',
    title: 'Total Transactions Per Day',
    url: routes.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_TOTAL_TRANSACTIONS_PER_DAY.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'marketPriceVolume',
    title: 'Market Price and Volume',
    url: routes.STATISTICS_MARKET_VOLUME_PRICE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_MARKET_VOLUME_PRICE.split(
      '/',
    ).pop()}.png`,
  },
  {
    id: 'marketCapVolume',
    title: 'Market Price and Cap',
    url: routes.STATISTICS_MARKET_CAP_PRICE,
    image: `${BASE_API_URL}/static/charts/${routes.STATISTICS_MARKET_CAP_PRICE.split(
      '/',
    ).pop()}.png`,
  },
];

export const themes = [
  {
    name: 'theme1',
    backgroundColor: '#0d0d0d',
    splitLineColor: '#202021',
    color: '#abaac1',
  },
  {
    name: 'theme2',
    backgroundColor: '#FFF7C6',
    stack: 'confidence-band',
    splitLineColor: '#C7C4CC',
    smooth: true,
    color: '#100c2a',
  },
  {
    name: 'theme3',
    backgroundColor: '#FFF',
    splitLineColor: '#EEE',
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
];

export const CHART_THEME_BACKGROUND_DEFAULT_COLOR = '#0d0d0d';
export const CHART_THEME_BACKGROUND_DEFAULT_COLOR_LIGHT = '#fff';
export const BLOCK_CHART_DEFAULT_GRANULARITY = '1d';

export const CHART_DEFAULT_PERIOD = 'all';

export const info: TStatisticsInfo = {
  connections: 8,
  currencyName: 'PSL',
  disconnected: false,
  latestBlock: 71976,
  pslPrice: undefined,
  solps: 2652525,
  testnet: false,
  verificationProgress: 0.9999843360337557,
  version: 1000029,
};

export const granularities: TGranularity[][] = [['1d', '30d', '1y']];
