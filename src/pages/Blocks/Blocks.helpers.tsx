import RouterLink from '@components/RouterLink/RouterLink';

import * as ROUTES from '@utils/constants/routes';
import { formattedDate } from '@utils/helpers/date/date';
import { IBlock } from '@utils/types/IBlocks';

import {
  BLOCK_ID_KEY,
  BLOCK_HASH,
  TRANSACTIONS_QTY_KEY,
  TIMESTAMP_BLOCKS_KEY,
} from './Blocks.columns';

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const transformTableData = (transactions: Array<IBlock>) =>
  transactions.map(({ id, timestamp, transactionCount, height }) => ({
    id,
    [BLOCK_ID_KEY]: height,
    [BLOCK_HASH]: <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${id}`} value={id} title={id} />,
    [TRANSACTIONS_QTY_KEY]: transactionCount,
    [TIMESTAMP_BLOCKS_KEY]: formattedDate(timestamp, { dayName: false }),
  }));
