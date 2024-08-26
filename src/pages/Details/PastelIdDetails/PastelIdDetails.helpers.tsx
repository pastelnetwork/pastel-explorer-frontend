export type TTicketsTypeProps = {
  type: string;
  total: number;
  sub_type?: string;
};

export const TICKET_TYPE_OPTIONS = [
  {
    name: 'pages.pastelIdDetails.all',
    value: 'all',
  },
  {
    name: 'pages.pastelIdDetails.pastelid',
    value: 'pastelid',
  },
  {
    name: 'pages.pastelIdDetails.usernameChange',
    value: 'username-change',
  },
  {
    name: 'pages.pastelIdDetails.nftReg',
    value: 'nft-reg',
  },
  {
    name: 'pages.pastelIdDetails.nftAct',
    value: 'nft-act',
  },
  {
    name: 'pages.pastelIdDetails.nftCollectionReg',
    value: 'collection-reg',
  },
  {
    name: 'pages.pastelIdDetails.nftCollectionAct',
    value: 'collection-act',
  },
  {
    name: 'pages.pastelIdDetails.nftRoyalty',
    value: 'nft-royalty',
  },
  {
    name: 'pages.pastelIdDetails.actionReg',
    value: 'action-reg',
  },
  {
    name: 'pages.pastelIdDetails.actionAct',
    value: 'action-act',
  },
  {
    name: 'pages.pastelIdDetails.offer',
    value: 'offer',
  },
  {
    name: 'pages.pastelIdDetails.accept',
    value: 'accept',
  },
  {
    name: 'pages.pastelIdDetails.transfer',
    value: 'transfer',
  },
  {
    name: 'components.ticket.ticketsTitle.cascadeMultiVolume',
    value: 'cascade_multi_volume',
  },
];

export const getTicketTypeTotal = (type: string, ticketsTypeList: TTicketsTypeProps[]) => {
  const item = ticketsTypeList.find(t => t.type === type);
  return item?.total || 0;
};
