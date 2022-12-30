import { getCurrencyName } from '@utils/appInfo';

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
    label: 'txID',
    dataKey: TXID_KEY,
    disableSort: false,
    className: 'col-txid',
  },
  {
    width: 20,
    minWidth: 30,
    flexGrow: 1,
    label: 'Block',
    dataKey: BLOCK_KEY,
    disableSort: true,
    className: 'col-block',
  },
  {
    width: 20,
    minWidth: 20,
    flexGrow: 1,
    label: 'Recipents',
    dataKey: RECIPIENT_COUNT_KEY,
    disableSort: false,
    className: 'col-recipents',
  },
  {
    width: 40,
    flexGrow: 1,
    label: `Amount (${getCurrencyName()})`,
    dataKey: AMOUNT_MOVEMENT_KEY,
    disableSort: false,
    className: 'col-amount',
  },
  {
    width: 40,
    flexGrow: 1,
    label: 'Ticket Quantity',
    dataKey: TICKETS_KEY,
    disableSort: false,
    className: 'col-timestamp',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: TIMESTAMP_MOVEMENT_KEY,
    disableSort: false,
    className: 'col-timestamp',
  },
];
