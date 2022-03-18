export const BLOCK_ID_KEY = 'blockId';
export const BLOCK_HASH = 'blockHash';
export const TRANSACTIONS_QTY_KEY = 'transactionCount';
export const TIMESTAMP_BLOCKS_KEY = 'timestamp';

export const columns = [
  {
    width: 20,
    flexGrow: 1,
    label: 'Block',
    dataKey: BLOCK_ID_KEY,
    disableSort: false,
    className: 'col-block',
  },
  {
    width: 390,
    flexGrow: 1,
    label: 'Hash',
    dataKey: BLOCK_HASH,
    disableSort: false,
    className: 'col-hash',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'Transaction Quantity',
    dataKey: TRANSACTIONS_QTY_KEY,
    disableSort: false,
    className: 'col-transaction-quantity',
  },
  {
    width: 100,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: TIMESTAMP_BLOCKS_KEY,
    disableSort: false,
    className: 'col-timestamp',
  },
];
