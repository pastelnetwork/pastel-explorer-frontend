export const BLOCK_ID_KEY = 'blockId';
export const BLOCK_HASH = 'blockHash';
export const TRANSACTIONS_QTY_KEY = 'transactionCount';
export const TOTAL_TICKETS = 'totalTickets';
export const BLOCK_SIZE = 'size';
export const TIMESTAMP_BLOCKS_KEY = 'timestamp';

export const columns = [
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.blocks.block',
    dataKey: BLOCK_ID_KEY,
    disableSort: false,
    className: 'col-block',
  },
  {
    width: 390,
    flexGrow: 1,
    label: 'pages.blocks.hash',
    dataKey: BLOCK_HASH,
    disableSort: false,
    className: 'col-hash',
    dataTitle: 'pages.blocks.hash',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'pages.blocks.transactionQuantity',
    dataKey: TRANSACTIONS_QTY_KEY,
    disableSort: false,
    className: 'col-transaction-quantity',
    dataTitle: 'pages.blocks.transactionQuantity',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'pages.blocks.ticketQuantity',
    dataKey: TOTAL_TICKETS,
    disableSort: false,
    className: 'col-total-tickets',
    dataTitle: 'pages.blocks.ticketQuantity',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'pages.blocks.size',
    dataKey: BLOCK_SIZE,
    disableSort: false,
    className: 'col-total-size',
    dataTitle: 'pages.blocks.size',
  },
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.blocks.timestamp',
    dataKey: TIMESTAMP_BLOCKS_KEY,
    disableSort: false,
    className: 'col-timestamp',
    dataTitle: 'pages.blocks.timestamp',
  },
];
