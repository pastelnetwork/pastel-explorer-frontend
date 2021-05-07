import RouterLink from '@components/RouterLink/RouterLink';

import * as ROUTES from '@utils/constants/routes';
import { formattedDate, getCurrentUnixTimestamp } from '@utils/helpers/date/date';
import { IBlock } from '@utils/types/IBlocks';

import { BLOCK_ID_KEY, TRANSACTIONS_QTY_KEY, TIMESTAMP_BLOCKS_KEY } from './Blocks.columns';

const BLOCK_ELEMENTS_COUNT = 8;

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const transformTableData = (transactions: Array<IBlock>) =>
  transactions.map(({ id, timestamp, transactionCount }) => ({
    id,
    [BLOCK_ID_KEY]: <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${id}`} value={id} />,
    [TRANSACTIONS_QTY_KEY]: transactionCount,
    [TIMESTAMP_BLOCKS_KEY]: formattedDate(timestamp, { dayName: false }),
  }));

export interface TransformBlocksData {
  id: string;
  transactionCount: string;
  height: number;
  size: string;
  minutesAgo: string;
}

export const transformBlocksData = (transactions: Array<IBlock>): Array<TransformBlocksData> => {
  return transactions
    .slice(0, BLOCK_ELEMENTS_COUNT)
    .map(({ id, timestamp, transactionCount, height, size }) => {
      const minutesAgo = Math.floor((getCurrentUnixTimestamp - timestamp) / 60);
      return {
        id,
        transactionCount: `${transactionCount} transaction${transactionCount === 1 ? '' : 's'}`,
        height,
        size: `${(size / 1024).toFixed(2)} MB`,
        minutesAgo: `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`,
      };
    });
};
