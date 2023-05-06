// Routes
export const BASE_URL = process.env.REACT_APP_EXPLORER_WEB_API_URL;
export const BASE_URL_TESTNET = process.env.REACT_APP_EXPLORER_WEB_API_URL_TESTNET;
export const BASE_URL_DEVNET = process.env.REACT_APP_EXPLORER_WEB_API_URL_DEVNET;
export const DEFAULT_API_URL = process.env.REACT_APP_EXPLORER_DEFAULT_API_URL;

// API endpoints
export const SEARCH_URL = `/v1/search`;
export const TRANSACTION_URL = 'v1/transactions';
export const VOLUME_TRANSACTION_URL = 'v1/stats/volume-of-transactions';
export const INCOMING_TRANSACTION_URL = 'v1/stats/incoming-transactions';
export const GET_UNCONFIRMED_TRANSACTIONS = 'v1/stats/unconfirmed-blocks';
export const GET_TRANSACTIONS_CHARTS = 'v1/stats/transactions-statistics';
export const GET_BLOCKS_CHARTS = 'v1/stats/historical-blocks-statistics';
export const BLOCK_URL = 'v1/blocks';
export const BLOCK_SIZE_URL = 'v1/stats/block-sizes';
export const STATISTICS_BLOCK_URL = 'v1/stats/blocks-statistics';
export const RICHLIST_URL = 'v1/addresses/rank/100';
export const BALANCE_HISTORY_URL = 'v1/stats/balance-history';
export const LATEST_TRANSACTIONS_URL = 'v1/addresses/latest-transactions';
export const DIRECTION_URL = 'v1/stats/direction';
export const NETWORK_URL = 'v1/network';
export const SUMMARY_URL = 'v1/stats/live-dashboard-statistics';
export const GET_STATISTICS_HASHRATE = 'v1/stats/hashrate';
export const GET_STATISTICS_MEMPOOL_INFO = 'v1/stats/mempool-info-list';
export const GET_STATISTICS_NETTOTALS = 'v1/stats/nettotals-list';
export const GET_STATISTICS_TRANSACTIONS_IN_BLOCK = 'v1/stats/blocks-list';
export const GET_STATISTICS_AVERAGE_BLOCK_SIZE = 'v1/stats/average-block-size';
export const GET_STATISTICS_TRANSACTION_PER_SECOND = 'v1/stats/transaction-per-second';
export const GET_STATISTICS_MINING_CHARTS = 'v1/stats/historical-hashrate';
export const GET_STATISTICS_MARKET_PRICE = 'v1/stats/market-price';
export const GET_STATISTICS_CIRCULATING_SUPPLY = 'v1/stats/circulating-supply';
export const GET_STATISTICS_PERCENT_OF_PSL_STAKED = 'v1/stats/percent-of-psl-staked';
export const GET_STATISTICS_ACCOUNTS = 'v1/stats/accounts';
export const GET_HISTORICAL_STATISTICS = 'v1/stats/historical-statistics';
export const SENSE_URL = 'v1/sense';
export const PASTEL_ID_URL = 'v1/pastelid';
export const GET_TICKETS = 'v1/tickets';
export const GET_STATISTICS_AVERAGE_RARENESS_SCORE_ON_SENSE =
  'v1/stats/average-rareness-score-on-sense';
export const GET_STATISTICS_SENSE_REQUESTS = 'v1/stats/sense-requests';
export const GET_STATISTICS_TOTAL_FINGERPRINTS_ON_SENSE = 'v1/stats/total-fingerprints-on-sense';
export const GET_STATISTICS_AVERAGE_SIZE_OF_NFT_STORED_ON_CASCADE =
  'v1/stats/average-size-of-nft-stored-on-cascade';
export const GET_STATISTICS_CASCADE_REQUEST = 'v1/stats/cascade-requests';
export const GET_STATISTICS_TOTAL_DATA_STORED_ON_CASCADE = 'v1/stats/total-data-stored-on-cascade';
export const GET_BURNED_BY_MONTH = 'v1/stats/burned-by-month';
export const GET_TOTAL_BURNED = 'v1/stats/total-burned';
export const GET_COIN_SUPPLY = 'v1/current-stats/coin-supply';
export const GET_USD_PRICE = 'v1/current-stats/usd-price';
export const CASCADE_URL = 'v1/cascade';
// External URLS
export const TWITTER_URL = 'https://twitter.com/pastelnetwork';
export const TELEGRAM_URL = 'https://t.me/PastelNetwork';
export const GITHUB_URL = 'https://github.com/pastelnetwork';
export const DISCORD_URL = 'https://discord.com/invite/qudewKS3kp';
export const MEDIUM_URL = 'https://medium.com/pastelnetwork';
