import { getCurrentUnixTimestamp } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IBlock } from '@utils/types/IBlocks';

import themeVariant from '@theme/variants';

export interface ITransformBlocksData {
  id: string;
  transactionCount: string;
  height: string;
  size: string;
  minutesAgo: string;
}

export const transformBlocksData = (transactions: Array<IBlock>): Array<ITransformBlocksData> => {
  return transactions.map(({ id, timestamp, transactionCount, height, size }) => {
    const minutesAgo = Math.floor((getCurrentUnixTimestamp - timestamp) / 60);
    return {
      id,
      transactionCount: `${transactionCount} transaction${transactionCount === 1 ? '' : 's'}`,
      height: formatNumber(height),
      size: `${(size / 1024).toFixed(2)} KB`,
      minutesAgo: `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`,
    };
  });
};

export const generateBlocksChartData = (labels: Array<string>, data: Array<number>) => ({
  labels,
  datasets: [
    {
      label: 'Block KB',
      data,
      fill: false,
      borderColor: themeVariant.map.peer,
      tension: 0.1,
      pointRadius: 2,
      borderWidth: 1,
    },
  ],
});
