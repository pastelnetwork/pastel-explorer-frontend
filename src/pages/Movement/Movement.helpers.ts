import { HeaderType } from '@components/Table/Table';

export const headers: Array<HeaderType> = [
  { id: 1, header: 'Timestamp' },
  { id: 2, header: 'txID' },
  { id: 3, header: 'Amount' },
];

export const FLAGS = {
  low: 100000000000,
  high: 500000000000,
};

export const TRANSACTION_MIN_AMOUNT = '100';
