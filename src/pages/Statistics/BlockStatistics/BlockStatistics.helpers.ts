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
  status: string;
}

export const transformBlocksData = (
  transactions: Array<IBlock>,
  currentTime: number,
): Array<ITransformBlocksData> => {
  return transactions.map(({ id, timestamp, transactionCount, height, size, totalTickets }) => {
    let minutesAgo = Math.floor(((currentTime || Date.now() / 1000) - timestamp) / 60);
    if (minutesAgo < 0) {
      minutesAgo = 0;
    }
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
      status: 'entered',
    };
  });
};
