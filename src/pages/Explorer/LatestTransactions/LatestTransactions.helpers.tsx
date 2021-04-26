import RouterLink from '@components/RouterLink/RouterLink';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

import {
  AMOUNT_KEY,
  BLOCK_HASH_KEY,
  BLOCK_KEY,
  RECIPIENT_COUNT_KEY,
  TIMESTAMP_KEY,
} from './LatestTransactions.columns';

export const DATA_FETCH_LIMIT = 100;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const transformTransactionsData = (transactions: Array<ITransaction>) =>
  transactions.map(({ blockHash, id, block, recipientCount, timestamp, totalAmount }) => ({
    id,
    [BLOCK_KEY]: <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`} value={block.height} />,
    [BLOCK_HASH_KEY]: <RouterLink route={`${ROUTES.TRANSACTION_DETAILS}/${id}`} value={id} />,
    [RECIPIENT_COUNT_KEY]: recipientCount,
    [AMOUNT_KEY]: formatNumber(totalAmount, { decimalsLength: 2 }),
    [TIMESTAMP_KEY]: formattedDate(timestamp),
  }));
