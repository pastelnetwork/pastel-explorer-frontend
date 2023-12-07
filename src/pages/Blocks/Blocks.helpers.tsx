import RouterLink from '@components/RouterLink/RouterLink';
import Hourglass from '@components/Hourglass/Hourglass';

import { HIDE_TO_BLOCK } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';
import { formattedDate } from '@utils/helpers/date/date';
import { IBlock } from '@utils/types/IBlocks';
import { formatAddress } from '@utils/helpers/format';
import { getTicketsTypeList } from '@pages/Movement/Movement.helpers';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';

import { ReactComponent as BoxIcon } from '@assets/icons/box.svg';

import {
  BLOCK_ID_KEY,
  BLOCK_HASH,
  TRANSACTIONS_QTY_KEY,
  TOTAL_TICKETS,
  TIMESTAMP_BLOCKS_KEY,
  BLOCK_SIZE,
} from './Blocks.columns';
import * as Styles from './Blocks.styles';

export const DATA_FETCH_LIMIT = 40;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const transformTableData = (transactions: Array<IBlock>, isMobile: boolean) =>
  transactions.map(
    ({ id, timestamp, transactionCount, height, ticketsList, size, totalTickets }) => {
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
<<<<<<< HEAD
              <>
                {totalTickets === -1 ? (
                  <Styles.HourglassWrapper>
                    <Hourglass />
                  </Styles.HourglassWrapper>
                ) : (
                  <>
                    {ticketsTypeList.total > 0 ? (
                      <RouterLink
                        className="hash-link"
                        route={`${ROUTES.BLOCK_DETAILS}/${id}`}
                        value={ticketsTypeList.total}
                        title={ticketsTypeList.text.join(', <br />')}
                        isUseTooltip
                      />
                    ) : (
                      <>0</>
                    )}
                  </>
=======
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
>>>>>>> 5463ae6f02d562ccad09387d2b81c8d0ff3a50c4
                )}
              </div>
            )}
          </div>
        ),
        [BLOCK_SIZE]: (
          <div className="inline-block">{formatNumber(size / 1024, { decimalsLength: 2 })}</div>
        ),
        [TIMESTAMP_BLOCKS_KEY]: (
          <div className="timestamp">{formattedDate(timestamp, { dayName: false })}</div>
        ),
      };
    },
  );
