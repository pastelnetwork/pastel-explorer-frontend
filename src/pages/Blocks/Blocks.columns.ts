export const BLOCK_ID_KEY = 'blockId';
export const TRANSACTIONS_QTY_KEY = 'transactionCount';
export const TIMESTAMP_BLOCKS_KEY = 'timestamp';

export const columns = [
  {
    width: 360,
    flexGrow: 1,
    label: 'Block',
    dataKey: BLOCK_ID_KEY,
    disableSort: false,
  },
  {
    width: 150,
    flexGrow: 1,
    label: 'Transactions Quantity',
    dataKey: TRANSACTIONS_QTY_KEY,
    disableSort: false,
  },
  {
    width: 150,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: TIMESTAMP_BLOCKS_KEY,
    disableSort: false,
  },
];
