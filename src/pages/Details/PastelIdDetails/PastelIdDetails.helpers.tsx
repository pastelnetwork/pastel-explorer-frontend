export type TTicketsTypeProps = {
  type: string;
  total: number;
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
    value: 'nft-collection-reg',
  },
  {
    name: 'pages.pastelIdDetails.nftCollectionAct',
    value: 'nft-collection-act',
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
];

export const getTicketTypeTotal = (type: string, ticketsTypeList: TTicketsTypeProps[]) => {
  const item = ticketsTypeList.find(t => t.type === type);
  return item?.total || 0;
};
