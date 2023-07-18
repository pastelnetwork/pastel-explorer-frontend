import { getCurrentUnixTimestamp } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IBlock } from '@utils/types/IBlocks';
import { translateDropdown } from '@utils/helpers/i18n';

export interface ITransformBlocksData {
  id: string;
  transactionCount: string;
  height: string;
  size: string;
  minutesAgo: string;
  ticketsCount: string;
}

export const transformBlocksData = (
  transactions: Array<IBlock>,
  currentTime: number,
): Array<ITransformBlocksData> => {
  return transactions.map(({ id, timestamp, transactionCount, height, size, totalTickets }) => {
    const minutesAgo = Math.floor(((currentTime || getCurrentUnixTimestamp) - timestamp) / 60);
    return {
      id,
      transactionCount: `${transactionCount} transaction${transactionCount === 1 ? '' : 's'}`,
      height: formatNumber(height),
      size: translateDropdown('pages.statistics.size', { size: (size / 1024).toFixed(2) }),
      minutesAgo:
        minutesAgo === 1
          ? translateDropdown('pages.statistics.minuteAgo', { minutesAgo })
          : translateDropdown('pages.statistics.minutesAgo', { minutesAgo }),
      ticketsCount:
        totalTickets > 1
          ? translateDropdown('pages.statistics.tickets', { ticketsCount: totalTickets })
          : translateDropdown('pages.statistics.ticket', { ticketsCount: totalTickets || 0 }),
    };
  });
};
