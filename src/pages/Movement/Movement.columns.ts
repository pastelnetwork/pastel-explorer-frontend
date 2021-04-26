export const TIMESTAMP_MOVEMENT_KEY = 'timestamp';
export const TXID_KEY = 'blockHash';
export const AMOUNT_MOVEMENT_KEY = 'totalAmount';

export const columns = [
  {
    width: 150,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: TIMESTAMP_MOVEMENT_KEY,
    disableSort: false,
  },
  {
    width: 360,
    flexGrow: 1,
    label: 'txID',
    dataKey: TXID_KEY,
    disableSort: false,
  },
  {
    width: 60,
    flexGrow: 1,
    label: 'Amount',
    dataKey: AMOUNT_MOVEMENT_KEY,
    disableSort: false,
  },
];
