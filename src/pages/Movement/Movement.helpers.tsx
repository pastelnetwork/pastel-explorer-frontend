import { Tooltip, Grid } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';
import Hourglass from '@components/Hourglass/Hourglass';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

import {
  TIMESTAMP_MOVEMENT_KEY,
  TXID_KEY,
  AMOUNT_MOVEMENT_KEY,
  BLOCK_KEY,
} from './Movement.columns';

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

const generateBlockKeyValue = (blockHash: string, blockHeight: string) => {
  if (blockHash) {
    return <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`} value={blockHeight} />;
  }

  return <Hourglass />;
};

export const transformMovementData = (transactions: Array<ITransaction>) =>
  transactions.map(({ id, timestamp, totalAmount, block, blockHash, isNonStandard }) => ({
    id,
    [TXID_KEY]: (
      <Grid container alignItems="center" wrap="nowrap">
        <CopyButton copyText={id} />
        <RouterLink
          route={`${ROUTES.TRANSACTION_DETAILS}/${id}`}
          title={id}
          value={id}
          textSize="large"
        />
      </Grid>
    ),
    [BLOCK_KEY]: generateBlockKeyValue(blockHash, block.height),
    [AMOUNT_MOVEMENT_KEY]: (
      <>
        {isNonStandard ? (
          <Tooltip title="Because the transaction is shielded, the amount sent is unknown.">
            <span>Unknown</span>
          </Tooltip>
        ) : (
          formatNumber(totalAmount, { decimalsLength: 2 })
        )}
      </>
    ),
    [TIMESTAMP_MOVEMENT_KEY]: formattedDate(timestamp, { dayName: false }),
  }));
