import * as ROUTES from '@utils/constants/routes';

const ApiList = {
  homePage: {
    name: 'components.explorerAPI.homepage',
    api: [
      {
        name: 'components.explorerAPI.statistics',
        urlDisplay: '/v1/stats/live-dashboard-statistics',
        url: 'Other%20statistics/get_v1_stats_live_dashboard_statistics',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.explorerMapSupernodeStatistics',
        urlDisplay: '/v1/network',
        url: 'Network/get_v1_network',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.latestBlocks',
        urlDisplay: '/v1/blocks',
        url: 'Blocks/get_v1_blocks',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.latestTransactions',
        urlDisplay: '/v1/transactions',
        url: 'Transactions/get_v1_transactions',
        method: 'GET',
      },
    ],
  },
  blocks: {
    name: 'components.explorerAPI.blocks',
    api: [
      {
        name: 'components.explorerAPI.blocksStatistics',
        urlDisplay: '/v1/stats/blocks-statistics',
        url: 'Current%20Statistics/get_v1_stats_blocks_statistics',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.blockList',
        urlDisplay: '/v1/blocks',
        url: 'Blocks/get_v1_blocks',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.mempoolModal',
        urlDisplay: '/v1/stats/unconfirmed-blocks',
        url: 'Current%20Statistics/get_v1_stats_unconfirmed_blocks',
        method: 'GET',
      },
    ],
  },
  block: {
    name: 'components.explorerAPI.blockDetails',
    api: [
      {
        name: 'components.explorerAPI.blockDetails',
        urlDisplay: '/v1/blocks/{block_hash}',
        url: 'Blocks/get_v1_blocks__block_hash_',
        method: 'GET',
      },
    ],
  },
  movement: {
    name: 'components.explorerAPI.transactionsList',
    api: [
      {
        name: 'components.explorerAPI.transactionsList',
        urlDisplay: '/v1/transactions',
        url: 'Transactions/get_v1_transactions',
        method: 'GET',
      },
    ],
  },
  tx: {
    name: 'components.explorerAPI.transactionDetails',
    api: [
      {
        name: 'components.explorerAPI.transactionDetails',
        urlDisplay: '/v1/transactions/{txid}',
        url: 'Transactions/get_v1_transactions__txid_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getUsdPrice',
        urlDisplay: '/v1/current-stats/usd-price',
        url: 'The%20latest%20value%20of%20the%20statistics/get_v1_current_stats_usd_price',
        method: 'GET',
      },
    ],
  },
  tickets: {
    name: 'components.explorerAPI.tickets',
    api: [
      {
        name: 'components.explorerAPI.senseTickets',
        urlDisplay: '/v1/tickets/sense',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.cascadeTickets',
        urlDisplay: '/v1/tickets/cascade',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.pastelIDAndUsernameTickets',
        urlDisplay: '/v1/tickets/pastelid-usename',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.pastelNFTTickets',
        urlDisplay: '/v1/tickets/pastel-nft',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.offerTicketsAndTransferTickets',
        urlDisplay: '/v1/tickets/offer-transfer',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.senseAndNFTCollectionTickets',
        urlDisplay: '/v1/tickets/other',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
    ],
  },
  supernodes: {
    name: 'components.explorerAPI.supernodes',
    api: [
      {
        name: 'components.explorerAPI.explorerMapSupernodeStatistics',
        urlDisplay: '/v1/network',
        url: 'Network/get_v1_network',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.supernodeList',
        urlDisplay: '/v1/network?limit=20&offset=0',
        url: 'Network/get_v1_network',
        method: 'GET',
      },
    ],
  },
  richlist: {
    name: 'components.explorerAPI.richlist',
    api: [
      {
        name: 'components.explorerAPI.top100',
        urlDisplay: '/v1/addresses/rank/100',
        url: 'Addresses/get_v1_addresses_rank_100',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getCoinSupply',
        urlDisplay: '/v1/current-stats/coin-supply',
        url: 'The%20latest%20value%20of%20the%20statistics/get_v1_current_stats_coin_supply',
        method: 'GET',
      },
    ],
  },
  statistics: {
    name: 'components.explorerAPI.currentStatistics',
    api: [
      {
        name: 'components.explorerAPI.blocksStatistics',
        urlDisplay: '/v1/stats/blocks-statistics',
        url: 'Current%20Statistics/get_v1_stats_blocks_statistics',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.mempoolModal',
        urlDisplay: '/v1/stats/unconfirmed-blocks',
        url: 'Current%20Statistics/get_v1_stats_unconfirmed_blocks',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.blockSizes',
        urlDisplay: '/v1/stats/block-sizes',
        url: 'Current%20Statistics/get_v1_stats_block_sizes',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.hashrate',
        urlDisplay: '/v1/stats/hashrate',
        url: 'Current%20Statistics/get_v1_stats_hashrate',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.volumeOfTransactions',
        urlDisplay: '/v1/stats/volume-of-transactions',
        url: 'Current%20Statistics/get_v1_stats_volume_of_transactions',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.incomingTransactions',
        urlDisplay: '/v1/stats/incoming-transactions',
        url: 'Current%20Statistics/get_v1_stats_incoming_transactions',
        method: 'GET',
      },
    ],
  },
  cascadeAndSenseStatistics: {
    name: 'components.explorerAPI.cascadeAndSenseStatistics',
    api: [
      {
        name: 'components.explorerAPI.averageRarenessScoreOnSense',
        urlDisplay: '/v1/stats/average-rareness-score-on-sense',
        url: 'Cascade%20and%20Sense%20Statistics/get_v1_stats_average_rareness_score_on_sense',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.senseRequests',
        urlDisplay: '/v1/stats/sense-requests',
        url: 'Cascade%20and%20Sense%20Statistics/get_v1_stats_sense_requests',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.totalFingerprintsOnSense',
        urlDisplay: '/v1/stats/total-fingerprints-on-sense',
        url: 'Cascade%20and%20Sense%20Statistics/get_v1_stats_total_fingerprints_on_sense',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.averageSizeOfNFTStoredOnCascade',
        urlDisplay: '/v1/stats/average-size-of-nft-stored-on-cascade',
        url: 'Cascade%20and%20Sense%20Statistics/get_v1_stats_average_size_of_nft_stored_on_cascade',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.cascadeRequests',
        urlDisplay: '/v1/stats/cascade-requests',
        url: 'Cascade%20and%20Sense%20Statistics/get_v1_stats_cascade_requests',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.totalDataStoredOnCascade',
        urlDisplay: '/v1/stats/total-data-stored-on-cascade',
        url: 'Cascade%20and%20Sense%20Statistics/get_v1_stats_total_data_stored_on_cascade',
        method: 'GET',
      },
    ],
  },
  address: {
    name: 'components.explorerAPI.addressDetails',
    api: [
      {
        name: 'components.explorerAPI.overview',
        urlDisplay: '/v1/stats/balance-history/{psl_address}',
        url: 'Other%20statistics/get_v1_stats_balance_history__psl_address_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.receivedByMonth',
        urlDisplay: '/v1/stats/direction/{psl_address}',
        url: 'Other%20statistics/get_v1_stats_direction__psl_address_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.transactions',
        urlDisplay: '/v1/addresses/latest-transactions/{psl_address}',
        url: 'Addresses/get_v1_addresses_latest_transactions__psl_address_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.downloadCSV',
        urlDisplay: '/v1/addresses/download-csv/{psl_address}',
        url: 'Addresses/get_v1_addresses_download_csv__psl_address_',
        method: 'GET',
      },
    ],
  },
  ticketsTypeSense: {
    name: 'components.explorerAPI.actionRegistrationTicketSense',
    api: [
      {
        name: 'components.explorerAPI.actionRegistrationTicketSense',
        urlDisplay: '/v1/tickets/sense',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getUsdPrice',
        urlDisplay: '/v1/current-stats/usd-price',
        url: 'The%20latest%20value%20of%20the%20statistics/get_v1_current_stats_usd_price',
        method: 'GET',
      },
    ],
  },
  ticketsTypeCascade: {
    name: 'components.explorerAPI.actionRegistrationTicketCascade',
    api: [
      {
        name: 'components.explorerAPI.actionRegistrationTicketCascade',
        urlDisplay: '/v1/tickets/cascade',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getUsdPrice',
        urlDisplay: '/v1/current-stats/usd-price',
        url: 'The%20latest%20value%20of%20the%20statistics/get_v1_current_stats_usd_price',
        method: 'GET',
      },
    ],
  },
  ticketsTypePastelidUsename: {
    name: 'components.explorerAPI.pastelIDAndUsernameTickets',
    api: [
      {
        name: 'components.explorerAPI.pastelIDAndUsernameTickets',
        urlDisplay: '/v1/tickets/pastelid-usename',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
    ],
  },
  ticketsTypePastelNft: {
    name: 'components.explorerAPI.pastelNFTTickets',
    api: [
      {
        name: 'components.explorerAPI.pastelNFTTickets',
        urlDisplay: '/v1/tickets/pastel-nft',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getUsdPrice',
        urlDisplay: '/v1/current-stats/usd-price',
        url: 'The%20latest%20value%20of%20the%20statistics/get_v1_current_stats_usd_price',
        method: 'GET',
      },
    ],
  },
  ticketsTypeOfferTransfer: {
    name: 'components.explorerAPI.offerTicketsAndTransferTickets',
    api: [
      {
        name: 'components.explorerAPI.offerTicketsAndTransferTickets',
        urlDisplay: '/v1/tickets/offer-transfer',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
    ],
  },
  ticketsTypeOther: {
    name: 'components.explorerAPI.senseAndNFTCollectionTickets',
    api: [
      {
        name: 'components.explorerAPI.senseAndNFTCollectionTickets',
        urlDisplay: '/v1/tickets/other',
        url: 'Tickets/get_v1_tickets__ticket_type_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getUsdPrice',
        urlDisplay: '/v1/current-stats/usd-price',
        url: 'The%20latest%20value%20of%20the%20statistics/get_v1_current_stats_usd_price',
        method: 'GET',
      },
    ],
  },
  pastelid: {
    name: 'components.explorerAPI.pastelIDDetails',
    api: [
      {
        name: 'components.explorerAPI.getPastelIDDetail',
        urlDisplay: '/v1/pastelid/{pastelId}',
        url: 'PastelID/get_v1_pastelid__pastelId_',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getUsdPrice',
        urlDisplay: '/v1/current-stats/usd-price',
        url: 'The%20latest%20value%20of%20the%20statistics/get_v1_current_stats_usd_price',
        method: 'GET',
      },
    ],
  },
  cascade: {
    name: 'components.explorerAPI.cascadeDetails',
    api: [
      {
        name: 'components.explorerAPI.getCascadeDetail',
        urlDisplay: '/v1/cascade',
        url: 'Cascade/get_v1_cascade',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getTransfers',
        urlDisplay: '/v1/cascade/transfers',
        url: 'NFTs/get_v1_cascade_transfers',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getPubliclyAccessibleCascadeFileByRegistrationTicketTxid',
        urlDisplay: '/get_publicly_accessible_cascade_file_by_registration_ticket_txid/{txid}',
        fastapi:
          'OpenAPI%20Methods/get_publicly_accessible_cascade_file_by_registration_ticket_txid_get_publicly_accessible_cascade_file_by_registration_ticket_txid__txid__get',
        method: 'GET',
      },
    ],
  },
  sense: {
    name: 'components.explorerAPI.senseDetails',
    api: [
      {
        name: 'components.explorerAPI.getSenseDetail',
        urlDisplay: '/v1/sense',
        url: 'Sense/get_v1_sense',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getTransfers',
        urlDisplay: '/v1/sense/transfers',
        url: 'NFTs/get_v1_sense_transfers',
        method: 'GET',
      },
    ],
  },
  nft: {
    name: 'components.explorerAPI.nftDetails',
    api: [
      {
        name: 'components.explorerAPI.getNFTDetails',
        urlDisplay: '/v1/nfts/details',
        url: 'NFTs/get_v1_nfts_details',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getOffers',
        urlDisplay: '/v1/nfts/offers',
        url: 'NFTs/get_v1_nfts_offers',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getItemActivityList',
        urlDisplay: '/v1/nfts/item-activity',
        url: 'NFTs/get_v1_nfts_item_activity',
        method: 'GET',
      },
    ],
  },
  collection: {
    name: 'components.explorerAPI.collectionDetails',
    api: [
      {
        name: 'components.explorerAPI.getCollectionDetail',
        urlDisplay: '/v1/collections',
        url: 'Collections/get_v1_collections',
        method: 'GET',
      },
      {
        name: 'components.explorerAPI.getCollectionItems',
        urlDisplay: '/v1/collections/items',
        url: 'Collections/get_v1_collections_items',
        method: 'GET',
      },
    ],
  },
  search: {
    name: 'components.explorerAPI.search',
    api: [
      {
        name: 'components.explorerAPI.search',
        urlDisplay: '/v1/search',
        url: 'Search/get_v1_search',
        method: 'GET',
      },
    ],
  },
  blockchainSize: {
    name: 'components.explorerAPI.blockchainSize',
    api: [
      {
        name: 'components.explorerAPI.getBlockchainSize',
        urlDisplay: '/v1/stats/historical-blocks-statistics',
        url: 'Historical%20Statistics/get_v1_stats_historical_blocks_statistics',
        method: 'GET',
      },
    ],
  },
  pslBurnt: {
    name: 'components.explorerAPI.pslBurnt',
    api: [
      {
        name: 'components.explorerAPI.getTotalBurned',
        urlDisplay: '/v1/stats/total-burned',
        url: 'Other%20statistics/get_v1_stats_total_burned',
        method: 'GET',
      },
    ],
  },
  averageBlockSize: {
    name: 'components.explorerAPI.cumulativeOverallAverageBlockSize',
    api: [
      {
        name: 'components.explorerAPI.getAverageBlockSize',
        urlDisplay: '/v1/stats/average-block-size',
        url: 'Historical%20Statistics/get_v1_stats_average_block_size',
        method: 'GET',
      },
    ],
  },
  difficulty: {
    name: 'components.explorerAPI.networkDifficulty',
    api: [
      {
        name: 'components.explorerAPI.getHistoricalStatistics',
        urlDisplay: '/v1/stats/historical-statistics',
        url: 'Historical%20Statistics/get_v1_stats_historical_statistics',
        method: 'GET',
      },
    ],
  },
  price: {
    name: 'components.explorerAPI.price',
    api: [
      {
        name: 'components.explorerAPI.getHistoricalStatistics',
        urlDisplay: '/v1/stats/historical-statistics',
        url: 'Historical%20Statistics/get_v1_stats_historical_statistics',
        method: 'GET',
      },
    ],
  },
  hashrate: {
    name: 'components.explorerAPI.hashrateChart',
    api: [
      {
        name: 'components.explorerAPI.getTheDataForTheHashrate',
        urlDisplay: '/v1/stats/historical-hashrate',
        url: 'Historical%20Statistics/get_v1_stats_historical_hashrate',
        method: 'GET',
      },
    ],
  },
  mempoolSize: {
    name: 'components.explorerAPI.mempoolSize',
    api: [
      {
        name: 'components.explorerAPI.getMempoolInfoList',
        urlDisplay: '/v1/stats/mempool-info-list',
        url: 'Historical%20Statistics/get_v1_stats_mempool_info_list',
        method: 'GET',
      },
    ],
  },
  nettotals: {
    name: 'components.explorerAPI.networkTotal',
    api: [
      {
        name: 'components.explorerAPI.getNettotalsList',
        urlDisplay: '/v1/stats/nettotals-list',
        url: 'Historical%20Statistics/get_v1_stats_nettotals_list',
        method: 'GET',
      },
    ],
  },
  transactionCount: {
    name: 'components.explorerAPI.transactionCount',
    api: [
      {
        name: 'components.explorerAPI.getDataForTheTransactionCount',
        urlDisplay: '/v1/stats/transactions-statistics',
        url: 'Historical%20Statistics/get_v1_stats_transactions_statistics',
        method: 'GET',
      },
    ],
  },
  totalTransactionCount: {
    name: 'components.explorerAPI.totalTransactionCount',
    api: [
      {
        name: 'components.explorerAPI.getTotalTransactionCount',
        urlDisplay: '/v1/stats/transactions-statistics',
        url: 'Historical%20Statistics/get_v1_stats_transactions_statistics',
        method: 'GET',
      },
    ],
  },
  transactionFee: {
    name: 'components.explorerAPI.averageTransactionFee',
    api: [
      {
        name: 'components.explorerAPI.getAverageTransactionFee',
        urlDisplay: '/v1/stats/transactions-statistics',
        url: 'Historical%20Statistics/get_v1_stats_transactions_statistics',
        method: 'GET',
      },
    ],
  },
  transactionPerSecond: {
    name: 'components.explorerAPI.transactionsPerSecond',
    api: [
      {
        name: 'components.explorerAPI.getTransactionPerSecond',
        urlDisplay: '/v1/stats/transaction-per-second',
        url: 'Historical%20Statistics/get_v1_stats_transaction_per_second',
        method: 'GET',
      },
    ],
  },
  transactionInBlock: {
    name: 'components.explorerAPI.transactionsInBlock',
    api: [
      {
        name: 'components.explorerAPI.getBlockList',
        urlDisplay: '/v1/stats/blocks-list',
        url: 'Historical%20Statistics/get_v1_stats_blocks_list',
        method: 'GET',
      },
    ],
  },
  averageTransactionPerBlock: {
    name: 'components.explorerAPI.averageTransactionPerBlock',
    api: [
      {
        name: 'components.explorerAPI.getAverageTransactionsPerBlock',
        urlDisplay: '/v1/stats/historical-blocks-statistics',
        url: 'Historical%20Statistics/get_v1_stats_historical_blocks_statistics',
        method: 'GET',
      },
    ],
  },
  totalTransactionFees: {
    name: 'components.explorerAPI.totalTransactionFees',
    api: [
      {
        name: 'components.explorerAPI.getTotalTransactionFees',
        urlDisplay: '/v1/stats/transactions-statistics',
        url: 'Historical%20Statistics/get_v1_stats_historical_blocks_statistics',
        method: 'GET',
      },
    ],
  },
  totalTransactionsPerDay: {
    name: 'components.explorerAPI.totalTransactionsPerDay',
    api: [
      {
        name: 'components.explorerAPI.getTotalTransactionsPerDay',
        urlDisplay: '/v1/stats/transactions-statistics',
        url: 'Historical%20Statistics/get_v1_stats_historical_blocks_statistics',
        method: 'GET',
      },
    ],
  },
  marketVolumePrice: {
    name: 'components.explorerAPI.marketPriceAndVolume',
    api: [
      {
        name: 'components.explorerAPI.getMarketPriceAndVolume',
        urlDisplay: '/v1/stats/market-price',
        url: 'Historical%20Statistics/get_v1_stats_market_price',
        method: 'GET',
      },
    ],
  },
  marketCapPrice: {
    name: 'components.explorerAPI.marketPriceAndCircCap',
    api: [
      {
        name: 'components.explorerAPI.getMarketPriceAndCircCap',
        urlDisplay: '/v1/stats/market-price',
        url: 'Historical%20Statistics/get_v1_stats_market_price',
        method: 'GET',
      },
    ],
  },
  circulatingSupply: {
    name: 'components.explorerAPI.circulatingSupply',
    api: [
      {
        name: 'components.explorerAPI.getCirculatingSupply',
        urlDisplay: '/v1/stats/circulating-supply',
        url: 'Historical%20Statistics/get_v1_stats_circulating_supply',
        method: 'GET',
      },
    ],
  },
  totalSupply: {
    name: 'components.explorerAPI.totalSupply',
    api: [
      {
        name: 'components.explorerAPI.getTotalSupply',
        urlDisplay: '/v1/stats/accounts',
        url: 'Historical%20Statistics/get_v1_stats_accounts',
        method: 'GET',
      },
    ],
  },
  percentOfPslStaked: {
    name: 'components.explorerAPI.percentOfLSPStaked',
    api: [
      {
        name: 'components.explorerAPI.getPercentOfPSLStaked',
        urlDisplay: '/v1/stats/percent-of-psl-staked',
        url: 'Historical%20Statistics/get_v1_stats_percent_of_psl_staked',
        method: 'GET',
      },
    ],
  },
  accounts: {
    name: 'components.explorerAPI.accounts',
    api: [
      {
        name: 'components.explorerAPI.getAccounts',
        urlDisplay: '/v1/stats/accounts',
        url: 'Historical%20Statistics/get_v1_stats_accounts',
        method: 'GET',
      },
    ],
  },
  feeSchedule: {
    name: 'components.explorerAPI.feeSchedule',
    api: [
      {
        name: 'components.explorerAPI.getFeeSchedule',
        urlDisplay: '/v1/stats/fee-schedule',
        url: 'Historical%20Statistics/get_v1_stats_fee_schedule',
        method: 'GET',
      },
    ],
  },
};

const getNode = (str: string, isCapitalizeAll = false) => {
  if (!str) {
    return '';
  }
  const arr = str.split('-');
  const results: string[] = [];
  arr.forEach((val, index) => {
    if (isCapitalizeAll) {
      results.push(val[0].toUpperCase() + val.slice(1));
    } else if (index === 0) {
      results.push(val);
    } else {
      results.push(val[0].toUpperCase() + val.slice(1));
    }
  });
  return results.join('');
};

export const getApiList = (pathname: string) => {
  let name = 'homePage';
  switch (pathname) {
    case ROUTES.MOVEMENT:
    case ROUTES.RICHLIST:
    case ROUTES.BLOCKS:
    case ROUTES.SUPERNODES:
    case ROUTES.TICKETS:
    case ROUTES.STATISTICS:
      name = pathname.split('/')[1] as string;
      break;
    case ROUTES.CASCADE_AND_SENSE_STATISTICS:
      name = 'cascadeAndSenseStatistics';
      break;
    default:
      break;
  }
  if (pathname.indexOf(ROUTES.TICKETS_TYPE) !== -1) {
    const text = pathname.split('/')[3];
    name = `ticketsType${getNode(text, true)}` as string;
  } else if (pathname.indexOf(ROUTES.STATISTICS_OVERTIME) !== -1) {
    const url = pathname.split('/')[2];
    name = getNode(url);
  } else if (
    pathname.indexOf(ROUTES.ADDRESS_DETAILS) !== -1 ||
    pathname.indexOf(ROUTES.BLOCK_DETAILS) !== -1 ||
    pathname.indexOf(ROUTES.PASTEL_ID_DETAILS) !== -1 ||
    pathname.indexOf(ROUTES.SENSE_DETAILS) !== -1 ||
    pathname.indexOf(ROUTES.CASCADE_DETAILS) !== -1 ||
    pathname.indexOf(ROUTES.COLLECTION_DETAILS_PAGE) !== -1 ||
    pathname.indexOf(ROUTES.NFT_DETAILS) !== -1 ||
    pathname.indexOf(ROUTES.TRANSACTION_DETAILS) !== -1
  ) {
    const url = pathname.split('/')[1];
    name = getNode(url);
  }
  return ApiList[name as keyof typeof ApiList];
};
