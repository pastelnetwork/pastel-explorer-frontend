import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
}

const TicketsList: React.FC<ITicketsList> = ({
  data,
  ticketType,
  onTicketTypeChange,
  totalTickets,
  totalAllTickets,
  ticketsTypeList,
}) => {
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
    imageHash: string,
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
            imageHash={imageHash}
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

  return (
    <BlockDetailsStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-12">
        <Styles.BlockWrapper>
          <Styles.BlockTitle>
            Ticket List{' '}
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
            >
              <Grid container spacing={3}>
                <Grid item xs={4} sm={2}>
                  <TicketStyles.TicketTitle>Type:</TicketStyles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <TicketStyles.TicketContent>
                    {getTicketTitle(ticket.type as TTicketType)}
                  </TicketStyles.TicketContent>
                </Grid>
              </Grid>
              {renderContent(ticket.type, ticket.data.ticket, ticket.imageFileHash)}
            </BlockDetailsStyles.GridStyle>
          ))}
          {!data.length ? (
            <BlockDetailsStyles.GridStyle className="table__row">
              <TicketStyles.TicketTitle>No data</TicketStyles.TicketTitle>
            </BlockDetailsStyles.GridStyle>
          ) : null}
        </Box>
      </TableStyles.BlockWrapper>
    </BlockDetailsStyles.GridStyle>
  );
};

export default TicketsList;
