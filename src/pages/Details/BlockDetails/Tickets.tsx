import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { decode } from 'js-base64';

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
import { translate } from '@utils/helpers/i18n';
import * as ascii85 from '@utils/helpers/ascii85';
import { getFileIcon } from '@pages/Details/CascadeDetails/CascadeDetails.helpers';

import * as TableStyles from '@components/Table/Table.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';
import * as Styles from './BlockDetails.styles';

interface ITicketsList {
  data: ITicket[];
  senses?: TSenseRequests[];
  showActivationTicket?: boolean;
  variant?: string;
}

const TicketsList: React.FC<ITicketsList> = ({
  data,
  senses,
  showActivationTicket = false,
  variant,
}) => {
  if (!data?.length) {
    return null;
  }

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

  const renderSenseInfo = (ticket: IActionRegistrationTicket, transactionHash: string) => {
    if (['sense', 'cascade'].indexOf(ticket.action_type) === -1 || !ticket?.activation_ticket) {
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
                {translate('pages.blockDetails.cascadeFileType')}
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
              {translate('pages.blockDetails.senseOutputDetails')}
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
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
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {translate('pages.blockDetails.imageHash')}
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
              {translate('pages.blockDetails.senseVersion')}
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
            showActivationTicket={showActivationTicket}
            transactionHash={transactionHash}
          />
        );
      case 'action-act':
        return <ActionActivationTicket ticket={ticket as IActionActivationTicket} />;
      case 'offer':
        return <OfferTicket ticket={ticket as IOfferTicket} variant={variant} />;
      case 'accept':
        return <AcceptTicket ticket={ticket as IAcceptTicket} variant={variant} />;
      case 'transfer':
        return <TransferTicket ticket={ticket as ITransferTicket} variant={variant} />;
      default:
        return <PastelIDRegistrationTicket ticket={ticket as IPastelIDRegistrationTicket} />;
    }
  };

  return (
    <Styles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-12">
        <TableStyles.BlockTitle>
          {variant !== 'transaction'
            ? translate('pages.blockDetails.tickets')
            : getTicketTitle(
                data[0].type as TTicketType,
                (data[0].data.ticket as INftCollectionRegistrationTicket)?.collection_ticket
                  ?.item_type,
              )}
        </TableStyles.BlockTitle>
        <Box className="custom-table tickets-table">
          {data.map(ticket => (
            <Styles.GridStyle
              item
              key={ticket.id}
              className="table__row"
              id={ticket.transactionHash}
            >
              {variant !== 'transaction' ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={4} sm={3} className="max-w-355">
                      <TicketStyles.TicketTitle>
                        {translate('pages.blockDetails.txId')}:
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
                        {translate('pages.blockDetails.type')}:
                      </TicketStyles.TicketTitle>
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <TicketStyles.TicketContent>
                        {getTicketTitle(
                          ticket.type as TTicketType,
                          (ticket.data.ticket as INftCollectionRegistrationTicket)
                            ?.collection_ticket?.item_type,
                        )}
                      </TicketStyles.TicketContent>
                    </Grid>
                  </Grid>
                </>
              ) : null}

              {renderContent(ticket.type, ticket.data.ticket, ticket.transactionHash)}
            </Styles.GridStyle>
          ))}
        </Box>
      </TableStyles.BlockWrapper>
    </Styles.GridStyle>
  );
};

export default TicketsList;
