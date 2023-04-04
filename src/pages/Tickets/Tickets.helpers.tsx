import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';
import { formatAddress } from '@utils/helpers/format';
import { formatFullDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { TicketsList, TTicketType } from '@utils/types/ITransactions';
import { TAppTheme } from '@theme/index';
import * as TicketsStyles from '@components/Ticket/Ticket.styles';
import { getTicketTitle } from '@components/Ticket';
import { translate } from '@utils/helpers/i18n';

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

const TXID_KEY = 'transactionHash';
const STATUS_KEY = 'activation_ticket';
const FEE_KEY = 'fee';
const TIMESTAMP_KEY = 'timestamp';
const PASTEL_ID_KEY = 'pastelID';
const ID_TYPE_KEY = 'id_type';
const VERSION_KEY = 'version';
const TYPE_KEY = 'type';

export const cascadeColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'pages.tickets.status',
    dataKey: STATUS_KEY,
    disableSort: true,
    className: 'status',
    dataTitle: 'pages.tickets.status',
  },
  {
    width: 60,
    flexGrow: 1,
    label: 'pages.tickets.fee',
    dataKey: FEE_KEY,
    disableSort: true,
    className: 'fee',
    dataTitle: 'pages.tickets.fee',
  },
  {
    width: 160,
    flexGrow: 1,
    label: 'pages.tickets.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: true,
    className: 'timestamp',
    dataTitle: 'pages.tickets.timestamp',
  },
];

export const transformCascadeData = (cascade: TicketsList[]) =>
  cascade.map(({ transactionHash, activation_ticket, fee, timestamp }) => {
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
      [STATUS_KEY]: (
        <>
          <TicketsStyles.ActionRegistrationTicketStatus
            className={`space-nowrap ${activation_ticket ? 'active' : ''}`}
          >
            {activation_ticket
              ? translate('pages.tickets.activated')
              : translate('pages.tickets.notYetActivated')}
          </TicketsStyles.ActionRegistrationTicketStatus>
        </>
      ),
      [FEE_KEY]: (
        <>
          {formatNumber(fee)} {getCurrencyName()}
        </>
      ),
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const senseColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
  {
    width: 155,
    flexGrow: 1,
    label: 'pages.tickets.status',
    dataKey: STATUS_KEY,
    disableSort: true,
    className: 'status',
    dataTitle: 'pages.tickets.status',
  },
  {
    width: 50,
    flexGrow: 1,
    label: 'pages.tickets.fee',
    dataKey: FEE_KEY,
    disableSort: true,
    className: 'fee',
    dataTitle: 'pages.tickets.fee',
  },
  {
    width: 160,
    flexGrow: 1,
    label: 'pages.tickets.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: true,
    className: 'timestamp',
    dataTitle: 'pages.tickets.timestamp',
  },
];

export const transformSenseData = (sense: TicketsList[]) =>
  sense.map(({ transactionHash, activation_ticket, fee, timestamp, imageHash }) => {
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
      [STATUS_KEY]: (
        <div className="sense-status">
          <TicketsStyles.ActionRegistrationTicketStatus
            className={`space-nowrap ${activation_ticket ? 'active' : ''}`}
          >
            {activation_ticket
              ? translate('pages.tickets.activated')
              : translate('pages.tickets.notYetActivated')}
          </TicketsStyles.ActionRegistrationTicketStatus>
          {activation_ticket ? (
            <span className="view-detail">
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
        <>
          {formatNumber(fee)} {getCurrencyName()}
        </>
      ),
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const pastelIdColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.pastelID',
    dataKey: PASTEL_ID_KEY,
    disableSort: true,
    className: 'pastelID',
    dataTitle: 'pages.tickets.pastelID',
  },
  {
    width: 35,
    flexGrow: 1,
    label: 'pages.tickets.idType',
    dataKey: ID_TYPE_KEY,
    disableSort: true,
    className: 'idType',
    dataTitle: 'pages.tickets.idType',
  },
  {
    width: 160,
    flexGrow: 1,
    label: 'pages.tickets.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: true,
    className: 'timestamp',
    dataTitle: 'pages.tickets.timestamp',
  },
];

export const transformPastelIdData = (data: TicketsList[]) =>
  data.map(({ transactionHash, pastelID, timestamp, id_type }) => {
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
      [PASTEL_ID_KEY]: (
        <>
          <RouterLink
            route={`${ROUTES.PASTEL_ID_DETAILS}/${pastelID}`}
            value={formatAddress(pastelID, 8, -3)}
            title={pastelID}
            className="address-link"
          />
        </>
      ),
      [ID_TYPE_KEY]: <>{id_type}</>,
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const otherColumns = [
  {
    width: 80,
    flexGrow: 1,
    label: 'pages.tickets.txID',
    dataKey: TXID_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.tickets.txID',
  },
  {
    width: 140,
    flexGrow: 1,
    label: 'pages.tickets.type',
    dataKey: TYPE_KEY,
    disableSort: true,
    className: 'type',
    dataTitle: 'pages.tickets.type',
  },
  {
    width: 10,
    flexGrow: 1,
    label: 'pages.tickets.version',
    dataKey: VERSION_KEY,
    disableSort: true,
    className: 'version',
    dataTitle: 'pages.tickets.version',
  },
  {
    width: 140,
    flexGrow: 1,
    label: 'pages.tickets.timestamp',
    dataKey: TIMESTAMP_KEY,
    disableSort: true,
    className: 'timestamp',
    dataTitle: 'pages.tickets.timestamp',
  },
];

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
