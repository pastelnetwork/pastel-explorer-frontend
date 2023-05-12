import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/styles/makeStyles';

import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import {
  ITicket,
  IPastelIDRegistrationTicket,
  IUserNameChangeTicket,
  INftRegistrationTicket,
  INftActivationTicket,
  INftCollectionRegistrationTicket,
  INftCollectionActivationTicket,
  INftRoyaltyTicket,
  IActionRegistrationTicket,
  IActionTicket,
  IActionActivationTicket,
  IOfferTicket,
  IAcceptTicket,
  ITransferTicket,
  TTicketType,
  TSenseRequests,
} from '@utils/types/ITransactions';
import {
  PastelIDRegistrationTicket,
  UserNameChangeTicket,
  NFTRegistrationTicket,
  NFTActivationTicket,
  NFTCollectionRegistrationTicket,
  NFTCollectionActivationTicket,
  NFTRoyaltyTicket,
  ActionActivationTicket,
  ActionRegistrationTicket,
  OfferTicket,
  AcceptTicket,
  TransferTicket,
  getTicketTitle,
} from '@components/Ticket';
import { Dropdown } from '@components/Dropdown/Dropdown';
import { getBaseURL } from '@utils/constants/statistics';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import * as TableStyles from '@components/Table/Table.styles';
import * as BlockDetailsStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as Styles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';
import * as FilterStyles from '@components/InfinityTable/InfinityTable.styles';
import DateTimePicker from '@components/DateTimePicker/DateTimePicker';
import { blocksPeriodFilters } from '@utils/constants/filter';
import { TAppTheme } from '@theme/index';
import { translate } from '@utils/helpers/i18n';

import { TICKET_TYPE_OPTIONS, TICKET_STATUS_OPTIONS } from './TicketsType.helpers';

const useStyles = makeStyles((theme: TAppTheme) => {
  return {
    listFilter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderRadius: `${theme.spacing(1)}px`,
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%',
      },
    },
    rootMenuItem: {
      display: 'block',
      backgroundColor: 'inherit',
      padding: 0,
      minHeight: 'auto',
    },
    rootMenuItemButton: {
      width: '100%',
      textAlign: 'left',
      backgroundColor: 'inherit !important',
      padding: '2px 10px',
    },
  };
});

interface ITicketsList {
  data: ITicket[];
  ticketType: string;
  onTicketTypeChange: (_value: string) => void;
  totalTickets: number;
  isLoading?: boolean;
  senses?: TSenseRequests[];
  handleSelectTime: (_event: MouseEvent<HTMLButtonElement>) => void;
  selectedTime: string;
  onStatusChange: (_value: string) => void;
  selectedStatus: string;
  onDateRangeApply?: (_startDate: number, _endDate: number | null) => void;
  defaultDateRange?: {
    startDate: number;
    endDate: number | null;
  };
}

const TicketsList: React.FC<ITicketsList> = ({
  data,
  ticketType,
  onTicketTypeChange,
  totalTickets,
  isLoading = false,
  senses,
  handleSelectTime,
  selectedTime,
  onStatusChange,
  selectedStatus,
  onDateRangeApply,
  defaultDateRange,
}) => {
  const classes = useStyles();

  const renderSenseInfo = (ticket: IActionRegistrationTicket, transactionHash: string) => {
    if (ticket.action_type !== 'sense' || !ticket.activation_ticket) {
      return null;
    }
    const sense = senses?.find(s => s.transactionHash === transactionHash);
    if (!sense) {
      return null;
    }

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {translate('pages.ticketsType.senseOutputDetails')}:
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              <Link
                to={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${sense.imageFileHash}`}
              >
                <img
                  src={`${getBaseURL()}/static/senses/${
                    sense.imageFileHash
                  }-${transactionHash}.png`}
                  alt={sense.imageFileHash}
                  className="sense-img"
                />
              </Link>
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {translate('pages.ticketsType.imageHash')}:
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              <RouterLink
                route={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${sense.imageFileHash}`}
                value={sense.imageFileHash}
                title={sense.imageFileHash}
                className="address-link"
              />
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {translate('pages.ticketsType.senseVersion')}:
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              {sense.imageFileHash.indexOf('nosense') === -1
                ? sense.dupeDetectionSystemVersion
                : ''}
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderContent = (
    type: string,
    ticket:
      | IPastelIDRegistrationTicket
      | IUserNameChangeTicket
      | INftRegistrationTicket
      | INftActivationTicket
      | INftCollectionRegistrationTicket
      | INftCollectionActivationTicket
      | INftRoyaltyTicket
      | IActionRegistrationTicket
      | IActionTicket
      | IActionActivationTicket
      | IOfferTicket
      | IAcceptTicket
      | ITransferTicket,
    transactionHash: string,
  ) => {
    switch (type) {
      case 'username-change':
        return <UserNameChangeTicket ticket={ticket as IUserNameChangeTicket} />;
      case 'nft-reg':
        return (
          <NFTRegistrationTicket
            ticket={ticket as INftRegistrationTicket}
            transactionHash={transactionHash}
          />
        );
      case 'nft-act':
        return <NFTActivationTicket ticket={ticket as INftActivationTicket} />;
      case 'collection-reg':
        return (
          <NFTCollectionRegistrationTicket ticket={ticket as INftCollectionRegistrationTicket} />
        );
      case 'collection-act':
        return <NFTCollectionActivationTicket ticket={ticket as INftCollectionActivationTicket} />;
      case 'nft-royalty':
        return <NFTRoyaltyTicket ticket={ticket as INftRoyaltyTicket} />;
      case 'action-reg':
        return (
          <ActionRegistrationTicket
            ticket={ticket as IActionRegistrationTicket}
            senseInfo={renderSenseInfo(ticket as IActionRegistrationTicket, transactionHash)}
            showActivationTicket
            transactionHash={transactionHash}
          />
        );
      case 'action-act':
        return <ActionActivationTicket ticket={ticket as IActionActivationTicket} />;
      case 'offer':
        return <OfferTicket ticket={ticket as IOfferTicket} />;
      case 'accept':
        return <AcceptTicket ticket={ticket as IAcceptTicket} />;
      case 'transfer':
        return <TransferTicket ticket={ticket as ITransferTicket} />;
      default:
        return <PastelIDRegistrationTicket ticket={ticket as IPastelIDRegistrationTicket} />;
    }
  };

  const handleTicketTypeChange = (
    event: React.ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      onTicketTypeChange(event.target.value as string);
    }
  };

  const getTitle = () => {
    if (ticketType === 'pastelid-usename') {
      return translate('pages.ticketsType.pastelIDAndUsernameTickets');
    }
    if (ticketType === 'offer-transfer') {
      return translate('pages.ticketsType.offerTicketsAndTransferTickets');
    }
    if (ticketType === 'pastel-nft') {
      return translate('pages.ticketsType.pastelNFTTickets');
    }
    if (ticketType === 'other') {
      return translate('pages.ticketsType.otherTickets');
    }
    const ticket = TICKET_TYPE_OPTIONS.find(t => t.value === ticketType);
    return translate(ticket?.name || '') || translate('pages.ticketsType.otherTickets');
  };

  const getDropdownOptions = () => {
    const result = [];
    if (ticketType === 'other') {
      result.push({
        name: translate('pages.ticketsType.otherTickets'),
        value: 'other',
      });
    } else if (ticketType === 'pastelid-usename') {
      result.push({
        name: translate('pages.ticketsType.pastelIDAndUsernameTickets'),
        value: 'pastelid-usename',
      });
    } else if (ticketType === 'pastel-nft') {
      result.push({
        name: translate('pages.ticketsType.pastelNFTTickets'),
        value: 'pastel-nft',
      });
    } else if (ticketType === 'offer-transfer') {
      result.push({
        name: translate('pages.ticketsType.offerTicketsAndTransferTickets'),
        value: 'offer-transfer',
      });
    }

    return [
      ...result,
      ...TICKET_TYPE_OPTIONS.map(item => ({ ...item, name: translate(item.name) })),
    ];
  };

  const handleStatusChange = (
    event: React.ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      onStatusChange(event.target.value as string);
    }
  };

  const getStatusOptions = () => {
    return TICKET_STATUS_OPTIONS.map(option => ({
      ...option,
      name: translate(option.name),
    }));
  };

  return (
    <BlockDetailsStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-12 min-h-60vh">
        <Styles.BlockWrapper className="ticket-title-wrapper">
          <Styles.BlockTitle>
            {getTitle()}{' '}
            <Styles.SubTitle>
              (
              {totalTickets > 1
                ? translate('pages.ticketsType.totalTickets', { total: formatNumber(totalTickets) })
                : translate('pages.ticketsType.totalTicket', { total: formatNumber(totalTickets) })}
              )
            </Styles.SubTitle>
          </Styles.BlockTitle>
          <Styles.FilterBlock>
            <FilterStyles.FilterWrapper>
              <Dropdown
                value={ticketType}
                onChange={handleTicketTypeChange}
                options={getDropdownOptions()}
                label={translate('pages.ticketsType.ticketType')}
                classNameWrapper="dropdown-ticket-type"
              />
              {['sense', 'cascade'].includes(ticketType) ? (
                <Dropdown
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  options={getStatusOptions()}
                  label={translate('pages.ticketsType.status')}
                  classNameWrapper="dropdown-status"
                />
              ) : null}
              <div className={`${classes.listFilter} list-filter`}>
                {blocksPeriodFilters.map(({ name, value }) => (
                  <MenuItem
                    key={value}
                    classes={{
                      root: `filter-item ${classes.rootMenuItem} ${
                        selectedTime === value ? 'filter-item-active' : ''
                      }`,
                    }}
                  >
                    <Button
                      classes={{ root: classes.rootMenuItemButton }}
                      type="button"
                      value={value}
                      onClick={handleSelectTime}
                    >
                      {translate(name)}
                    </Button>
                  </MenuItem>
                ))}
                <MenuItem
                  classes={{
                    root: `filter-item date-picker ${classes.rootMenuItem} ${
                      selectedTime === 'custom' ? 'filter-item-active' : ''
                    }`,
                  }}
                >
                  <DateTimePicker onApply={onDateRangeApply} defaultDateRange={defaultDateRange} />
                </MenuItem>
              </div>
            </FilterStyles.FilterWrapper>
          </Styles.FilterBlock>
        </Styles.BlockWrapper>
        <Box className="custom-table tickets-table">
          {data.map(ticket => (
            <BlockDetailsStyles.GridStyle
              item
              key={`${ticket.id}-${ticket.transactionHash}`}
              className="table__row"
            >
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <TicketStyles.TicketTitle>
                    {translate('pages.ticketsType.txId')}:
                  </TicketStyles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TicketStyles.TicketContent>
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.transactionHash}`}
                      value={ticket.transactionHash}
                      title={ticket.transactionHash}
                      className="address-link"
                    />
                  </TicketStyles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <TicketStyles.TicketTitle>
                    {translate('pages.ticketsType.type')}:
                  </TicketStyles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TicketStyles.TicketContent>
                    {getTicketTitle(ticket.type as TTicketType)}
                  </TicketStyles.TicketContent>
                </Grid>
              </Grid>
              {renderContent(ticket.type, ticket.data.ticket, ticket.transactionHash)}
            </BlockDetailsStyles.GridStyle>
          ))}
          {!data.length && !isLoading ? (
            <BlockDetailsStyles.GridStyle className="table__row">
              <TicketStyles.TicketTitle>{translate('common.noData')}</TicketStyles.TicketTitle>
            </BlockDetailsStyles.GridStyle>
          ) : null}
        </Box>
      </TableStyles.BlockWrapper>
    </BlockDetailsStyles.GridStyle>
  );
};

export default TicketsList;
