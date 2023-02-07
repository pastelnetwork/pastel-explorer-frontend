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
import { getBaseURL } from '@utils/constants/statistics';

import * as TableStyles from '@components/Table/Table.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as Styles from './BlockDetails.styles';

interface ITicketsList {
  data: ITicket[];
  senses?: TSenseRequests[];
}

const TicketsList: React.FC<ITicketsList> = ({ data, senses }) => {
  if (!data?.length) {
    return null;
  }

  const renderSenseInfo = (ticket: IActionRegistrationTicket, transactionHash: string) => {
    if (ticket.action_type !== 'sense' || !ticket?.activation_ticket) {
      return null;
    }
    const sense = senses?.find(s => s.transactionHash === transactionHash);
    if (!sense) {
      return (
        <>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <TicketStyles.TicketTitle>Sense Output Details:</TicketStyles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <TicketStyles.TicketContent>Not found</TicketStyles.TicketContent>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <TicketStyles.TicketTitle>Image Hash:</TicketStyles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <TicketStyles.TicketContent>NA</TicketStyles.TicketContent>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <TicketStyles.TicketTitle>Sense Version:</TicketStyles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <TicketStyles.TicketContent>NA</TicketStyles.TicketContent>
            </Grid>
          </Grid>
        </>
      );
    }

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>Sense Output Details:</TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              <Link to={`${ROUTES.SENSE_DETAILS}/${sense.imageFileHash}`}>
                <img
                  src={`${getBaseURL()}/static/senses/${sense.imageFileHash}.png`}
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
                route={`${ROUTES.SENSE_DETAILS}/${sense.imageFileHash}`}
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

  return (
    <Styles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-12">
        <TableStyles.BlockTitle>Tickets</TableStyles.BlockTitle>
        <Box className="custom-table tickets-table">
          {data.map(ticket => (
            <Styles.GridStyle
              item
              key={ticket.id}
              className="table__row"
              id={ticket.transactionHash}
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
            </Styles.GridStyle>
          ))}
        </Box>
      </TableStyles.BlockWrapper>
    </Styles.GridStyle>
  );
};

export default TicketsList;
