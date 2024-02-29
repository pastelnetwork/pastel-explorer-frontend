import { differenceInMinutes } from 'date-fns';

import RouterLink from '@components/RouterLink/RouterLink';
import Hourglass from '@components/Hourglass/Hourglass';

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
} from './Blocks.columns';
import * as Styles from './Blocks.styles';

export const DATA_FETCH_LIMIT = 40;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

const getDifferenceInMinutes = (startDate: number, endDate: number, variant = '') => {
  const diff = differenceInMinutes(endDate, startDate);
  if (variant === 'text') {
    return `${
      diff < 10 ? `0${diff}` : diff
    } translate(diff <= 1 ? 'pages.blocks.minute' : 'pages.blocks.minutes')}`;
  }

  return (
    <>
      {diff < 10 ? `0${diff}` : diff}{' '}
      {translate(diff <= 1 ? 'pages.blocks.minute' : 'pages.blocks.minutes')}
    </>
  );
};

export const transformTableData = (transactions: Array<IBlock>, isMobile: boolean) =>
  transactions.map(
    ({ id, timestamp, transactionCount, height, ticketsList, size, totalTickets }, index) => {
      const ticketsTypeList = getTicketsTypeList(ticketsList || '');
      return {
        id,
        [BLOCK_ID_KEY]: (
          <Styles.BlockHeight>
            <BoxIcon />{' '}
            <RouterLink
              className="hash-link"
              route={`${ROUTES.BLOCK_DETAILS}/${id}`}
              value={height}
              title={height.toString()}
            />
          </Styles.BlockHeight>
        ),
        [BLOCK_HASH]: (
          <RouterLink
            className="hash-link"
            route={`${ROUTES.BLOCK_DETAILS}/${id}`}
            value={isMobile ? formatAddress(id) : id}
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
            {transactions[index + 1]?.timestamp ? (
              <>
                {getDifferenceInMinutes(
                  Number(transactions[index + 1].timestamp) * 1000,
                  Number(timestamp) * 1000,
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
  return blocks.map(
    ({ id, timestamp, transactionCount, height, ticketsList, size, totalTickets }, index) => ({
      [BLOCK_ID_KEY]: height,
      [BLOCK_HASH]: id,
      [TRANSACTIONS_QTY_KEY]: transactionCount,
      [TOTAL_TICKETS]: getTotalTicket(height, totalTickets, ticketsList),
      [BLOCK_SIZE]: formatNumber(size / 1024, { decimalsLength: 2 }),
      [TIMESTAMP_BETWEEN_BLOCKS_KEY]: blocks[index + 1]?.timestamp
        ? getDifferenceInMinutes(
            Number(blocks[index + 1].timestamp) * 1000,
            Number(timestamp) * 1000,
            'text',
          )
        : `0 ${translate('pages.blocks.minutes')}`,
      [TIMESTAMP_BLOCKS_KEY]: formattedDate(timestamp, { dayName: false }),
    }),
  );
};
