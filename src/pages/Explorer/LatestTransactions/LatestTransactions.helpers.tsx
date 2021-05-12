import { Tooltip } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

import hourglassIcon from '@assets/icons/hourglass.svg';

import * as Styles from './LatestTransactions.styles';

import {
  AMOUNT_KEY,
  BLOCK_HASH_KEY,
  BLOCK_KEY,
  RECIPIENT_COUNT_KEY,
  TIMESTAMP_KEY,
} from './LatestTransactions.columns';

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

const generateBlockKeyValue = (blockHash: string, blockHeight: string) => {
  if (blockHash) {
    return <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`} value={blockHeight} />;
  }

  return (
    <Tooltip title="Transaction is not yet included in any block">
      <img src={hourglassIcon} alt="hourglass icon" />
    </Tooltip>
  );
};

export const transformTransactionsData = (transactions: Array<ITransaction>) =>
  transactions.map(({ blockHash, id, block, recipientCount, timestamp, totalAmount }) => ({
    id,
    [BLOCK_KEY]: generateBlockKeyValue(blockHash, block.height),
    [BLOCK_HASH_KEY]: <RouterLink route={`${ROUTES.TRANSACTION_DETAILS}/${id}`} value={id} />,
    [RECIPIENT_COUNT_KEY]: recipientCount,
    [AMOUNT_KEY]: (
      <Tooltip title={totalAmount} arrow>
        <Styles.Typography>{formatNumber(totalAmount, { decimalsLength: 2 })}</Styles.Typography>
      </Tooltip>
    ),
    [TIMESTAMP_KEY]: formattedDate(timestamp),
  }));
