import Tooltip from '@mui/material/Tooltip';
import parse from 'html-react-parser';
import TimeAgo from 'react-timeago';

import RouterLink from '@components/RouterLink/RouterLink';
import Hourglass from '@components/Hourglass/Hourglass';
import MinedIcon from '@pages/Details/BlockDetails/MinedIcon';
import { IMempool } from '@utils/types/ITransactions';

import { HIDE_TO_BLOCK } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';
import { formattedDate } from '@utils/helpers/date/date';
import { IBlock } from '@utils/types/IBlocks';
import { formatAddress } from '@utils/helpers/format';
import { getTicketsTypeList } from '@pages/Movement/Movement.helpers';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { translate } from '@utils/helpers/i18n';

import { ReactComponent as BoxIcon } from '@assets/icons/box.svg';

import {
  BLOCK_ID_KEY,
  BLOCK_HASH,
  TRANSACTIONS_QTY_KEY,
  TOTAL_TICKETS,
  TIMESTAMP_BLOCKS_KEY,
  BLOCK_SIZE,
  TIMESTAMP_BETWEEN_BLOCKS_KEY,
  MEMPOOL_TXID_KEY,
  MEMPOOL_RECIPIENT_KEY,
  MEMPOOL_AMOUNT_KEY,
  MEMPOOL_SIZE_KEY,
  MEMPOOL_FEE_KEY,
  MEMPOOL_TICKET_QUANTITY_KEY,
  MEMPOOL_TIMESTAMP_KEY,
  MEMPOOL_BLOCK_KEY,
} from './Blocks.columns';
import * as Styles from './Blocks.styles';

export const DATA_FETCH_LIMIT = 40;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const transformTableData = (transactions: Array<IBlock>) =>
  transactions
    .slice(0, transactions.length - 1)
    .map(
      ({
        id,
        timestamp,
        transactionCount,
        height,
        ticketsList,
        size,
        totalTickets,
        type,
        timeInMinutesBetweenBlocks,
      }) => {
        const ticketsTypeList = getTicketsTypeList(ticketsList || '');
        return {
          id,
          [BLOCK_ID_KEY]: (
            <Styles.BlockHeight className="block-height">
              <BoxIcon className="box-icon" />{' '}
              <RouterLink
                className="hash-link"
                route={`${ROUTES.BLOCK_DETAILS}/${id}`}
                value={height}
                title={height.toString()}
              />
              <MinedIcon type={type || ''} />
            </Styles.BlockHeight>
          ),
          [BLOCK_HASH]: (
            <RouterLink
              className="hash-link"
              route={`${ROUTES.BLOCK_DETAILS}/${id}`}
              value={formatAddress(id, 20, -6)}
              title={id}
            />
          ),
          [TRANSACTIONS_QTY_KEY]: transactionCount,
          [TOTAL_TICKETS]: (
            <div className="inline-block">
              {height < HIDE_TO_BLOCK ? (
                <>0</>
              ) : (
                <div>
                  {totalTickets === -1 ? (
                    <Styles.HourglassWrapper>
                      <Hourglass />
                    </Styles.HourglassWrapper>
                  ) : (
                    <div>
                      {ticketsTypeList.total > 0 ? (
                        <RouterLink
                          className="hash-link"
                          route={`${ROUTES.BLOCK_DETAILS}/${id}`}
                          value={ticketsTypeList.total}
                          title={ticketsTypeList.text.join(', <br />')}
                          isUseTooltip
                        />
                      ) : (
                        <div>0</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ),
          [BLOCK_SIZE]: (
            <div className="inline-block">{formatNumber(size / 1024, { decimalsLength: 2 })}</div>
          ),
          [TIMESTAMP_BETWEEN_BLOCKS_KEY]: (
            <div className="inline-block">
              {timeInMinutesBetweenBlocks ? (
                <>
                  {timeInMinutesBetweenBlocks.toFixed(1)}{' '}
                  {translate(
                    timeInMinutesBetweenBlocks === 1
                      ? 'pages.blocks.minute'
                      : 'pages.blocks.minutes',
                  )}
                </>
              ) : (
                <>0 {translate('pages.blocks.minutes')}</>
              )}
            </div>
          ),
          [TIMESTAMP_BLOCKS_KEY]: (
            <div className="timestamp">{formattedDate(timestamp, { dayName: false })}</div>
          ),
        };
      },
    );

const getTotalTicket = (height: number, totalTickets: number, ticketsList: string) => {
  if (height < HIDE_TO_BLOCK) {
    return '0';
  }
  if (totalTickets === -1) {
    return '--';
  }
  const ticketsTypeList = getTicketsTypeList(ticketsList || '');
  if (ticketsTypeList.total > 0) {
    return ticketsTypeList.total;
  }
  return '0';
};

export const getCsvData = (blocks: Array<IBlock>) => {
  return blocks
    .slice(0, blocks.length - 1)
    .map(
      ({
        id,
        timestamp,
        transactionCount,
        height,
        ticketsList,
        size,
        totalTickets,
        timeInMinutesBetweenBlocks,
      }) => ({
        [BLOCK_ID_KEY]: height,
        [BLOCK_HASH]: id,
        [TRANSACTIONS_QTY_KEY]: transactionCount,
        [TOTAL_TICKETS]: getTotalTicket(height, totalTickets, ticketsList),
        [BLOCK_SIZE]: formatNumber(size / 1024, { decimalsLength: 2 }),
        [TIMESTAMP_BETWEEN_BLOCKS_KEY]: timeInMinutesBetweenBlocks
          ? `${timeInMinutesBetweenBlocks.toFixed(1)} ${translate(timeInMinutesBetweenBlocks === 1 ? 'pages.blocks.minute' : 'pages.blocks.minutes')}`
          : `0 ${translate('pages.blocks.minutes')}`,
        [TIMESTAMP_BLOCKS_KEY]: formattedDate(timestamp, { dayName: false }),
      }),
    );
};

export const transformMempoolTableData = (transactions: Array<IMempool>) =>
  transactions?.map(
    ({ id, recipientCount, isNonStandard, totalAmount, size, fee, tickets, timestamp }) => {
      const ticketsTypeList = getTicketsTypeList(tickets || '');
      return {
        id,
        [MEMPOOL_TXID_KEY]: (
          <Styles.BlockHeight className="block-height">
            <BoxIcon className="box-icon" />{' '}
            <RouterLink
              className="hash-link"
              route={`${ROUTES.TRANSACTION_DETAILS}/${id}`}
              value={formatAddress(id)}
              title={id.toString()}
            />
          </Styles.BlockHeight>
        ),
        [MEMPOOL_BLOCK_KEY]: (
          <Styles.HourglassWrapper>
            <Hourglass />
          </Styles.HourglassWrapper>
        ),
        [MEMPOOL_RECIPIENT_KEY]: <>{formatNumber(recipientCount)}</>,
        [MEMPOOL_AMOUNT_KEY]: (
          <div>
            {isNonStandard ? (
              <Tooltip title={parse(translate('pages.movement.shieldedTransactionInfo'))}>
                <span>{parse(translate('common.unknown'))}</span>
              </Tooltip>
            ) : (
              formatNumber(totalAmount, { decimalsLength: 2 })
            )}
          </div>
        ),
        [MEMPOOL_SIZE_KEY]: (
          <div className="inline-block">
            {formatNumber(size / 1024, { decimalsLength: 2 })} {translate('pages.movement.kb')}
          </div>
        ),
        [MEMPOOL_FEE_KEY]: <div className="inline-block">{fee}</div>,
        [MEMPOOL_TICKET_QUANTITY_KEY]: (
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
        [MEMPOOL_TIMESTAMP_KEY]: (
          <div className="inline-block">
            <TimeAgo date={timestamp * 1000} live={false} />
          </div>
        ),
      };
    },
  );
