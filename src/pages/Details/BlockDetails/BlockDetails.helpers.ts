import { HeaderType } from '@components/Table/Table';

export const blockHeaders: Array<HeaderType> = [
  { id: 1, header: 'Height' },
  { id: 2, header: 'Difficulty' },
  { id: 3, header: 'Confirmations' },
  { id: 4, header: 'Size (kB)' },
  { id: 5, header: 'Bits' },
  { id: 6, header: 'Nonce' },
  { id: 7, header: 'Timestamp' },
];

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'Hash' },
  { id: 2, header: 'Recipients' },
  { id: 3, header: 'Amount (PSL)' },
];

export const blockMockRows = [
  {
    id: 1,
    data: [
      { id: 1, value: '44500' },
      { id: 2, value: '334889.5988' },
      { id: 3, value: '1' },
      { id: 4, value: '2.32' },
      { id: 5, value: '1d0190c8' },
      { id: 6, value: 'e2f0098000000000000000000003000000000000000000000000000067beff0f' },
      { id: 7, value: '16th Apr 2021 07:53:28' },
    ],
  },
];

export const transactionsMockRows = [
  {
    id: 1,
    data: [
      { id: 1, value: '306192aa3ed53a0e2a2dfa84c0f0aa9d94f2f7fcf23a46b7c7529d7180b1f78d' },
      { id: 2, value: '3' },
      { id: 3, value: '6250.00641000' },
    ],
  },
  {
    id: 2,
    data: [
      { id: 1, value: '370e485d5820e5a7a735d3333e755766c32b624ad500b493802289c59dbe7ad5' },
      { id: 2, value: '2' },
      { id: 3, value: '1350.00641000' },
    ],
  },
];
