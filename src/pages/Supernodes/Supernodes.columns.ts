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
    label: 'Supernode IP',
    dataKey: SUPERNODE_IP_KEY,
    disableSort: false,
    className: 'col-supernode-ip',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'Port',
    dataKey: SUPERNODE_PORT_KEY,
    disableSort: true,
    className: 'col-port',
  },
  {
    width: 320,
    flexGrow: 1,
    label: 'Address',
    dataKey: SUPERNODE_ADDRESS_KEY,
    disableSort: true,
    className: 'col-address',
  },
  {
    width: 160,
    flexGrow: 1,
    label: 'Status',
    dataKey: SUPERNODE_STATUS_KEY,
    disableSort: true,
    className: 'col-status',
  },
  {
    width: 100,
    flexGrow: 1,
    label: 'Country',
    dataKey: SUPERNODE_COUNTRY_KEY,
    disableSort: false,
    className: 'col-country',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'Last paid',
    dataKey: SUPERNODE_LAST_PAID_KEY,
    disableSort: false,
    className: 'col-last-paid',
  },
];
