import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

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
import Pagination from '@components/Pagination';
import { getBaseURL } from '@utils/constants/statistics';

import * as TableStyles from '@components/Table/Table.styles';
import * as BlockDetailsStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as Styles from './PastelIdDetails.styles';
import { TICKET_TYPE_OPTIONS, TTicketsTypeProps } from './PastelIdDetails.helpers';

interface ITicketsList {
  data: ITicket[];
  ticketType: string;
  onTicketTypeChange: (_value: string) => void;
  totalTickets: number;
  totalAllTickets: number;
  ticketsTypeList: TTicketsTypeProps[];
  isLoading?: boolean;
  senses?: TSenseRequests[];
  limit: number;
  onPageChange?: (_page: number) => void;
  defaultPage?: number;
}

const TicketsList: React.FC<ITicketsList> = ({
  data,
  ticketType,
  onTicketTypeChange,
  totalTickets,
  totalAllTickets,
  ticketsTypeList,
  isLoading = false,
  senses,
  limit,
  onPageChange,
  defaultPage = 0,
}) => {
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
            <TicketStyles.TicketTitle>Sense Output Details:</TicketStyles.TicketTitle>
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
            <TicketStyles.TicketTitle>Image Hash:</TicketStyles.TicketTitle>
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
            <TicketStyles.TicketTitle>Sense Version:</TicketStyles.TicketTitle>
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
        return <NFTRegistrationTicket ticket={ticket as INftRegistrationTicket} />;
      case 'nft-act':
        return <NFTActivationTicket ticket={ticket as INftActivationTicket} />;
      case 'nft-collection-reg':
        return (
          <NFTCollectionRegistrationTicket ticket={ticket as INftCollectionRegistrationTicket} />
        );
      case 'nft-collection-act':
        return <NFTCollectionActivationTicket ticket={ticket as INftCollectionActivationTicket} />;
      case 'nft-royalty':
        return <NFTRoyaltyTicket ticket={ticket as INftRoyaltyTicket} />;
      case 'action-reg':
        return (
          <ActionRegistrationTicket
            ticket={ticket as IActionRegistrationTicket}
            senseInfo={renderSenseInfo(ticket as IActionRegistrationTicket, transactionHash)}
            showActivationTicket
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
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      onTicketTypeChange(event.target.value as string);
    }
  };

  const getTicketsTypeOptions = () => {
    const results = [
      {
        value: TICKET_TYPE_OPTIONS[0].value,
        name: `${TICKET_TYPE_OPTIONS[0].name}(${totalAllTickets})`,
      },
    ];
    for (let i = 0; i < ticketsTypeList.length; i += 1) {
      const item = TICKET_TYPE_OPTIONS.find(ticket => ticket.value === ticketsTypeList[i].type);
      results.push({
        value: ticketsTypeList[i].type,
        name: `${item?.name}(${ticketsTypeList[i].total})`,
      });
    }
    return results;
  };
  const totalPage = Math.ceil(totalTickets / limit);
  return (
    <BlockDetailsStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-12">
        <Styles.BlockWrapper>
          <Styles.BlockTitle>
            Tickets Created Using this PastelID{' '}
            <Styles.SubTitle>
              (Total {totalTickets} {totalTickets > 1 ? 'Tickets' : 'Ticket'})
            </Styles.SubTitle>
          </Styles.BlockTitle>
          <Styles.FilterBlock>
            <Dropdown
              value={ticketType}
              onChange={handleTicketTypeChange}
              options={getTicketsTypeOptions()}
              label="Ticket Type"
            />
          </Styles.FilterBlock>
        </Styles.BlockWrapper>
        <Box className="custom-table tickets-table">
          {data.map(ticket => (
            <BlockDetailsStyles.GridStyle
              item
              key={`${ticket.id}-${ticket.transactionHash}`}
              className="table__row"
              id={
                ticket.type === 'username-change'
                  ? (ticket.data.ticket as IUserNameChangeTicket).username
                  : ticket.transactionHash
              }
            >
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <TicketStyles.TicketTitle>TXID:</TicketStyles.TicketTitle>
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
                  <TicketStyles.TicketTitle>Type:</TicketStyles.TicketTitle>
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
              <TicketStyles.TicketTitle>No data</TicketStyles.TicketTitle>
            </BlockDetailsStyles.GridStyle>
          ) : null}
        </Box>
      </TableStyles.BlockWrapper>
      {totalPage > 1 ? (
        <Styles.PaginationWrapper>
          <Pagination totalPage={totalPage} onPageChange={onPageChange} defaultPage={defaultPage} />
        </Styles.PaginationWrapper>
      ) : null}
    </BlockDetailsStyles.GridStyle>
  );
};

export default TicketsList;
