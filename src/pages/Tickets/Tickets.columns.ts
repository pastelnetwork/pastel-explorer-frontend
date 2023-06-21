export const TXID_KEY = 'transactionHash';
export const STATUS_KEY = 'activation_ticket';
export const FEE_KEY = 'fee';
export const TIMESTAMP_KEY = 'timestamp';
export const PASTEL_ID_KEY = 'pastelID';
export const ID_TYPE_KEY = 'id_type';
export const VERSION_KEY = 'version';
export const TYPE_KEY = 'type';
export const ACTIVATION_TXID_KEY = 'activation_txid';
export const COLLECTION_NAME = 'collectionName';
export const USERNAME_KEY = 'userName';

export const cascadeColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
];

export const senseColumns = [
  {
    width: 50,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
];

export const pastelIDAndUsernameTicketsColumns = [
  {
    width: 90,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
  {
    width: 90,
    flexGrow: 1,
    label: 'pages.tickets.pastelID',
    dataKey: PASTEL_ID_KEY,
    disableSort: true,
    className: 'pastelID',
    dataTitle: 'pages.tickets.pastelID',
  },
  {
    width: 140,
    flexGrow: 1,
    label: 'pages.tickets.userName',
    dataKey: USERNAME_KEY,
    disableSort: true,
    className: 'idType',
    dataTitle: 'pages.tickets.userName',
  },
  {
    width: 160,
    flexGrow: 1,
    label: 'pages.tickets.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: true,
    className: 'timestamp',
    dataTitle: 'pages.tickets.timestamp',
  },
];

export const otherTicketsColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
];

export const offerAndTransferTicketsColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
];

export const pastelNftTicketsColumns = [
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
];
