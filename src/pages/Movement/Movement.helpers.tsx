import { Tooltip, Grid } from '@material-ui/core';
import parse from 'html-react-parser';

import { HIDE_TO_BLOCK } from '@utils/appInfo';
import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';
import Hourglass from '@components/Hourglass/Hourglass';
import { getTicketTitle } from '@components/Ticket';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction, TCounts, TTicketType } from '@utils/types/ITransactions';
import { formatAddress } from '@utils/helpers/format';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as BlockStyles from '@pages/Blocks/Blocks.styles';

import {
  TIMESTAMP_MOVEMENT_KEY,
  TXID_KEY,
  AMOUNT_MOVEMENT_KEY,
  BLOCK_KEY,
  TICKETS_KEY,
  RECIPIENT_COUNT_KEY,
} from './Movement.columns';

export const DATA_FETCH_LIMIT = 40;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const getTicketsTypeList = (tickets: string) => {
  if (tickets) {
    const newTickets = JSON.parse(tickets);
    const counts: TCounts = {};
    for (let i = 0; i < newTickets.length; i += 1) {
      counts[newTickets[i].type] = counts[newTickets[i].type] ? counts[newTickets[i].type] + 1 : 1;
    }
    const keys = Object.keys(counts);

    return {
      text: keys.map(key => {
        let counter = '';
        if (newTickets.length > 1) {
          counter = ` (${counts[key]})`;
        }
        return `${getTicketTitle(key as TTicketType)}${counter}`;
      }),
      total: newTickets.length,
    };
  }

  return { text: [], total: 0 };
};

const generateBlockKeyValue = (blockHash: string, blockHeight: string) => {
  if (blockHash) {
    return <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`} value={blockHeight} />;
  }

  return <Hourglass className="hourglass" />;
};

export const transformMovementData = (transactions: Array<ITransaction>) =>
  transactions.map(
    ({
      id,
      timestamp,
      totalAmount,
      block,
      blockHash,
      isNonStandard,
      tickets,
      recipientCount,
      ticketsTotal,
    }) => {
      const ticketsTypeList = getTicketsTypeList(tickets || '');
      return {
        id,
        [TXID_KEY]: (
          <Grid container alignItems="center" wrap="nowrap">
            <CopyButton copyText={id} />
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${id}`}
              title={id}
              value={formatAddress(id)}
              textSize="large"
            />
          </Grid>
        ),
        [BLOCK_KEY]: generateBlockKeyValue(blockHash, block.height),
        [RECIPIENT_COUNT_KEY]: recipientCount,
        [AMOUNT_MOVEMENT_KEY]: (
          <>
            {isNonStandard ? (
              <Tooltip title={translateDropdown('pages.movement.shieldedTransactionInfo')}>
                <span>{parse(translate('common.unknown'))}</span>
              </Tooltip>
            ) : (
              formatNumber(totalAmount, { decimalsLength: 2 })
            )}
          </>
        ),
        [TICKETS_KEY]: (
          <div className="inline-block">
            {Number(block.height) < HIDE_TO_BLOCK ? (
              <>0</>
            ) : (
              <>
                {ticketsTotal === -1 ? (
                  <BlockStyles.HourglassWrapper>
                    <Hourglass />
                  </BlockStyles.HourglassWrapper>
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>
        ),
        [TIMESTAMP_MOVEMENT_KEY]: formattedDate(timestamp, { dayName: false }),
      };
    },
  );
