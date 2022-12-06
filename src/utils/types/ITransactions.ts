export type DirectionType = 'Incoming' | 'Outgoing';

export interface TransactionEvent {
  amount: number;
  transactionHash: string;
  direction: DirectionType;
  address: string;
}

export interface BlockUnconfirmed {
  fee: number;
  size: number;
  height: string | number;
  txsCount: number;
}

export interface ITransaction {
  block: {
    height: string;
    confirmations: number;
  };
  blockHash: string;
  coinbase: number;
  id: string;
  recipientCount: number;
  timestamp: number;
  totalAmount: number;
  isNonStandard: number | null;
  rawData: string;
  size: number;
  fee: number;
  height: number;
  tickets?: ITicket[];
}

export interface ITransactionDetails extends ITransaction {
  transactionEvents: Array<TransactionEvent>;
}

export interface ITransactionVout {
  n: number;
  scriptPubKey: {
    addresses: string[];
    asm: string;
    hex: string;
    reqSigs: number;
    type: string;
  };
  value: number;
  valueZat: number;
}

export interface ITransactionVin {
  coinbase: string;
  sequence: number;
}

export interface IRawTransactions {
  blockhash: string | null;
  blocktime: number;
  confirmations: number;
  expiryheight: number;
  hex: string;
  locktime: number;
  overwintered: boolean;
  time: number;
  txid: string;
  vShieldedOutput: unknown[];
  vShieldedSpend: unknown[];
  valueBalance: number;
  version: number;
  versiongroupid: string;
  vin: ITransactionVin[];
  vout: ITransactionVout[];
  vjoinsplit: unknown[];
  fee?: number;
  height?: number;
  size?: number;
}
export type ITransactionState = IRawTransactions & { pslPrice: number; recepients: number };

export interface IAppTicket {
  creator_name: string;
  creator_website: string;
  creator_written_statement: string;
  nft_title: string;
  nft_type: string;
  nft_series_name: string;
  nft_creation_video_youtube_url: string;
  nft_keyword_set: string;
  total_copies: number;
  preview_hash: string;
  thumbnail1_hash: string;
  thumbnail2_hash: string;
  data_hash: string;
  dd_and_fingerprints_ic: number;
  dd_and_fingerprints_max: number;
  dd_and_fingerprints_ids: string[];
  rq_ic: number;
  rq_max: number;
  rq_ids: string[];
  rq_oti: string[];
}

export interface IApiTicket {
  data_hash: string;
  dd_and_fingerprints_ic: number;
  dd_and_fingerprints_ids: string[];
  dd_and_fingerprints_max: number;
}

export interface INftTicket {
  nft_ticket_version: number;
  author: string;
  blocknum: number;
  block_hash: string;
  copies: number;
  royalty: number;
  green: boolean;
  nft_collection_txid: string;
  app_ticket: string;
}

export interface ISignature {
  principal: {
    [key: string]: string;
  };
  mn1: {
    [key: string]: string;
  };
  mn2: {
    [key: string]: string;
  };
  mn3: {
    [key: string]: string;
  };
}

export interface IPastelIDRegistrationTicket {
  type: string;
  version: number;
  pastelID: string;
  pq_key: string;
  address: string;
  timeStamp: string;
  signature: string;
  id_type: string;
}

export interface IUserNameChangeTicket {
  type: string;
  version: number;
  pastelID: string;
  username: string;
  fee: number;
  signature: string;
}

export interface INftRegistrationTicket {
  type: string;
  version: number;
  nft_ticket: string;
  signatures: ISignature;
  key: string;
  label: string;
  creator_height: number;
  total_copies: number;
  royalty: number;
  royalty_address: string;
  green: boolean;
  storage_fee: number;
}

export interface INftActivationTicket {
  type: string;
  version: number;
  pastelID: string;
  reg_txid: string;
  creator_height: number;
  storage_fee: number;
  signature: string;
}

export interface INftCollectionRegistrationTicket {
  type: string;
  version: number;
  nft_collection_ticket: string;
  signatures: ISignature;
  permitted_users: string[];
  key: string;
  label: string;
  creator_height: number;
  closing_height: number;
  nft_max_count: number;
  nft_copy_count: number;
  royalty: number;
  royalty_address: string;
  green: boolean;
  storage_fee: number;
}

export interface INftCollectionTicket {
  nft_collection_ticket_version: number;
  nft_collection_name: string;
  creator: string;
  permitted_users: string[];
  blocknum: number;
  block_hash: string;
  closing_height: number;
  nft_max_count: number;
  nft_copy_count: number;
  royalty: number;
  green: boolean;
  app_ticket: string;
}

export interface INftCollectionActivationTicket {
  type: string;
  version: number;
  pastelID: string;
  reg_txid: string;
  creator_height: number;
  storage_fee: number;
  signature: string;
}

export interface INftRoyaltyTicket {
  type: string;
  version: number;
  pastelID: string;
  new_pastelID: string;
  nft_txid: string;
  signature: string;
}

export interface IActionRegistrationTicket {
  type: string;
  action_ticket: string;
  action_type: string;
  version: number;
  signatures: ISignature;
  key: string;
  label: string;
  called_at: number;
  storage_fee: number;
}

export interface IActionTicket {
  action_ticket_version: number;
  action_type: string;
  caller: string;
  blocknum: number;
  block_hash: string;
  api_ticket: string;
}

export interface IActionActivationTicket {
  type: string;
  version: number;
  pastelID: string;
  reg_txid: string;
  called_at: number;
  storage_fee: number;
  signature: string;
}

export interface IOfferTicket {
  type: string;
  version: number;
  pastelID: string;
  item_txid: string;
  copy_number: number;
  asked_price: number;
  valid_after: number;
  valid_before: number;
  locked_recipient: string;
  signature: string;
}

export interface IAcceptTicket {
  type: string;
  version: number;
  pastelID: string;
  offer_txid: string;
  price: number;
  signature: string;
}

export interface ITransferTicket {
  type: string;
  version: number;
  pastelID: string;
  offer_txid: string;
  accept_txid: string;
  item_txid: string;
  registration_txid: string;
  copy_serial_nr: string;
  signature: string;
}

export interface ITicket {
  data: {
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
  };
  type: string;
}

export type TTicketType =
  | 'pastelid'
  | 'username-change'
  | 'nft-reg'
  | 'nft-act'
  | 'nft-collection-reg'
  | 'nft-collection-act'
  | 'nft-royalty'
  | 'action-reg'
  | 'action-act'
  | 'offer'
  | 'accept'
  | 'transfer';
