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
    name: 'Network (MH/s)',
    value: null,
    previousValue: null,
    key: 'gigaHashPerSec',
    difference: 0,
    decimals: 2,
  },
  {
    id: 2,
    name: 'Difficulty',
    value: null,
    previousValue: null,
    key: 'difficulty',
    difference: 0,
    decimals: 2,
  },
  {
    id: 3,
    name: 'Coin Supply (PSL)',
    value: null,
    previousValue: null,
    key: 'coinSupply',
    difference: 0,
    decimals: 2,
  },
  {
    id: 4,
    name: 'PSL Price (in USD)',
    value: null,
    previousValue: null,
    key: 'usdPrice',
    difference: 0,
    decimals: 5,
  },
  {
    id: 5,
    name: 'Accounts',
    value: null,
    previousValue: null,
    key: 'nonZeroAddressesCount',
    difference: 0,
    decimals: 0,
  },
  {
    id: 6,
    name: 'Transactions (avg/s)',
    value: null,
    previousValue: null,
    key: 'avgTransactionsPerSecond',
    difference: 0,
    decimals: 5,
  },
  {
    id: 7,
    name: 'Block Size (avg)',
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
  {
    id: 9,
    name: 'Transaction Fee (in USD)',
    value: null,
    previousValue: null,
    key: 'avgTransactionFeeLast24Hour',
    difference: 0,
    decimals: 5,
  },
  {
    id: 10,
    name: 'Mempool Size (kB)',
    value: null,
    previousValue: null,
    key: 'memPoolSize',
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
