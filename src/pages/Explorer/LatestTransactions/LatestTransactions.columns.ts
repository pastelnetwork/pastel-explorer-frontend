export const BLOCK_KEY = 'block';
export const BLOCK_HASH_KEY = 'blockHash';
export const RECIPIENT_COUNT_KEY = 'recipientCount';
export const AMOUNT_KEY = 'totalAmount';
export const TIMESTAMP_KEY = 'timestamp';

export const columns = [
  {
    width: 30,
    minWidth: 30,
    flexGrow: 1,
    label: 'Block',
    dataKey: BLOCK_KEY,
    disableSort: false,
  },
  {
    width: 360,
    minWidth: 360,
    flexGrow: 1,
    label: 'TXID',
    dataKey: BLOCK_HASH_KEY,
    disableSort: false,
    className: 'col-txid',
  },
  {
    width: 20,
    minWidth: 20,
    flexGrow: 1,
    label: 'Recipents',
    dataKey: RECIPIENT_COUNT_KEY,
    disableSort: false,
    className: 'pl-4px',
  },
  {
    width: 60,
    minWidth: 60,
    flexGrow: 1,
    label: 'Amount (PSL)',
    dataKey: AMOUNT_KEY,
    disableSort: false,
    className: 'pl-8px',
  },
  {
    width: 150,
    minWidth: 150,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: false,
    className: 'pl-12px',
  },
];
