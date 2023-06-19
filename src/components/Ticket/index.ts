import { TTicketType } from '@utils/types/ITransactions';
import { translate } from '@utils/helpers/i18n';

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

const getTicketTitle = (type: TTicketType, itemType = '') => {
  switch (type) {
    case 'pastelid':
      return translate('components.ticket.ticketsTitle.pastelid');
    case 'username-change':
      return translate('components.ticket.ticketsTitle.usernameChange');
    case 'nft-reg':
      return translate('components.ticket.ticketsTitle.nftReg');
    case 'nft-act':
      return translate('components.ticket.ticketsTitle.nftAct');
    case 'collection-reg':
      return itemType === 'sense'
        ? translate('components.ticket.ticketsTitle.senseCollectionRegistrationTicket')
        : translate('components.ticket.ticketsTitle.nftCollectionReg');
    case 'collection-act':
      return translate('components.ticket.ticketsTitle.nftCollectionAct');
    case 'nft-royalty':
      return translate('components.ticket.ticketsTitle.nftRoyalty');
    case 'action-reg':
      return translate('components.ticket.ticketsTitle.actionReg');
    case 'action-act':
      return translate('components.ticket.ticketsTitle.actionAct');
    case 'offer':
      return translate('components.ticket.ticketsTitle.offer');
    case 'accept':
      return translate('components.ticket.ticketsTitle.accept');
    case 'transfer':
      return translate('components.ticket.ticketsTitle.transfer');
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
  getTicketTitle,
};
