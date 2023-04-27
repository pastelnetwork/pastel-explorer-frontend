export const TXID_KEY = 'transactionHash';
export const STATUS_KEY = 'activation_ticket';
export const FEE_KEY = 'fee';
export const TIMESTAMP_KEY = 'timestamp';
export const PASTEL_ID_KEY = 'pastelID';
export const ID_TYPE_KEY = 'id_type';
export const VERSION_KEY = 'version';
export const TYPE_KEY = 'type';
export const ACTIVATION_TXID_KEY = 'activation_txid';

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
  {
    width: 60,
    flexGrow: 1,
    label: 'pages.tickets.status',
    dataKey: STATUS_KEY,
    disableSort: true,
    className: 'status',
    dataTitle: 'pages.tickets.status',
  },
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.tickets.fee',
    dataKey: FEE_KEY,
    disableSort: true,
    className: 'fee',
    dataTitle: 'pages.tickets.fee',
  },
  {
    width: 90,
    flexGrow: 1,
    label: 'pages.tickets.activationTXID',
    dataKey: ACTIVATION_TXID_KEY,
    disableSort: true,
    className: 'fee',
    dataTitle: 'pages.tickets.activationTXID',
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
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.tickets.status',
    dataKey: STATUS_KEY,
    disableSort: true,
    className: 'status',
    dataTitle: 'pages.tickets.status',
  },
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.fee',
    dataKey: FEE_KEY,
    disableSort: true,
    className: 'fee',
    dataTitle: 'pages.tickets.fee',
  },
  {
    width: 90,
    flexGrow: 1,
    label: 'pages.tickets.activationTXID',
    dataKey: ACTIVATION_TXID_KEY,
    disableSort: true,
    className: 'fee',
    dataTitle: 'pages.tickets.activationTXID',
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

export const pastelIDAndUsernameTicketsColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.pastelID',
    dataKey: PASTEL_ID_KEY,
    disableSort: true,
    className: 'pastelID',
    dataTitle: 'pages.tickets.pastelID',
  },
  {
    width: 160,
    flexGrow: 1,
    label: 'pages.tickets.type',
    dataKey: TYPE_KEY,
    disableSort: true,
    className: 'idType',
    dataTitle: 'pages.tickets.type',
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
  {
    width: 140,
    flexGrow: 1,
    label: 'pages.tickets.type',
    dataKey: TYPE_KEY,
    disableSort: true,
    className: 'type',
    dataTitle: 'pages.tickets.type',
  },
  {
    width: 10,
    flexGrow: 1,
    label: 'pages.tickets.version',
    dataKey: VERSION_KEY,
    disableSort: true,
    className: 'version',
    dataTitle: 'pages.tickets.version',
  },
  {
    width: 140,
    flexGrow: 1,
    label: 'pages.tickets.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: true,
    className: 'timestamp',
    dataTitle: 'pages.tickets.timestamp',
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
  {
    width: 140,
    flexGrow: 1,
    label: 'pages.tickets.type',
    dataKey: TYPE_KEY,
    disableSort: true,
    className: 'type',
    dataTitle: 'pages.tickets.type',
  },
  {
    width: 10,
    flexGrow: 1,
    label: 'pages.tickets.version',
    dataKey: VERSION_KEY,
    disableSort: true,
    className: 'version',
    dataTitle: 'pages.tickets.version',
  },
  {
    width: 140,
    flexGrow: 1,
    label: 'pages.tickets.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: true,
    className: 'timestamp',
    dataTitle: 'pages.tickets.timestamp',
  },
];

export const pastelNftTicketsColumns = [
  {
    width: 60,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
  {
    width: 50,
    flexGrow: 1,
    label: 'pages.tickets.status',
    dataKey: STATUS_KEY,
    disableSort: true,
    className: 'status',
    dataTitle: 'pages.tickets.status',
  },
  {
    width: 180,
    flexGrow: 1,
    label: 'pages.tickets.type',
    dataKey: TYPE_KEY,
    disableSort: true,
    className: 'type',
    dataTitle: 'pages.tickets.type',
  },
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.tickets.activationTXID',
    dataKey: ACTIVATION_TXID_KEY,
    disableSort: true,
    className: 'fee',
    dataTitle: 'pages.tickets.activationTXID',
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
