import { HeaderType } from '@components/Table/Table';

export const blockHeaders: Array<HeaderType> = [
  { id: 1, header: 'Height' },
  { id: 2, header: 'Difficulty' },
  { id: 3, header: 'Confirmations' },
  { id: 4, header: 'Size (kB)' },
  { id: 5, header: 'Nonce' },
  { id: 6, header: 'Timestamp' },
];

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'Hash' },
  { id: 2, header: 'Recipients' },
  { id: 3, header: 'Amount (PSL)' },
];
