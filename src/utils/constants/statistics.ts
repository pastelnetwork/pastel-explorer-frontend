import * as routes from '@utils/constants/routes';
import { PeriodTypes } from '@utils/helpers/statisticsLib';
import { TStatisticsInfo } from '@utils/types/IStatistics';
import { TCsvHeaderType } from './types';

export const statistics = [
  {
    id: 'difficulty',
    title: 'Difficulty',
    url: routes.STATISTICS_DIFFICULTY,
    image: '/images/statistics/difficulty.jpg',
  },
  {
    id: 'pslPrice',
    title: 'Price',
    url: routes.STATISTICS_PSLPRICE,
    image: '/images/statistics/pslprice.jpg',
  },
  {
    id: 'hashrate',
    title: 'Hashrate',
    url: routes.STATISTICS_HASHRATE,
    image: '/images/statistics/hashrate.jpg',
  },
  {
    id: 'transactionfee',
    title: 'Transaction Fee',
    url: routes.STATISTICS_TRANSACTION_FEE,
    image: '/images/statistics/transactionfee.jpg',
  },
  {
    id: 'mempoolsize',
    title: 'Mempool Size',
    url: routes.STATISTICS_MEMPOOL_SIZE,
    image: '/images/statistics/mempoolsize.jpg',
  },
  {
    id: 'nettotals',
    title: 'Network Total',
    url: routes.STATISTICS_NETTOTALS,
    image: '/images/statistics/nettotals.jpg',
  },
  {
    id: 'transactionInBlock',
    title: 'Transaction In Block',
    url: routes.STATISTICS_TRANSACTION_IN_BLOCK,
    image: '/images/statistics/transactionsinblock.jpg',
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
];

export const CHART_THEME_BACKGROUND_DEFAULT_COLOR = '#0d0d0d';
export const CHART_THEME_BACKGROUND_DEFAULT_COLOR_LIGHT = '#fff';

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
