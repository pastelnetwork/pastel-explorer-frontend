export type SummaryValueProps = string | number | null;

export interface SummaryItemProps {
  id: number;
  name: string;
  value: SummaryValueProps;
  key: string;
  decimals: number | null;
}

const summaryList: Array<SummaryItemProps> = [
  { id: 1, name: 'Network (GH/s)', value: null, key: 'hashrate', decimals: null },
  { id: 2, name: 'Difficulty', value: null, key: 'difficulty', decimals: 5 },
  { id: 3, name: 'Coin Supply (PSL)', value: null, key: 'supply', decimals: null },
  { id: 4, name: 'BTC Price', value: null, key: 'lastPrice', decimals: null },
];

export default summaryList;
