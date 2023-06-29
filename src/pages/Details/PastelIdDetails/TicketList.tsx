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
import { Dropdown } from '@components/Dropdown/Dropdown';
import Pagination from '@components/Pagination/Pagination';
import { translate } from '@utils/helpers/i18n';
import * as ascii85 from '@utils/helpers/ascii85';
import { getFileIcon } from '@pages/Details/CascadeDetails/CascadeDetails.helpers';
import CopyButton from '@components/CopyButton/CopyButton';

import * as TableStyles from '@components/Table/Table.styles';
import * as BlockDetailsStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';
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
    if (['sense', 'cascade'].indexOf(ticket.action_type) === -1 || !ticket.activation_ticket) {
      return null;
    }
    const sense = senses?.find(s => s.transactionHash === transactionHash);
    if (!sense) {
      if (ticket.action_type === 'sense' && ticket.activation_txId) {
        return (
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <TicketStyles.TicketTitle>
                {translate('pages.blockDetails.senseOutputDetails')}
              </TicketStyles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <TicketStyles.TicketContent>
                {translate('pages.tickets.pendingSenseGenerate')}
              </TicketStyles.TicketContent>
            </Grid>
          </Grid>
        );
      }
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
              {translate('pages.pastelIdDetails.senseOutputDetails')}:
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              {ticket.nftId ? (
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
                translate('pages.tickets.pendingSenseGenerate')
              )}
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {translate('pages.pastelIdDetails.imageHash')}:
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
              {translate('pages.pastelIdDetails.senseVersion')}:
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
        name: `${translate(TICKET_TYPE_OPTIONS[0].name)}(${totalAllTickets})`,
      },
    ];
    for (let i = 0; i < ticketsTypeList.length; i += 1) {
      const item = TICKET_TYPE_OPTIONS.find(ticket => ticket.value === ticketsTypeList[i].type);
      results.push({
        value: ticketsTypeList[i].type,
        name: `${translate(item?.name || '')}(${ticketsTypeList[i].total})`,
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
            {translate('pages.pastelIdDetails.ticketsCreatedUsingThisPastelID')}{' '}
            <Styles.SubTitle>
              (
              {totalTickets > 1
                ? translate('pages.pastelIdDetails.totalTickets', { totalTickets })
                : translate('pages.pastelIdDetails.totalTicket', { totalTickets })}
              )
            </Styles.SubTitle>
          </Styles.BlockTitle>
          <Styles.FilterBlock>
            <Dropdown
              value={ticketType}
              onChange={handleTicketTypeChange}
              options={getTicketsTypeOptions()}
              label={translate('pages.pastelIdDetails.ticketType')}
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
                  <TicketStyles.TicketTitle>
                    {translate('pages.pastelIdDetails.txId')}:
                  </TicketStyles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TicketStyles.TicketContent>
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
                    {translate('pages.pastelIdDetails.type')}:
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
              <TicketStyles.TicketTitle>{translate('common.noData')}</TicketStyles.TicketTitle>
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
