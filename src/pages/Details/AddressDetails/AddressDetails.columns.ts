export const ADDRESS_TRANSACTION_TIMESTAMP_KEY = 'timestamp';
export const ADDRESS_TRANSACTION_HASH_KEY = 'transactionHash';
export const ADDRESS_TRANSACTION_AMOUNT_KEY = 'amount';

export const columns = [
  {
    width: 500,
    flexGrow: 1,
    label: 'pages.addressDetails.hash',
    dataKey: ADDRESS_TRANSACTION_HASH_KEY,
    disableSort: false,
    className: 'col-hash',
    dataTitle: 'pages.addressDetails.hash',
  },
  {
    width: 40,
    flexGrow: 1,
    label: `pages.addressDetails.amount`,
    dataKey: ADDRESS_TRANSACTION_AMOUNT_KEY,
    disableSort: false,
    className: 'col-amount',
    dataTitle: 'pages.addressDetails.amount',
  },
  {
    width: 90,
    flexGrow: 1,
    label: 'pages.addressDetails.timestamp',
    dataKey: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    disableSort: false,
    className: 'col-timestamp',
    dataTitle: 'pages.addressDetails.timestamp',
  },
];
