import parse from 'html-react-parser';

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
import InferenceAPICreditPackTicket from './InferenceAPICreditPackTicket';
import OfferTicket from './OfferTicket';
import AcceptTicket from './AcceptTicket';
import TransferTicket from './TransferTicket';

const getTicketTitle = (type: TTicketType, itemType = '') => {
  switch (type) {
    case 'pastelid':
      return parse(translate('components.ticket.ticketsTitle.pastelid'));
    case 'username-change':
      return parse(translate('components.ticket.ticketsTitle.usernameChange'));
    case 'nft-reg':
      return parse(translate('components.ticket.ticketsTitle.nftReg'));
    case 'nft-act':
      return parse(translate('components.ticket.ticketsTitle.nftAct'));
    case 'collection-reg':
      return itemType === 'sense'
        ? parse(translate('components.ticket.ticketsTitle.senseCollectionRegistrationTicket'))
        : parse(translate('components.ticket.ticketsTitle.nftCollectionReg'));
    case 'collection-act':
      return parse(translate('components.ticket.ticketsTitle.nftCollectionAct'));
    case 'nft-royalty':
      return parse(translate('components.ticket.ticketsTitle.nftRoyalty'));
    case 'action-reg':
      return parse(translate('components.ticket.ticketsTitle.actionReg'));
    case 'action-act':
      return parse(translate('components.ticket.ticketsTitle.actionAct'));
    case 'offer':
      return parse(translate('components.ticket.ticketsTitle.offer'));
    case 'accept':
      return parse(translate('components.ticket.ticketsTitle.accept'));
    case 'transfer':
      return parse(translate('components.ticket.ticketsTitle.transfer'));
    case 'contract':
      return parse(translate('pages.tickets.inferenceTicketType'));
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
  InferenceAPICreditPackTicket,
  getTicketTitle,
};
