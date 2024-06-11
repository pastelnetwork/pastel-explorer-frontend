export const BLOCK_ID_KEY = 'blockId';
export const BLOCK_HASH = 'blockHash';
export const TRANSACTIONS_QTY_KEY = 'transactionCount';
export const TOTAL_TICKETS = 'totalTickets';
export const BLOCK_SIZE = 'size';
export const TIMESTAMP_BLOCKS_KEY = 'timestamp';
export const TIMESTAMP_BETWEEN_BLOCKS_KEY = 'timeBetweenBlocks';

export const columns = [
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.blocks.block',
    dataKey: BLOCK_ID_KEY,
    disableSort: false,
    className: 'col-hash',
    dataTitle: 'pages.blocks.block',
  },
  {
    width: 290,
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
    width: 120,
    flexGrow: 1,
    label: 'pages.blocks.timeBetweenBlocks',
    dataKey: TIMESTAMP_BETWEEN_BLOCKS_KEY,
    disableSort: true,
    className: 'col-time-between-blocks',
    dataTitle: 'pages.blocks.timeBetweenBlocks',
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

export const csvHeader = [
  { label: 'pages.blocks.block', key: BLOCK_ID_KEY },
  { label: 'pages.blocks.hash', key: BLOCK_HASH },
  { label: 'pages.blocks.transactionQuantity', key: TRANSACTIONS_QTY_KEY },
  { label: 'pages.blocks.ticketQuantity', key: TOTAL_TICKETS },
  { label: 'pages.blocks.size', key: BLOCK_SIZE },
  { label: 'pages.blocks.timeBetweenBlocks', key: TIMESTAMP_BETWEEN_BLOCKS_KEY },
  { label: 'pages.blocks.timestamp', key: TIMESTAMP_BLOCKS_KEY },
];

export const MEMPOOL_BLOCK_KEY = 'block';
export const MEMPOOL_TXID_KEY = 'txID';
export const MEMPOOL_RECIPIENT_KEY = 'recipients';
export const MEMPOOL_AMOUNT_KEY = 'amount';
export const MEMPOOL_SIZE_KEY = 'size';
export const MEMPOOL_FEE_KEY = 'fee';
export const MEMPOOL_TICKET_QUANTITY_KEY = 'ticketQuantity';
export const MEMPOOL_TIMESTAMP_KEY = 'timestamp';

export const mempoolColumns = [
  {
    width: 120,
    flexGrow: 1,
    label: 'pages.movement.txID',
    dataKey: MEMPOOL_TXID_KEY,
    disableSort: true,
    className: 'col-txID',
    dataTitle: 'pages.movement.txID',
  },
  {
    width: 5,
    flexGrow: 1,
    label: 'pages.movement.block',
    dataKey: MEMPOOL_BLOCK_KEY,
    disableSort: true,
    className: 'col-block',
    dataTitle: 'pages.movement.block',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.movement.recipients',
    dataKey: MEMPOOL_RECIPIENT_KEY,
    disableSort: true,
    className: 'col-recipients',
    dataTitle: 'pages.movement.recipients',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.movement.amount',
    dataKey: MEMPOOL_AMOUNT_KEY,
    disableSort: true,
    className: 'col-amount',
    dataTitle: 'pages.movement.amount',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.movement.size',
    dataKey: MEMPOOL_SIZE_KEY,
    disableSort: true,
    className: 'col-size',
    dataTitle: 'pages.movement.size',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.movement.fee',
    dataKey: MEMPOOL_FEE_KEY,
    disableSort: true,
    className: 'col-fee',
    dataTitle: 'pages.movement.fee',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.movement.ticketQuantity',
    dataKey: MEMPOOL_TICKET_QUANTITY_KEY,
    disableSort: true,
    className: 'col-ticketQuantity',
    dataTitle: 'pages.movement.ticketQuantity',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.movement.timestamp',
    dataKey: MEMPOOL_TIMESTAMP_KEY,
    disableSort: true,
    className: 'col-timestamp',
    dataTitle: 'pages.movement.timestamp',
  },
];
