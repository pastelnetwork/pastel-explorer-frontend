import { HeaderType } from '@components/Table/Table';

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'Confirmations' },
  { id: 2, header: 'Block Hash' },
  { id: 3, header: 'Timestamp' },
];

export const inputAddressHeaders: Array<HeaderType> = [
  { id: 1, header: 'Address' },
  { id: 2, header: 'Amount (PSL)' },
];

export const recipientsHeaders: Array<HeaderType> = [
  { id: 1, header: 'Address' },
  { id: 2, header: 'Amount (PSL)' },
];

export const transactionMockRows = [
  {
    id: 1,
    data: [
      { id: 1, value: '1' },
      { id: 2, value: '000000014b1df3d3e2dbc70b80090279c9a63ad3728b2ae75578f6ac3d4dec24' },
      { id: 3, value: '16th Apr 2021 07:53:28' },
    ],
  },
];

export const inputAddressMockRows = [
  {
    id: 1,
    data: [
      { id: 1, value: 'PtVRZ4aCKcPEchjsvr1vUo3tqRqDu58pZTr' },
      { id: 2, value: '4875.00000000' },
    ],
  },
];

export const recipientsMockRows = [
  {
    id: 1,
    data: [
      { id: 1, value: 'Ptm6pogYcUQQ7qrDouQY5iHDpVytwh89xSX' },
      { id: 2, value: '100.75054000' },
    ],
  },
];
