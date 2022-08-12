import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';

export interface SummaryItemProps {
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
    name: `Circulating Supply (${getCurrencyName()})`,
    value: null,
    previousValue: null,
    key: 'circulatingSupply',
    difference: 0,
    decimals: 2,
  },
  {
    id: 2,
    name: `Total Supply (${getCurrencyName()})`,
    value: null,
    previousValue: null,
    key: 'coinSupply',
    difference: 0,
    decimals: 2,
  },
  {
    id: 3,
    name: `% of ${getCurrencyName()} Staked`,
    value: null,
    previousValue: null,
    key: 'percentPSLStaked',
    difference: 0,
    decimals: 2,
  },
  {
    id: 4,
    name: 'Accounts',
    value: null,
    previousValue: null,
    key: 'nonZeroAddressesCount',
    difference: 0,
    decimals: 0,
  },
  {
    id: 5,
    name: 'Network (MH/s)',
    value: null,
    previousValue: null,
    key: 'gigaHashPerSec',
    difference: 0,
    decimals: 2,
  },
  {
    id: 6,
    name: 'Difficulty',
    value: null,
    previousValue: null,
    key: 'difficulty',
    difference: 0,
    decimals: 2,
  },
  {
    id: 7,
    name: 'Average Block Size (Bytes)',
    value: null,
    previousValue: null,
    key: 'avgBlockSizeLast24Hour',
    difference: 0,
    decimals: 2,
  },
  {
    id: 8,
    name: 'Transactions (avg/block)',
    value: null,
    previousValue: null,
    key: 'avgTransactionPerBlockLast24Hour',
    difference: 0,
    decimals: 2,
  },
];

export const calculateDifference = (first: string | number, second: string | number) => {
  const firstValue = parseFloat(first.toString());
  const secondValue = parseFloat(second.toString());

  const difference = ((firstValue - secondValue) / ((firstValue + secondValue) / 2)) * 100;

  if (Number.isNaN(difference)) return '0.00';

  return difference.toFixed(2);
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
    default:
      break;
  }

  return url;
};
