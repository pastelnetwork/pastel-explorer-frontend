import { Tooltip, Grid } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';
import Hourglass from '@components/Hourglass/Hourglass';
import { getTicketsTypeList } from '@pages/Movement/Movement.helpers';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';
import { formatAddress } from '@utils/helpers/format';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './LatestTransactions.styles';

import {
  AMOUNT_KEY,
  BLOCK_HASH_KEY,
  BLOCK_KEY,
  RECIPIENT_COUNT_KEY,
  TIMESTAMP_KEY,
  TICKETS_KEY,
} from './LatestTransactions.columns';

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const generateBlockKeyValue = (blockHash: string | number, blockHeight: string | number) => {
  if (blockHash) {
    return (
      <RouterLink
        route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`}
        value={blockHeight}
        className="transaction-detail-link"
      />
    );
  }

  return <Hourglass className="hourglass" />;
};

export const transformTransactionsData = (transactions: Array<ITransaction>) =>
  transactions.map(
    ({ blockHash, id, block, recipientCount, timestamp, totalAmount, isNonStandard, tickets }) => {
      const ticketsTypeList = getTicketsTypeList(tickets || '');
      return {
        id,
        [BLOCK_KEY]: generateBlockKeyValue(blockHash, block.height),
        [BLOCK_HASH_KEY]: (
          <Grid container alignItems="center" wrap="nowrap">
            <CopyButton copyText={id} />
            <RouterLink
              title={id}
              route={`${ROUTES.TRANSACTION_DETAILS}/${id}`}
              value={formatAddress(id)}
              textSize="large"
              className="txid-link"
            />
          </Grid>
        ),
        [RECIPIENT_COUNT_KEY]: recipientCount,
        [AMOUNT_KEY]: (
          <Tooltip
            title={
              isNonStandard ? translate('pages.explorer.shieldedTransactionTooltip') : totalAmount
            }
            arrow
          >
            <Styles.Typography>
              {isNonStandard ? 'Unknown' : formatNumber(totalAmount, { decimalsLength: 2 })}
            </Styles.Typography>
          </Tooltip>
        ),
        [TICKETS_KEY]: (
          <div className="inline-block">
            {ticketsTypeList.total > 0 ? (
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${id}`}
                value={ticketsTypeList.total}
                textSize="large"
                title={ticketsTypeList.text.join(', <br />')}
                isUseTooltip
              />
            ) : (
              0
            )}
          </div>
        ),
        [TIMESTAMP_KEY]: formattedDate(timestamp, { dayName: false }),
      };
    },
  );
