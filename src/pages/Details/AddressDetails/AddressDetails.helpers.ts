import { HeaderType } from '@components/Table/Table';

export const addressHeaders: Array<HeaderType> = [
  { id: 1, header: 'Total Sent (PSL)' },
  { id: 2, header: 'Total Received (PSL)' },
  { id: 3, header: 'Balance (PSL)' },
];

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'Timestamp' },
  { id: 2, header: 'Hash' },
  { id: 3, header: 'Amount (PSL)' },
];
