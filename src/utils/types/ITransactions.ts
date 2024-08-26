export type DirectionType = 'Incoming' | 'Outgoing';

export interface TransactionEvent {
  amount: number;
  transactionHash: string;
  direction: DirectionType;
  address: string;
  type: string;
}

export interface BlockUnconfirmed {
  fee: number;
  size: number;
  height: string | number;
  txsCount: number;
  ticketsTotal: number;
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
  tickets?: string;
  ticketsTotal?: number;
  ticketsList?: ITicket[];
  senseData?: TSenseRequests[];
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
  file_type: string;
  make_publicly_accessible: boolean;
  original_file_size_in_bytes: number;
  dd_and_fingerprints_ic: number;
  dd_and_fingerprints_max: number;
  dd_and_fingerprints_ids: string[];
  rq_ic: number;
  rq_max: number;
  rq_ids: string[];
  rq_oti: string;
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
  height: number;
  pastelID: string;
  pq_key: string;
  address: string;
  timeStamp: string;
  signature: string;
  id_type: string;
  transactionTime: number;
}

export interface IAgreeingSupernodesSignatures {
  [key: string]: {
    credit_pack_purchase_request_fields_json_b64_signature: string;
    price_agreement_request_response_hash_signature: string;
  };
}

export interface IInferenceAPICreditPackTicket {
  contract_ticket: {
    ticket_identifier_string: string;
    ticket_input_data_fully_parsed_sha3_256_hash: string;
    ticket_uncompressed_size_in_bytes: number;
    ticket_input_data_dict: {
      credit_pack_purchase_request_confirmation_dict: {
        credit_pack_purchase_request_fields_json_b64: string;
        credit_purchase_request_confirmation_message_version_string: string;
        credit_purchase_request_confirmation_pastel_block_height: number;
        credit_purchase_request_confirmation_utc_iso_string: number;
        id: number;
        requesting_end_user_pastelid: string;
        requesting_end_user_pastelid_signature_on_sha3_256_hash_of_credit_pack_purchase_request_confirmation_fields: string;
        sha3_256_hash_of_credit_pack_purchase_request_confirmation_fields: string;
        sha3_256_hash_of_credit_pack_purchase_request_fields: string;
        sha3_256_hash_of_credit_pack_purchase_request_response_fields: string;
        txid_of_credit_purchase_burn_transaction: string;
      };
      credit_pack_purchase_request_dict: {
        credit_purchase_request_message_version_string: string;
        credit_usage_tracking_psl_address: string;
        list_of_authorized_pastelids_allowed_to_use_credit_pack: string[];
        request_pastel_block_height: number;
        request_timestamp_utc_iso_string: string;
        requested_initial_credits_in_credit_pack: number;
        requesting_end_user_pastelid: string;
      };
      credit_pack_purchase_request_response_dict: {
        agreeing_supernodes_signatures_dict: IAgreeingSupernodesSignatures;
        credit_pack_purchase_request_fields_json_b64: string;
        credit_purchase_request_response_message_version_string: string;
        credit_usage_tracking_psl_address: string;
        id: string;
        list_of_potentially_agreeing_supernodes: string[];
        list_of_supernode_pastelids_agreeing_to_credit_pack_purchase_terms: string[];
        proposed_total_cost_of_credit_pack_in_psl: number;
        psl_cost_per_credit: number;
        request_response_pastel_block_height: number;
        request_response_timestamp_utc_iso_string: string;
        responding_supernode_pastelid: string;
        responding_supernode_signature_on_credit_pack_purchase_request_response_hash: string;
        sha3_256_hash_of_credit_pack_purchase_request_fields: string;
        sha3_256_hash_of_credit_pack_purchase_request_response_fields: string;
      };
      ticket_input_data_fully_parsed_sha3_256_hash: string;
      ticket_uncompressed_size_in_bytes: number;
    };
  };
  height: number;
  key: string;
  secondary_key: string;
  sub_type: string;
  timestamp: string;
  type: string;
  version: string;
  transactionTime: number;
}

export interface IUserNameChangeTicket {
  type: string;
  version: number;
  pastelID: string;
  username: string;
  fee: number;
  signature: string;
  transactionTime: number;
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
  transactionTime: number;
  activation_ticket: string;
  activation_txId: string;
  collectionName?: string;
  collectionAlias?: string;
  image?: string;
  nftId?: string;
}

export interface INftActivationTicket {
  type: string;
  version: number;
  pastelID: string;
  reg_txid: string;
  creator_height: number;
  storage_fee: number;
  signature: string;
  transactionTime: number;
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
  height: number;
  closing_height: number;
  nft_max_count: number;
  nft_copy_count: number;
  royalty: number;
  royalty_address: string;
  green: boolean;
  storage_fee: number;
  transactionTime: number;
  activation_ticket: string;
  activation_txId: string;
  collectionAlias: string;
  collection_ticket: {
    app_ticket: string;
    block_hash: string;
    blocknum: number;
    collection_final_allowed_block_height: number;
    collection_item_copy_count: number;
    collection_name: string;
    collection_ticket_version: number;
    creator: string;
    green: boolean;
    item_type: string;
    list_of_pastelids_of_authorized_contributors: string[];
    max_collection_entries: number;
    royalty: number;
  };
  otherData: {
    cascadeFileName: string;
    collectionAlias: string;
    collectionName: string;
  };
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
  transactionTime: number;
}

export interface INftCollectionActivationTicket {
  type: string;
  version: number;
  pastelID: string;
  reg_txid: string;
  creator_height: number;
  storage_fee: number;
  signature: string;
  transactionTime: number;
}

export interface INftRoyaltyTicket {
  type: string;
  version: number;
  pastelID: string;
  new_pastelID: string;
  nft_txid: string;
  signature: string;
  transactionTime: number;
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
  activation_ticket: string;
  activation_txId: string;
  transactionTime: number;
  activationTicket: ITicket;
  collectionName?: string;
  collectionAlias?: string;
  nftId?: string;
}

export interface IActionTicket {
  action_ticket_version: number;
  action_type: string;
  caller: string;
  blocknum: number;
  block_hash: string;
  api_ticket: string;
  transactionTime: number;
}

export interface IActionActivationTicket {
  type: string;
  version: number;
  pastelID: string;
  reg_txid: string;
  called_at: number;
  storage_fee: number;
  signature: string;
  transactionTime: number;
}

export interface IOfferTicket {
  type: string;
  version: number;
  pastelID: string;
  item_txid: string;
  nft_txid: string;
  copy_number: number;
  asked_price: number;
  valid_after: number;
  valid_before: number;
  locked_recipient: string;
  signature: string;
  image: string;
  transactionTime: number;
  otherData: {
    offerType: string;
    txId: string;
    regTxId: string;
    ticketType: string;
    ticketId: string;
  };
}

export interface IAcceptTicket {
  type: string;
  version: number;
  pastelID: string;
  offer_txid: string;
  price: number;
  signature: string;
  transactionTime: number;
  image: string;
  otherData: {
    offerType: string;
    txId: string;
    regTxId: string;
    ticketType: string;
    ticketId: string;
  };
}

export interface ITransferTicket {
  type: string;
  version: number;
  pastelID: string;
  offer_txid: string;
  accept_txid: string;
  item_txid: string;
  nft_txid: string;
  registration_txid: string;
  copy_serial_nr: string;
  signature: string;
  transactionTime: number;
  image: string;
  otherData: {
    offerType: string;
    txId: string;
    regTxId: string;
    ticketType: string;
    ticketId: string;
  };
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
  transactionHash: string;
  imageFileHash?: string;
  id: string;
  sub_type?: string;
}

export type TTicketType =
  | 'pastelid'
  | 'username-change'
  | 'nft-reg'
  | 'nft-act'
  | 'collection-reg'
  | 'collection-act'
  | 'nft-royalty'
  | 'action-reg'
  | 'action-act'
  | 'offer'
  | 'accept'
  | 'contract'
  | 'cascade_multi_volume'
  | 'transfer';

export type TAlternativeNsfwScores = {
  labels: string;
  value: number;
};

export type TSubgraphNodes = {
  fileHash: string;
  imgLink: string;
  rarenessScore: number;
  openNsfwScore: number;
  isLikelyDupe: boolean;
  x: number;
  y: number;
  label: string;
  id: string;
  size: number;
};

export type TSubgraphEdges = {
  sourceID: string;
  targetID: string;
};

export type TPastelData = {
  pastelBlockHashWhenRequestSubmitted: string;
  pastelBlockHeightWhenRequestSubmitted: number;
  utcTimestampWhenRequestSubmitted: string;
  pastelIdOfSubmitter: string;
  pastelIdOfRegisteringSupernode1: string;
  pastelIdOfRegisteringSupernode2: string;
  pastelIdOfRegisteringSupernode3: string;
  isPastelOpenApiRequest: boolean;
};

export type TSubgraph = {
  nodes: TSubgraphNodes[];
  edges: TSubgraphEdges[];
};

export type TRareOnTheInternetResultsGraphNodes = {
  fileHash: string;
  imgLink: string;
  x: number;
  y: number;
  id: string;
  size: number;
  ranking: number;
  resolution: string;
  date: string;
};

export type TRareOnTheInternetResultsGraph = {
  nodes: TRareOnTheInternetResultsGraphNodes[];
  edges: TSubgraphEdges[];
};

export type TRareOnTheInternetAlternativeResultsNodes = {
  fileHash: string;
  imgLink: string;
  x: number;
  y: number;
  id: string;
  size: number;
  description: string;
};

export type TRareOnTheInternetAlternativeResults = {
  nodes: TRareOnTheInternetAlternativeResultsNodes[];
  edges: TSubgraphEdges[];
};

export type TSense = {
  isLikelyDupe: boolean;
  senseVersion: number;
  openNSFWScore: number;
  rarenessScore: number;
  image: {
    url: string;
    hash: string;
    title: string;
    description: string;
    isPublic: boolean;
  };
  ipfs: {
    link: string;
    hash: string;
  };
  pastelData: TPastelData;
  prevalenceOfSimilarImagesData: TAlternativeNsfwScores[];
  alternativeNsfwScores: TAlternativeNsfwScores[];
  subgraph: TSubgraph;
  rareOnTheInternetResultsGraph: TRareOnTheInternetResultsGraph;
  rareOnTheInternetAlternativeResults: TRareOnTheInternetAlternativeResults;
  fingerprints: number[];
};

export type TSenseRequests = {
  imageFileHash: string;
  imageFileCdnUrl: string;
  imageTitle: string;
  imageDescription: string;
  isPublic: number;
  transactionHash: string;
  rawData: string;
  isLikelyDupe: number;
  dupeDetectionSystemVersion: string;
  openNsfwScore: number;
  rarenessScore: number;
  ipfsLink: string;
  sha256HashOfSenseResults: string;
  blockHash: string;
  blockHeight: number;
  utcTimestampWhenRequestSubmitted: string;
  pastelIdOfSubmitter: string;
  pastelIdOfRegisteringSupernode1: string;
  pastelIdOfRegisteringSupernode2: string;
  pastelIdOfRegisteringSupernode3: string;
  isPastelOpenapiRequest: number;
  isRareOnInternet: number;
  pctOfTop10MostSimilarWithDupeProbAbove25pct: number;
  pctOfTop10MostSimilarWithDupeProbAbove33pct: number;
  pctOfTop10MostSimilarWithDupeProbAbove50pct: number;
  rarenessScoresTable: string;
  internetRareness: string;
  alternativeNsfwScores: string;
  imageFingerprintOfCandidateImageFile: string;
  createdDate: number;
  lastUpdated: number;
  type: string;
  prevalenceOfSimilarImagesData: {
    [key: string]: number;
  };
  currentOwnerPastelID: string;
};

export type TCurrentNode = {
  date_string: string;
  google_cached_url: string;
  id: number;
  image_label: string;
  img: HTMLImageElement;
  img_alt_string: string;
  img_src_string: string;
  index: number;
  node_size: number;
  original_url: string;
  resolution_string: string;
  search_result_ranking: number;
  title: string;
  vx: number;
  vy: number;
  x: number;
  y: number;
  image_base64_string: string;
  src: string;
  img_src: string;
  img_alt: string;
  text_strings_on_page: string;
  misc_related_images_urls?: string;
  misc_related_images_as_b64_strings?: string;
};

export type TCurrentNodeEdges = {
  connection_strength: string;
  index: number;
  source: TCurrentNode;
  target: TCurrentNode;
};

export type TCounts = {
  [key: string]: number;
};

export type TEdges = {
  source: number;
  target: number;
};

export type TicketsList = {
  height: number;
  transactionHash: string;
  pastelID: string;
  version: number;
  timestamp: number;
  fee: number;
  imageHash: string;
  dupeDetectionSystemVersion: string;
  activation_ticket: string;
  activation_txId: string;
  id_type: string;
  type: string;
  collectionName: string;
  collectionAlias: string;
  fileType: string;
  fileName: string;
  image?: string;
  imageFileCdnUrl?: string;
  item_type?: string;
  nft_copy_count?: number;
  nft_max_count?: number;
  copyNumber?: string;
  reTxId?: string;
  ticketType?: string;
  userName?: string;
  nftId?: string;
  fileSize?: number;
  contract_ticket?: string;
  tx_info?: {
    compressed_size: number;
    compression_ratio: string;
    is_compressed: boolean;
    multisig_outputs_count: number;
    multisig_tx_total_fee: number;
    uncompressed_size: number;
  };
  secondary_key?: string;
  sub_type?: string;
  key?: string;
};

export type TCascade = {
  height: number;
  ticket: {
    action_ticket: string;
    action_type: string;
    called_at: number;
    key: string;
    label: string;
    signatures: ISignature;
    storage_fee: number;
    type: string;
    version: number;
    sub_type?: string;
    secondary_key?: string;
    contract_ticket?: string;
  };
  tx_info: {
    compressed_size: number;
    compression_ratio: string;
    is_compressed: boolean;
    size: number;
  };
  txid: string;
};

export interface ICascadeApiTicket {
  data_hash: string;
  file_name: string;
  rq_ic: number;
  rq_max: number;
  rq_ids: string[];
  rq_oti: string;
  original_file_size_in_bytes: number;
  file_type: string;
  make_publicly_accessible: boolean;
}

export interface ICollectionDetail {
  item_copy_count: number;
  name: string;
  version: number;
  creator: string;
  green: boolean;
  max_collection_entries: number;
  royalty: number;
  username: string;
  transactionTime: number;
  transactionHash: string;
}

export type TItemActivity = {
  transactionHash: string;
  transactionTime: number;
  ticket:
    | INftRegistrationTicket
    | IOfferTicket
    | IAcceptTicket
    | ITransferTicket
    | INftActivationTicket;
};

export interface INftDetails {
  transactionHash: string;
  transactionTime: number;
  memberSince: number;
  username: string;
  total_copies: number;
  royalty: number;
  green: number;
  storage_fee: number;
  author: string;
  collection_txid: string;
  collection_name: string;
  collection_alias: string;
  creator_name: string;
  creator_website: string;
  creator_written_statement: string;
  nft_title: string;
  nft_type: string;
  nft_series_name: string;
  nft_creation_video_youtube_url: string;
  nft_keyword_set: string;
  data_hash: string;
  original_file_size_in_bytes: number;
  file_type: string;
  make_publicly_accessible: number;
  dd_and_fingerprints_ic: number;
  dd_and_fingerprints_max: number;
  dd_and_fingerprints_ids: string;
  rq_ic: number;
  rq_max: number;
  rq_oti: string;
  image: string;
  pastel_block_hash_when_request_submitted: string;
  pastel_block_height_when_request_submitted: string;
  utc_timestamp_when_request_submitted: string;
  pastel_id_of_submitter: string;
  pastel_id_of_registering_supernode_1: string;
  pastel_id_of_registering_supernode_2: string;
  pastel_id_of_registering_supernode_3: string;
  is_pastel_openapi_request: number;
  dupe_detection_system_version: string;
  is_likely_dupe: number;
  overall_rareness_score: number;
  is_rare_on_internet: number;
  pct_of_top_10_most_similar_with_dupe_prob_above_25pct: number;
  pct_of_top_10_most_similar_with_dupe_prob_above_33pct: number;
  pct_of_top_10_most_similar_with_dupe_prob_above_50pct: number;
  rareness_scores_table_json_compressed_b64: string;
  open_nsfw_score: number;
  nsfw_score: number;
  internet_rareness: string;
  alternative_nsfw_scores: string;
  image_fingerprint_of_candidate_image_file: string;
  blockHeight: number;
  currentOwnerPastelID: string;
  rawData: string;
}

export interface IMempool {
  id: string;
  recipientCount: number;
  timestamp: number;
  totalAmount: number;
  isNonStandard: number | null;
  size: number;
  fee: number;
  tickets?: string;
}

export interface ICollectionItem {
  id: string;
  title: string;
  src: string;
  type: string;
  txid: string;
  timestamp: number;
}

export type TAcceptedOffer = {
  transactionHash: string;
  offer_txid: string;
  pastelID: string;
  price: number;
  copy_number: number;
  timestamp: number;
};
export type TTransfer = {
  transactionHash: string;
  pastelID: string;
  offer_txid: string;
  accept_txid: string;
  item_txid: string;
  registration_txid: string;
  copy_serial_nr: number;
  transactionTime: number;
};


interface IRegistrationAttempt {
  id: number;
  file_id: string;
  reg_started_at: string;
  processor_sns: string;
  finished_at: string;
  is_successful: boolean;
  error_message: string;
}

interface IActivationAttempt {
  id: number;
  file_id: string;
  activation_attempt_at: string;
  is_successful: boolean;
  error_message: string;
}

export interface IMultiVolumeFIle {
  file_id: string;
  upload_timestamp: string;
  file_index: string;
  base_file_id: string;
  task_id: string;
  reg_txid: string;
  activation_txid: string;
  req_burn_txn_amount: number;
  burn_txn_id: string;
  req_amount: number;
  is_concluded: boolean;
  cascade_metadata_ticket_id: string;
  uuid_key: string;
  hash_of_original_big_file: string;
  name_of_original_big_file_with_ext: string;
  size_of_original_big_file: number;
  start_block: number;
  done_block: number;
  registration_attempts: IRegistrationAttempt[],
  activation_attempts: IActivationAttempt;
}

export interface IMultiVolumeTicket {
  contract_ticket: {
    name_of_original_file: string;
    sha3_256_hash_of_original_file: string;
    size_of_original_file_mb: number;
  };
  height: number;
  key: string;
  secondary_key: string;
  sub_type: string;
  timestamp: string;
  type: string;
  version: string;
  transactionTime: number;
  tx_info: string;
  fileName: string;
  files?: IMultiVolumeFIle[];
}
