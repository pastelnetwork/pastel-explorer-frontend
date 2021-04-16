import { HeaderType } from '@components/Table/Table';

import themeVariant from '@theme/variants';

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

export const getAmountColor = (amount: number) => {
  if (amount > FLAGS.high) {
    return themeVariant.custom.red.main;
  }

  if (amount > FLAGS.low) {
    return themeVariant.custom.orange.main;
  }

  return themeVariant.custom.green.main;
};
