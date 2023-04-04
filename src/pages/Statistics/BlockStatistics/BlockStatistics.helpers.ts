import { getCurrentUnixTimestamp } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IBlock } from '@utils/types/IBlocks';
import { translate } from '@utils/helpers/i18n';

export interface ITransformBlocksData {
  id: string;
  transactionCount: string;
  height: string;
  size: string;
  minutesAgo: string;
}

export const transformBlocksData = (
  transactions: Array<IBlock>,
  currentTime: number,
): Array<ITransformBlocksData> => {
  return transactions.map(({ id, timestamp, transactionCount, height, size }) => {
    const minutesAgo = Math.floor(((currentTime || getCurrentUnixTimestamp) - timestamp) / 60);
    return {
      id,
      transactionCount: `${transactionCount} transaction${transactionCount === 1 ? '' : 's'}`,
      height: formatNumber(height),
      size: translate('pages.statistics.size', { size: (size / 1024).toFixed(2) }),
      minutesAgo:
        minutesAgo === 1
          ? translate('pages.statistics.minuteAgo', { minutesAgo })
          : translate('pages.statistics.minutesAgo', { minutesAgo }),
    };
  });
};
