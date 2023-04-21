import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';

import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';
import { formatAddress } from '@utils/helpers/format';
import { formatFullDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { TicketsList, TTicketType } from '@utils/types/ITransactions';
import { TAppTheme } from '@theme/index';
import * as TicketsStyles from '@components/Ticket/Ticket.styles';
import { translate } from '@utils/helpers/i18n';

import {
  TXID_KEY,
  STATUS_KEY,
  FEE_KEY,
  TIMESTAMP_KEY,
  PASTEL_ID_KEY,
  VERSION_KEY,
  TYPE_KEY,
  ACTIVATION_TXID_KEY,
} from './Tickets.columns';

const getTicketTitle = (type: TTicketType) => {
  switch (type) {
    case 'pastelid':
      return translate('pages.tickets.ticketsTitle.pastelid');
    case 'username-change':
      return translate('pages.tickets.ticketsTitle.usernameChange');
    case 'nft-reg':
      return translate('pages.tickets.ticketsTitle.nftReg');
    case 'nft-act':
      return translate('pages.tickets.ticketsTitle.nftAct');
    case 'nft-collection-reg':
      return translate('pages.tickets.ticketsTitle.nftCollectionReg');
    case 'nft-collection-act':
      return translate('pages.tickets.ticketsTitle.nftCollectionAct');
    case 'nft-royalty':
      return translate('pages.tickets.ticketsTitle.nftRoyalty');
    case 'action-reg':
      return translate('pages.tickets.ticketsTitle.actionReg');
    case 'action-act':
      return translate('pages.tickets.ticketsTitle.actionAct');
    case 'offer':
      return translate('pages.tickets.ticketsTitle.offer');
    case 'accept':
      return translate('pages.tickets.ticketsTitle.accept');
    case 'transfer':
      return translate('pages.tickets.ticketsTitle.transfer');
    default:
      return '';
  }
};

export const DATA_LIMIT = 15;

export const StyledTableCell = withStyles((theme: TAppTheme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme: TAppTheme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const transformCascadeData = (cascade: TicketsList[]) =>
  cascade.map(({ transactionHash, activation_ticket, fee, timestamp, activation_txId }) => {
    return {
      id: transactionHash,
      [TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
            value={formatAddress(transactionHash, 3, -3)}
            title={transactionHash}
            className="address-link"
          />
        </>
      ),
      [STATUS_KEY]: (
        <>
          <Tooltip
            arrow
            title={
              activation_ticket
                ? translate('pages.tickets.activated')
                : translate('pages.tickets.notYetActivated')
            }
          >
            <TicketsStyles.ActionRegistrationTicketStatus
              className={`space-nowrap action-ticket-status ${activation_ticket ? 'active' : ''}`}
            >
              {activation_ticket ? <DoneIcon /> : <CloseIcon />}
            </TicketsStyles.ActionRegistrationTicketStatus>
          </Tooltip>
        </>
      ),
      [FEE_KEY]: (
        <Box className="nowrap">
          {formatNumber(fee)} {getCurrencyName()}
        </Box>
      ),
      [ACTIVATION_TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
            value={activation_txId ? formatAddress(activation_txId, 3, -3) : ''}
            title={activation_txId}
            className="address-link"
          />
        </>
      ),
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const transformSenseData = (sense: TicketsList[]) =>
  sense.map(
    ({ transactionHash, activation_ticket, fee, timestamp, imageHash, activation_txId }) => {
      return {
        id: transactionHash,
        [TXID_KEY]: (
          <>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
              value={formatAddress(transactionHash, 3, -3)}
              title={transactionHash}
              className="address-link"
            />
          </>
        ),
        [STATUS_KEY]: (
          <div className="sense-status">
            <Tooltip
              arrow
              title={
                activation_ticket
                  ? translate('pages.tickets.activated')
                  : translate('pages.tickets.notYetActivated')
              }
            >
              <TicketsStyles.ActionRegistrationTicketStatus
                className={`space-nowrap action-ticket-status ${activation_ticket ? 'active' : ''}`}
              >
                {activation_ticket ? <DoneIcon /> : <CloseIcon />}
              </TicketsStyles.ActionRegistrationTicketStatus>
            </Tooltip>
            {activation_ticket ? (
              <span className="view-detail nowrap">
                (
                <RouterLink
                  route={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${imageHash}`}
                  value={translate('pages.tickets.senseDetail')}
                  title={imageHash}
                  className="address-link"
                />
                )
              </span>
            ) : null}
          </div>
        ),
        [FEE_KEY]: (
          <Box className="nowrap">
            {formatNumber(fee)} {getCurrencyName()}
          </Box>
        ),
        [ACTIVATION_TXID_KEY]: (
          <>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
              value={activation_txId ? formatAddress(activation_txId, 3, -3) : ''}
              title={activation_txId}
              className="address-link"
            />
          </>
        ),
        [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
      };
    },
  );

export const transformPastelIdData = (data: TicketsList[]) =>
  data.map(({ transactionHash, pastelID, timestamp, type }) => {
    return {
      id: transactionHash,
      [TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
            value={formatAddress(transactionHash, 6, -3)}
            title={transactionHash}
            className="address-link"
          />
        </>
      ),
      [PASTEL_ID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.PASTEL_ID_DETAILS}/${pastelID}`}
            value={formatAddress(pastelID, 6, -3)}
            title={pastelID}
            className="address-link"
          />
        </>
      ),
      [TYPE_KEY]: getTicketTitle(type as TTicketType),
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const transformOtherData = (data: TicketsList[]) =>
  data.map(({ transactionHash, type, timestamp, version }) => {
    return {
      id: transactionHash,
      [TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
            value={formatAddress(transactionHash, 8, -3)}
            title={transactionHash}
            className="address-link"
          />
        </>
      ),
      [TYPE_KEY]: getTicketTitle(type as TTicketType),
      [VERSION_KEY]: <>{version}</>,
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const transformPastelNftTicketsData = (data: TicketsList[]) =>
  data.map(({ transactionHash, type, timestamp, activation_ticket, activation_txId }) => {
    return {
      id: transactionHash,
      [TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
            value={formatAddress(transactionHash, 3, -3)}
            title={transactionHash}
            className="address-link"
          />
        </>
      ),
      [STATUS_KEY]: (
        <div className="sense-status">
          <Tooltip
            arrow
            title={
              activation_ticket
                ? translate('pages.tickets.activated')
                : translate('pages.tickets.notYetActivated')
            }
          >
            <TicketsStyles.ActionRegistrationTicketStatus
              className={`space-nowrap action-ticket-status ${activation_ticket ? 'active' : ''}`}
            >
              {activation_ticket ? <DoneIcon /> : <CloseIcon />}
            </TicketsStyles.ActionRegistrationTicketStatus>
          </Tooltip>
        </div>
      ),
      [TYPE_KEY]: getTicketTitle(type as TTicketType),
      [ACTIVATION_TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
            value={activation_txId ? formatAddress(activation_txId, 3, -3) : ''}
            title={activation_txId}
            className="address-link"
          />
        </>
      ),
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const ticketsSummary = [
  {
    id: 'senseTickets',
    name: translate('pages.tickets.senseTickets'),
  },
  {
    id: 'cascadeTickets',
    name: translate('pages.tickets.cascadeTickets'),
  },
  {
    id: 'pastelIDAndUsernameTickets',
    name: translate('pages.tickets.pastelIDAndUsernameTickets'),
  },
  {
    id: 'pastelNFTTickets',
    name: translate('pages.tickets.pastelNFTTickets'),
  },
  {
    id: 'offerTicketsAndTransferTickets',
    name: translate('pages.tickets.offerTicketsAndTransferTickets'),
  },
  {
    id: 'miscOtherTicketTypes',
    name: translate('pages.tickets.miscOtherTicketTypes'),
  },
];

type TFields = {
  [key: string]: number;
};

export type TTicketResponse = {
  data: TicketsList[];
  total: number;
  isLoading: boolean;
  size: number;
  setSize: (_size: number | ((_size: number) => number)) => void;
};

export const getTotalTickets = (field: string, fields: TFields) => {
  const total = fields[field];
  return total > 0
    ? translate('pages.tickets.ticketsTitle.totalTickets', { total: formatNumber(total) })
    : translate('pages.tickets.ticketsTitle.totalTicket', { total: formatNumber(total) });
};
