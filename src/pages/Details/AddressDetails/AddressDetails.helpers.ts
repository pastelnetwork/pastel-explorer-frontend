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

export const addressMockRows = [
  {
    id: 1,
    data: [
      { id: 1, value: '171692592.13868001' },
      { id: 2, value: '172287692.37152001' },
      { id: 3, value: '595100.23284000' },
    ],
  },
];

export const transactionsMockRows = [
  {
    id: 1,
    data: [
      { id: 1, value: '16th Apr 2021 10:01:35' },
      { id: 2, value: '306192aa3ed53a0e2a2dfa84c0f0aa9d94f2f7fcf23a46b7c7529d7180b1f78d' },
      { id: 3, value: '- 6250.00641000' },
    ],
  },
  {
    id: 2,
    data: [
      { id: 1, value: '16th Apr 2021 10:01:35' },
      { id: 2, value: '0cf3df4d47af49780ec3a8b1aa10ab2748465d6755aa12416c92c7fd946c078f' },
      { id: 3, value: '+ 6250.00641000' },
    ],
  },
];
