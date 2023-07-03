import * as ROUTES from '@utils/constants/routes';

interface SummaryItemProps {
  id: number;
  name: string;
  value: string | number | null;
  previousValue: string | number | null;
  key: string;
  difference: string | number | null;
  decimals: number;
  divideToAmount?: boolean;
}

export const initialSummaryList: Array<SummaryItemProps> = [
  {
    id: 1,
    name: 'components.summary.summaryList.circulatingSupply',
    value: null,
    previousValue: null,
    key: 'circulatingSupply',
    difference: 0,
    decimals: 2,
  },
  {
    id: 2,
    name: 'components.summary.summaryList.coinSupply',
    value: null,
    previousValue: null,
    key: 'coinSupply',
    difference: 0,
    decimals: 2,
  },
  {
    id: 3,
    name: 'components.summary.summaryList.percentPSLStaked',
    value: null,
    previousValue: null,
    key: 'percentPSLStaked',
    difference: 0,
    decimals: 2,
  },
  {
    id: 4,
    name: 'components.summary.summaryList.nonZeroAddressesCount',
    value: null,
    previousValue: null,
    key: 'nonZeroAddressesCount',
    difference: 0,
    decimals: 0,
  },
  {
    id: 5,
    name: 'components.summary.summaryList.gigaHashPerSec',
    value: null,
    previousValue: null,
    key: 'gigaHashPerSec',
    difference: 0,
    decimals: 2,
  },
  {
    id: 6,
    name: 'components.summary.summaryList.difficulty',
    value: null,
    previousValue: null,
    key: 'difficulty',
    difference: 0,
    decimals: 2,
  },
  {
    id: 7,
    name: 'components.summary.summaryList.avgBlockSizeLast24Hour',
    value: null,
    previousValue: null,
    key: 'avgBlockSizeLast24Hour',
    difference: 0,
    decimals: 2,
  },
  {
    id: 8,
    name: 'components.summary.summaryList.avgTransactionPerBlockLast24Hour',
    value: null,
    previousValue: null,
    key: 'avgTransactionPerBlockLast24Hour',
    difference: 0,
    decimals: 2,
  },
];

export const calculateDifference = (
  first: string | number,
  second: string | number,
  key: string,
) => {
  const firstValue = Number(first.toString());
  const secondValue = Number(second.toString());

  const difference = ((firstValue - secondValue) / ((firstValue + secondValue) / 2)) * 100;

  if (Number.isNaN(difference)) return '0.00';

  return ['gigaHashPerSec', 'difficulty'].includes(key) && difference < 0
    ? '0.00'
    : difference.toFixed(2);
};

export const getRouteForChart = (key: string) => {
  let url = ROUTES.STATISTICS_OVERTIME;

  switch (key) {
    case 'difficulty':
      url = ROUTES.STATISTICS_DIFFICULTY;
      break;
    case 'avgBlockSizeLast24Hour':
      url = ROUTES.STATISTICS_AVERAGE_BLOCK_SIZE;
      break;
    case 'avgTransactionPerBlockLast24Hour':
      url = ROUTES.STATISTICS_AVERAGE_TRANSACTIONS_PER_BLOCK;
      break;
    case 'gigaHashPerSec':
      url = ROUTES.STATISTICS_NETTOTALS;
      break;
    case 'circulatingSupply':
      url = ROUTES.STATISTICS_CIRCULATING_SUPPLY;
      break;
    case 'coinSupply':
      url = ROUTES.STATISTICS_TOTAL_SUPPLY;
      break;
    case 'percentPSLStaked':
      url = ROUTES.STATISTICS_PERCENT_OF_PSL_STAKED;
      break;
    case 'nonZeroAddressesCount':
      url = ROUTES.STATISTICS_ACCOUNTS;
      break;
    default:
      break;
  }

  return url;
};
