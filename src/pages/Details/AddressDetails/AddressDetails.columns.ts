export const ADDRESS_TRANSACTION_TIMESTAMP_KEY = 'timestamp';
export const ADDRESS_TRANSACTION_HASH_KEY = 'transactionHash';
export const ADDRESS_TRANSACTION_AMOUNT_KEY = 'amount';

export const columns = [
  {
    width: 150,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    disableSort: false,
  },
  {
    width: 360,
    flexGrow: 1,
    label: 'Hash',
    dataKey: ADDRESS_TRANSACTION_HASH_KEY,
    disableSort: false,
  },
  {
    width: 150,
    flexGrow: 1,
    label: 'Amount (PSL)',
    dataKey: ADDRESS_TRANSACTION_AMOUNT_KEY,
    disableSort: false,
  },
];
