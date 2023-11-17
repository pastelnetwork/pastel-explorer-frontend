import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/styles/makeStyles';
import { decode } from 'js-base64';
import parse from 'html-react-parser';

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
  ICascadeApiTicket,
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
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import * as TableStyles from '@components/Table/Table.styles';
import * as BlockDetailsStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as Styles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';
import * as FilterStyles from '@components/InfinityTable/InfinityTable.styles';
import DateTimePicker from '@components/DateTimePicker/DateTimePicker';
import { blocksPeriodFilters } from '@utils/constants/filter';
import { TAppTheme } from '@theme/index';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as ascii85 from '@utils/helpers/ascii85';
import { getFileIcon } from '@pages/Details/CascadeDetails/CascadeDetails.helpers';
import CopyButton from '@components/CopyButton/CopyButton';

import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';
import {
  TICKET_TYPE_OPTIONS,
  TICKET_STATUS_OPTIONS,
  TICKET_SORT_OPTIONS,
} from './TicketsType.helpers';

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
  ticketSort: string;
  onTicketTypeChange: (_value: string) => void;
  onTicketSortChange: (_value: string) => void;
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
  ticketSort,
  onTicketSortChange,
}) => {
  const decodeApiTicket = (apiTicket: string) => {
    let result = null;
    try {
      result = JSON.parse(decode(apiTicket)) as ICascadeApiTicket;
    } catch {
      try {
        result = ascii85.decode(apiTicket) as ICascadeApiTicket;
      } catch (error) {
        console.error(error);
      }
    }

    return result;
  };
  const classes = useStyles();

  const renderSenseInfo = (ticket: IActionRegistrationTicket, transactionHash: string) => {
    if (['sense', 'cascade'].indexOf(ticket.action_type) === -1 || !ticket.activation_ticket) {
      return null;
    }
    const sense = senses?.find(s => s.transactionHash === transactionHash);
    if (!sense) {
      const actionTicket = ticket?.action_ticket;
      const parseActionTicket = JSON.parse(decode(actionTicket)) as IActionTicket;
      const apiTicket = decodeApiTicket(parseActionTicket.api_ticket) as ICascadeApiTicket;
      if (!apiTicket.file_type) {
        return null;
      }
      return (
        <>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <TicketStyles.TicketTitle>
                {parse(translate('pages.blockDetails.cascadeFileType'))}
              </TicketStyles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <TicketStyles.TicketContent>
                <Link to={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}>
                  {getFileIcon(apiTicket.file_type)}
                </Link>
              </TicketStyles.TicketContent>
            </Grid>
          </Grid>
        </>
      );
    }

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {parse(translate('pages.ticketsType.senseOutputDetails'))}:
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              {sense.imageFileCdnUrl ? (
                <Link
                  to={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${sense.imageFileHash}`}
                >
                  <img
                    src={
                      sense.imageFileCdnUrl
                        ? `data:image/jpeg;base64,${sense.imageFileCdnUrl}`
                        : noImagePlaceholder
                    }
                    alt={sense.imageFileHash}
                    className="sense-img"
                  />
                </Link>
              ) : (
                parse(translate('pages.tickets.pendingSenseGenerate'))
              )}
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {parse(translate('pages.ticketsType.imageHash'))}:
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
              {parse(translate('pages.ticketsType.senseVersion'))}:
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
      return parse(translate('pages.ticketsType.pastelIDAndUsernameTickets'));
    }
    if (ticketType === 'offer-transfer') {
      return parse(translate('pages.ticketsType.offerTicketsAndTransferTickets'));
    }
    if (ticketType === 'pastel-nft') {
      return parse(translate('pages.ticketsType.pastelNFTTickets'));
    }
    if (ticketType === 'other') {
      return parse(translate('pages.ticketsType.senseAndNFTCollectionTickets'));
    }
    const ticket = TICKET_TYPE_OPTIONS.find(t => t.value === ticketType);
    return (
      parse(translate(ticket?.name || '')) ||
      parse(translate('pages.ticketsType.senseAndNFTCollectionTickets'))
    );
  };

  const getDropdownOptions = () => {
    const result = [];
    if (ticketType === 'other') {
      result.push({
        name: translateDropdown('pages.ticketsType.senseAndNFTCollectionTickets'),
        value: 'other',
      });
    } else if (ticketType === 'pastelid-usename') {
      result.push({
        name: translateDropdown('pages.ticketsType.pastelIDAndUsernameTickets'),
        value: 'pastelid-usename',
      });
    } else if (ticketType === 'pastel-nft') {
      result.push({
        name: translateDropdown('pages.ticketsType.pastelNFTTickets'),
        value: 'pastel-nft',
      });
    } else if (ticketType === 'offer-transfer') {
      result.push({
        name: translateDropdown('pages.ticketsType.offerTicketsAndTransferTickets'),
        value: 'offer-transfer',
      });
    }

    return [
      ...result,
      ...TICKET_TYPE_OPTIONS.map(item => ({ ...item, name: translateDropdown(item.name) })),
    ];
  };

  const handleStatusChange = (
    event: React.ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    onStatusChange(event.target.value as string);
  };

  const handleSortChange = (
    event: React.ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    onTicketSortChange(event.target.value as string);
  };

  const getStatusOptions = () => {
    return TICKET_STATUS_OPTIONS.map(option => ({
      ...option,
      name: translateDropdown(option.name),
    }));
  };

  const getSortOptions = () => {
    return TICKET_SORT_OPTIONS.map(option => ({
      ...option,
      name: translateDropdown(option.name),
    }));
  };

  return (
    <BlockDetailsStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-12 min-h-60vh">
        <Styles.BlockWrapper className="ticket-title-wrapper">
          <Styles.BlockTitle className="ticket-title-section">
            {getTitle()}{' '}
            <Styles.SubTitle className="nowrap">
              (
              {totalTickets > 1
                ? parse(
                    translate('pages.ticketsType.totalTickets', {
                      total: formatNumber(totalTickets),
                    }),
                  )
                : parse(
                    translate('pages.ticketsType.totalTicket', {
                      total: formatNumber(totalTickets),
                    }),
                  )}
              )
            </Styles.SubTitle>
          </Styles.BlockTitle>
          <Styles.FilterBlock>
            <FilterStyles.FilterWrapper className="filter-wrapper">
              <Dropdown
                value={ticketType}
                onChange={handleTicketTypeChange}
                options={getDropdownOptions()}
                label={translateDropdown('pages.ticketsType.ticketType')}
                classNameWrapper="dropdown-ticket-type"
              />
              {['sense', 'cascade'].includes(ticketType) ? (
                <>
                  <Dropdown
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    options={getStatusOptions()}
                    label={translateDropdown('pages.ticketsType.status')}
                    classNameWrapper="dropdown-status"
                  />
                  <Dropdown
                    value={ticketSort}
                    onChange={handleSortChange}
                    options={getSortOptions()}
                    label={translateDropdown('pages.ticketsType.sortingBy')}
                    classNameWrapper="dropdown-sort"
                  />
                </>
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
                      {parse(translate(name))}
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
                    {parse(translate('pages.ticketsType.txId'))}:
                  </TicketStyles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TicketStyles.TicketContent className="nowrap">
                    <CopyButton copyText={ticket.transactionHash} />
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
                    {parse(translate('pages.ticketsType.type'))}:
                  </TicketStyles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TicketStyles.TicketContent>
                    {getTicketTitle(
                      ticket.type as TTicketType,
                      (ticket.data.ticket as INftCollectionRegistrationTicket)?.collection_ticket
                        ?.item_type,
                    )}
                  </TicketStyles.TicketContent>
                </Grid>
              </Grid>
              {renderContent(ticket.type, ticket.data.ticket, ticket.transactionHash)}
            </BlockDetailsStyles.GridStyle>
          ))}
          {!data.length && !isLoading ? (
            <BlockDetailsStyles.GridStyle className="table__row">
              <TicketStyles.TicketTitle>
                {parse(translate('common.noData'))}
              </TicketStyles.TicketTitle>
            </BlockDetailsStyles.GridStyle>
          ) : null}
        </Box>
      </TableStyles.BlockWrapper>
    </BlockDetailsStyles.GridStyle>
  );
};

export default TicketsList;
