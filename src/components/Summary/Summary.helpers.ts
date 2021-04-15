export type SummaryValueProps = string | number | null;

export interface SummaryItemProps {
  id: number;
  name: string;
  value: SummaryValueProps;
  key: string;
  decimals: number | null;
  difference: number;
}

const summaryList: Array<SummaryItemProps> = [
  {
    id: 1,
    name: 'Network (GH/s)',
    value: null,
    key: 'hashrate',
    decimals: null,
    difference: 10,
  },
  { id: 2, name: 'Difficulty', value: null, key: 'difficulty', decimals: 5, difference: -8 },
  {
    id: 3,
    name: 'Coin Supply (PSL)',
    value: null,
    key: 'supply',
    decimals: null,
    difference: 27,
  },
  { id: 4, name: 'BTC Price', value: null, key: 'lastPrice', decimals: null, difference: 5 },
];

export default summaryList;
