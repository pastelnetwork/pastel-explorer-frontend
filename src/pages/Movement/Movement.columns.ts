export const BLOCK_KEY = 'block';
export const TIMESTAMP_MOVEMENT_KEY = 'timestamp';
export const TXID_KEY = 'blockHash';
export const AMOUNT_MOVEMENT_KEY = 'totalAmount';
export const TICKETS_KEY = 'ticketsTotal';
export const RECIPIENT_COUNT_KEY = 'recipientCount';

export const columns = [
  {
    width: 350,
    flexGrow: 1,
    label: 'pages.movement.txID',
    dataKey: TXID_KEY,
    disableSort: false,
    className: 'col-txid',
  },
  {
    width: 20,
    minWidth: 30,
    flexGrow: 1,
    label: 'pages.movement.block',
    dataKey: BLOCK_KEY,
    disableSort: true,
    className: 'col-block',
    dataTitle: 'pages.movement.block',
  },
  {
    width: 20,
    minWidth: 20,
    flexGrow: 1,
    label: 'pages.movement.recipients',
    dataKey: RECIPIENT_COUNT_KEY,
    disableSort: false,
    className: 'col-recipents',
    dataTitle: 'pages.movement.recipients',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'pages.movement.amount',
    dataKey: AMOUNT_MOVEMENT_KEY,
    disableSort: false,
    className: 'col-amount',
    dataTitle: 'pages.movement.amount',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'pages.movement.ticketQuantity',
    dataKey: TICKETS_KEY,
    disableSort: false,
    className: 'col-ticket-quantity',
    dataTitle: 'pages.movement.ticketQuantity',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'pages.movement.timestamp',
    dataKey: TIMESTAMP_MOVEMENT_KEY,
    disableSort: false,
    className: 'col-timestamp',
    dataTitle: 'pages.movement.timestamp',
  },
];
