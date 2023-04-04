export const SUPERNODE_IP_KEY = 'ip';
export const SUPERNODE_PORT_KEY = 'port';
export const SUPERNODE_ADDRESS_KEY = 'address';
export const SUPERNODE_STATUS_KEY = 'status';
export const SUPERNODE_COUNTRY_KEY = 'country';
export const SUPERNODE_LAST_PAID_KEY = 'lastPaidTime';

export const columns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.supernodes.supernodeIP',
    dataKey: SUPERNODE_IP_KEY,
    disableSort: false,
    className: 'col-supernode-ip',
    dataTitle: 'pages.supernodes.supernodeIP',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'pages.supernodes.port',
    dataKey: SUPERNODE_PORT_KEY,
    disableSort: true,
    className: 'col-port',
    dataTitle: 'pages.supernodes.port',
  },
  {
    width: 320,
    flexGrow: 1,
    label: 'pages.supernodes.address',
    dataKey: SUPERNODE_ADDRESS_KEY,
    disableSort: true,
    className: 'col-address',
    dataTitle: 'pages.supernodes.address',
  },
  {
    width: 160,
    flexGrow: 1,
    label: 'pages.supernodes.status',
    dataKey: SUPERNODE_STATUS_KEY,
    disableSort: true,
    className: 'col-status',
    dataTitle: 'pages.supernodes.status',
  },
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.supernodes.country',
    dataKey: SUPERNODE_COUNTRY_KEY,
    disableSort: false,
    className: 'col-country',
    dataTitle: 'pages.supernodes.country',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'pages.supernodes.lastPaid',
    dataKey: SUPERNODE_LAST_PAID_KEY,
    disableSort: false,
    className: 'col-last-paid',
    dataTitle: 'pages.supernodes.lastPaid',
  },
];
