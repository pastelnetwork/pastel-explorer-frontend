import themeVariant from '@theme/variants';

export enum TimestampDifference {
  '1m' = 2592000,
  '3m' = 7776000,
  '6m' = 15552000,
  '1y' = 31104000,
}

export const zoomOptions = [
  { name: '1m', tooltip: '1 month', timestampDifference: TimestampDifference['1m'] },
  { name: '3m', tooltip: '3 months', timestampDifference: TimestampDifference['3m'] },
  { name: '6m', tooltip: '6 months', timestampDifference: TimestampDifference['6m'] },
  { name: '1y', tooltip: '1 year', timestampDifference: TimestampDifference['1y'] },
];

export const generateVolumeOfTransactionsData = (labels: Array<string>, data: Array<number>) => ({
  labels,
  datasets: [
    {
      label: 'Transactions',
      data,
      fill: false,
      borderColor: themeVariant.map.peer,
      tension: 0.1,
      pointRadius: 0.1,
      borderWidth: 1,
    },
  ],
});
