import { TTicketType } from '@utils/types/ITransactions';

import PastelIDRegistrationTicket from './PastelIDRegistrationTicket';
import UserNameChangeTicket from './UserNameChangeTicket';
import NFTRegistrationTicket from './NFTRegistrationTicket';
import NFTActivationTicket from './NFTActivationTicket';
import NFTCollectionRegistrationTicket from './NFTCollectionRegistrationTicket';
import NFTCollectionActivationTicket from './NFTCollectionActivationTicket';
import NFTRoyaltyTicket from './NFTRoyaltyTicket';
import ActionActivationTicket from './ActionActivationTicket';
import ActionRegistrationTicket from './ActionRegistrationTicket';
import OfferTicket from './OfferTicket';
import AcceptTicket from './AcceptTicket';
import TransferTicket from './TransferTicket';
import TicketDetail from './TicketDetail';

const getTicketTitle = (type: TTicketType) => {
  switch (type) {
    case 'pastelid':
      return 'Pastel ID Registration Ticket';
    case 'username-change':
      return 'User Name Change Ticket';
    case 'nft-reg':
      return 'NFT Registration Ticket';
    case 'nft-act':
      return 'NFT Activation Ticket';
    case 'nft-collection-reg':
      return 'NFT Collection Registration Ticket';
    case 'nft-collection-act':
      return 'NFT Collection Activation Ticket';
    case 'nft-royalty':
      return 'NFT Royalty Ticket';
    case 'action-reg':
      return 'Action Registration Ticket';
    case 'action-act':
      return 'Action Activation Ticket';
    case 'offer':
      return 'Offer Ticket';
    case 'accept':
      return 'Accept Ticket';
    case 'transfer':
      return 'Transfer Ticket';
    default:
      return '';
  }
};

export {
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
  TicketDetail,
  getTicketTitle,
};
