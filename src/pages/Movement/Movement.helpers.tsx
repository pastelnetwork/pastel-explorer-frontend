import RouterLink from '@components/RouterLink/RouterLink';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

import { TIMESTAMP_MOVEMENT_KEY, TXID_KEY, AMOUNT_MOVEMENT_KEY } from './Movement.columns';

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const transformMovementData = (transactions: Array<ITransaction>) =>
  transactions.map(({ id, timestamp, totalAmount }) => ({
    id,
    [TXID_KEY]: <RouterLink route={`${ROUTES.TRANSACTION_DETAILS}/${id}`} value={id} />,
    [AMOUNT_MOVEMENT_KEY]: formatNumber(totalAmount, { decimalsLength: 2 }),
    [TIMESTAMP_MOVEMENT_KEY]: formattedDate(timestamp, { dayName: false }),
  }));
