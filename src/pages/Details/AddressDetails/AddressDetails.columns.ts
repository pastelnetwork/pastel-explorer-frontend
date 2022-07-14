import { getCurrencyName } from '@utils/appInfo';

export const ADDRESS_TRANSACTION_TIMESTAMP_KEY = 'timestamp';
export const ADDRESS_TRANSACTION_HASH_KEY = 'transactionHash';
export const ADDRESS_TRANSACTION_AMOUNT_KEY = 'amount';

export const columns = [
  {
    width: 500,
    flexGrow: 1,
    label: 'Hash',
    dataKey: ADDRESS_TRANSACTION_HASH_KEY,
    disableSort: false,
    className: 'col-hash',
  },
  {
    width: 40,
    flexGrow: 1,
    label: `Amount (${getCurrencyName()})`,
    dataKey: ADDRESS_TRANSACTION_AMOUNT_KEY,
    disableSort: false,
    className: 'col-amount',
  },
  {
    width: 90,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    disableSort: false,
    className: 'col-timestamp',
  },
];
