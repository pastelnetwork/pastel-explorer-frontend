export type SummaryValueProps = string | number | null;

export interface SummaryItemProps {
  id: number;
  name: string;
  value: SummaryValueProps;
  key: string;
}

const summaryList: Array<SummaryItemProps> = [
  { id: 1, name: 'Network (GH/s)', value: null, key: 'hashrate' },
  { id: 2, name: 'Difficulty', value: null, key: 'difficulty' },
  { id: 3, name: 'Coin Supply (PSL)', value: null, key: 'supply' },
  { id: 4, name: 'BTC Price', value: null, key: 'lastPrice' },
];

export default summaryList;
