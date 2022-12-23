export type TTicketsTypeProps = {
  type: string;
  total: number;
};

export const TICKET_TYPE_OPTIONS = [
  {
    name: 'ALL',
    value: 'all',
  },
  {
    name: 'Pastel ID Registration Ticket',
    value: 'pastelid',
  },
  {
    name: 'User Name Change Ticket',
    value: 'username-change',
  },
  {
    name: 'NFT Registration Ticket',
    value: 'nft-reg',
  },
  {
    name: 'NFT Activation Ticket',
    value: 'nft-act',
  },
  {
    name: 'NFT Collection Registration Ticket',
    value: 'nft-collection-reg',
  },
  {
    name: 'NFT Collection Activation Ticket',
    value: 'nft-collection-act',
  },
  {
    name: 'NFT Royalty Ticket',
    value: 'nft-royalty',
  },
  {
    name: 'Action Registration Ticket',
    value: 'action-reg',
  },
  {
    name: 'Action Activation Ticket',
    value: 'action-act',
  },
  {
    name: 'Offer Ticket',
    value: 'offer',
  },
  {
    name: 'Accept Ticket',
    value: 'accept',
  },
  {
    name: 'Transfer Ticket',
    value: 'transfer',
  },
];

export const getTicketTypeTotal = (type: string, ticketsTypeList: TTicketsTypeProps[]) => {
  const item = ticketsTypeList.find(t => t.type === type);
  return item?.total || 0;
};
