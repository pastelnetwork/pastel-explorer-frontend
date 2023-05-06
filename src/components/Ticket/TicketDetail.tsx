import {
  TTicketType,
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
} from '@components/Ticket';
import * as TableStyles from '@components/Table/Table.styles';
import * as Styles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

interface ITicketDetailProps {
  title: string;
  type: TTicketType;
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
    | ITransferTicket;
}

const TicketDetail: React.FC<ITicketDetailProps> = ({ title, type, ticket }) => {
  if (!type) {
    return null;
  }

  const renderContent = () => {
    switch (type) {
      case 'username-change':
        return <UserNameChangeTicket ticket={ticket as IUserNameChangeTicket} />;
      case 'nft-reg':
        return <NFTRegistrationTicket ticket={ticket as INftRegistrationTicket} />;
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
        return <ActionRegistrationTicket ticket={ticket as IActionRegistrationTicket} />;
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
    <TableStyles.BlockWrapper className="mb-20">
      <TableStyles.BlockTitle>{title}</TableStyles.BlockTitle>
      <Styles.ContentWrapper>{renderContent()}</Styles.ContentWrapper>
    </TableStyles.BlockWrapper>
  );
};

export default TicketDetail;
