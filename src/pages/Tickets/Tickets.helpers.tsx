import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

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
  TIMESTAMP_KEY,
  PASTEL_ID_KEY,
  VERSION_KEY,
  TYPE_KEY,
  ACTIVATION_TXID_KEY,
  COLLECTION_NAME,
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
    case 'collection-reg':
      return translate('pages.tickets.ticketsTitle.nftCollectionReg');
    case 'collection-act':
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{translate('pages.tickets.txID')}</Box>
              <Box className="bold">
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                  value={formatAddress(transactionHash, 5, -5)}
                  title={transactionHash}
                  className="address-link"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{translate('pages.tickets.status')}</Box>
              <Box className="bold">
                <Tooltip
                  arrow
                  title={
                    activation_ticket
                      ? translate('pages.tickets.activated')
                      : translate('pages.tickets.notYetActivated')
                  }
                >
                  <Box className="ticket-status">
                    <TicketsStyles.ActionRegistrationTicketStatus
                      className={`space-nowrap action-ticket-status ${
                        activation_ticket ? 'active' : ''
                      }`}
                    >
                      {activation_ticket
                        ? translate('pages.tickets.activated')
                        : translate('pages.tickets.notYetActivated')}
                    </TicketsStyles.ActionRegistrationTicketStatus>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{translate('pages.tickets.cascadeOutput')}</Box>
              <Box className="bold">
                {activation_ticket ? (
                  <>
                    <RouterLink
                      route={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}
                      value={translate('pages.tickets.senseDetail')}
                      title={transactionHash}
                      className="address-link"
                    />
                  </>
                ) : (
                  translate('common.na')
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{translate('pages.tickets.activationTXID')}</Box>
              <Box className="bold">
                {activation_txId ? (
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
                    value={activation_txId ? formatAddress(activation_txId, 5, -5) : ''}
                    title={activation_txId}
                    className="address-link"
                  />
                ) : (
                  translate('common.na')
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{translate('pages.tickets.fee')}</Box>
              <Box className="bold">
                {formatNumber(fee)} {getCurrencyName()}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{translate('pages.tickets.timestamp')}</Box>
              <Box className="bold">
                {timestamp ? formatFullDate(timestamp, { dayName: false }) : '--'}
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    };
  });

export const transformSenseData = (sense: TicketsList[]) =>
  sense.map(
    ({
      transactionHash,
      activation_ticket,
      timestamp,
      imageHash,
      activation_txId,
      collectionName,
      dupeDetectionSystemVersion,
      fee,
    }) => {
      return {
        id: transactionHash,
        [TXID_KEY]: (
          <>
            <Grid container spacing={3} className="sense-col">
              <Grid item xs={12} sm={6} md={3}>
                <Box className="title">{translate('pages.tickets.txID')}</Box>
                <Box className="bold">
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                    value={formatAddress(transactionHash, 5, -5)}
                    title={transactionHash}
                    className="address-link"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="title">{translate('pages.tickets.status')}</Box>
                <Box className="bold">
                  <Tooltip
                    arrow
                    title={
                      activation_ticket
                        ? translate('pages.tickets.activated')
                        : translate('pages.tickets.notYetActivated')
                    }
                  >
                    <Box className="ticket-status">
                      <TicketsStyles.ActionRegistrationTicketStatus
                        className={`space-nowrap action-ticket-status ${
                          activation_ticket ? 'active' : ''
                        }`}
                      >
                        {activation_ticket
                          ? translate('pages.tickets.activated')
                          : translate('pages.tickets.notYetActivated')}
                      </TicketsStyles.ActionRegistrationTicketStatus>
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="title">{translate('pages.tickets.collectionName')}</Box>
                <Box className="bold">
                  {collectionName ? (
                    <RouterLink
                      route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${collectionName}`}
                      value={collectionName}
                      title={collectionName}
                      className="address-link nowrap inline-block"
                    />
                  ) : (
                    translate('common.na')
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} className="sense-output">
                <Box className="title">{translate('pages.tickets.senseOutput')}</Box>
                <Box className="bold">
                  {activation_ticket ? (
                    <>
                      <span>
                        {translate('pages.tickets.version')}: {dupeDetectionSystemVersion}
                      </span>{' '}
                      -{' '}
                      <RouterLink
                        route={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${imageHash}`}
                        value={translate('pages.tickets.senseDetail')}
                        title={imageHash}
                        className="address-link nowrap"
                      />
                    </>
                  ) : (
                    translate('common.na')
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="title">{translate('pages.tickets.activationTXID')}</Box>
                <Box className="bold">
                  {activation_txId ? (
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
                      value={activation_txId ? formatAddress(activation_txId, 5, -5) : ''}
                      title={activation_txId}
                      className="address-link"
                    />
                  ) : (
                    translate('common.na')
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="title">{translate('pages.tickets.fee')}</Box>
                <Box className="bold">
                  {formatNumber(fee)} {getCurrencyName()}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} className="hidden-sm">
                &nbsp;
              </Grid>
              <Grid item xs={12} sm={6} md={3} className="sense-output">
                <Box className="title">{translate('pages.tickets.timestamp')}</Box>
                <Box className="bold">
                  {timestamp ? formatFullDate(timestamp, { dayName: false }) : '--'}
                </Box>
              </Grid>
            </Grid>
          </>
        ),
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
            value={formatAddress(transactionHash, 5, -5)}
            title={transactionHash}
            className="address-link"
          />
        </>
      ),
      [PASTEL_ID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.PASTEL_ID_DETAILS}/${pastelID}`}
            value={formatAddress(pastelID, 5, -5)}
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
            value={formatAddress(transactionHash, 5, -5)}
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
  data.map(({ transactionHash, timestamp, activation_ticket, activation_txId, collectionName }) => {
    return {
      id: transactionHash,
      [TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
            value={formatAddress(transactionHash, 5, -5)}
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
      [COLLECTION_NAME]: (
        <>
          {collectionName ? (
            <RouterLink
              route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${collectionName}`}
              value={collectionName}
              title={collectionName}
              className="address-link nowrap inline-block"
            />
          ) : (
            translate('common.na')
          )}
        </>
      ),
      [ACTIVATION_TXID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
            value={activation_txId ? formatAddress(activation_txId, 5, -5) : ''}
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
    link: `${ROUTES.TICKETS_TYPE}/sense`,
  },
  {
    id: 'cascadeTickets',
    name: translate('pages.tickets.cascadeTickets'),
    link: `${ROUTES.TICKETS_TYPE}/cascade`,
  },
  {
    id: 'pastelIDAndUsernameTickets',
    name: translate('pages.tickets.pastelIDAndUsernameTickets'),
    link: `${ROUTES.TICKETS_TYPE}/pastelid-usename`,
  },
  {
    id: 'pastelNFTTickets',
    name: translate('pages.tickets.pastelNFTTickets'),
    link: `${ROUTES.TICKETS_TYPE}/pastel-nft`,
  },
  {
    id: 'offerTicketsAndTransferTickets',
    name: translate('pages.tickets.offerTicketsAndTransferTickets'),
    link: `${ROUTES.TICKETS_TYPE}/offer-transfer`,
  },
  {
    id: 'miscOtherTicketTypes',
    name: translate('pages.tickets.miscOtherTicketTypes'),
    link: `${ROUTES.TICKETS_TYPE}/other`,
  },
];

type TFields = {
  [key: string]: number;
};

type TLoadingFields = {
  [key: string]: boolean | undefined;
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

export const isLoading = (field: string, fields: TLoadingFields) => {
  return fields[field];
};
