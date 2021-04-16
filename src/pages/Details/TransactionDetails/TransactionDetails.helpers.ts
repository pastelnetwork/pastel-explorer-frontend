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
