export const BLOCK_KEY = 'block';
export const BLOCK_HASH_KEY = 'blockHash';
export const RECIPIENT_COUNT_KEY = 'recipientCount';
export const AMOUNT_KEY = 'totalAmount';
export const TIMESTAMP_KEY = 'timestamp';
export const TICKETS_KEY = 'ticketsTotal';

export const columns = [
  {
    width: 30,
    minWidth: 30,
    flexGrow: 1,
    label: 'pages.explorer.block',
    dataKey: BLOCK_KEY,
    disableSort: false,
    className: 'col-block',
  },
  {
    width: 360,
    minWidth: 360,
    flexGrow: 1,
    label: 'pages.explorer.txId',
    dataKey: BLOCK_HASH_KEY,
    disableSort: false,
    className: 'col-txid',
  },
  {
    width: 20,
    minWidth: 20,
    flexGrow: 1,
    label: 'pages.explorer.recipients',
    dataKey: RECIPIENT_COUNT_KEY,
    disableSort: false,
    className: 'col-recipents',
  },
  {
    width: 60,
    minWidth: 60,
    flexGrow: 1,
    label: 'pages.explorer.amount',
    dataKey: AMOUNT_KEY,
    disableSort: false,
    className: 'col-amount',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'pages.explorer.tickets',
    dataKey: TICKETS_KEY,
    disableSort: false,
    className: 'col-timestamp',
  },
  {
    width: 150,
    minWidth: 150,
    flexGrow: 1,
    label: 'pages.explorer.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: false,
    className: 'col-timestamp',
  },
];
