// Routes
export const BASE_URL = process.env.REACT_APP_EXPLORER_WEB_API_URL;

// API endpoints
export const SEARCH_URL = `/v1/search`;
export const TRANSACTION_URL = 'v1/transactions';
export const VOLUME_TRANSACTION_URL = 'v1/transactions/chart/volume';
export const INCOMING_TRANSACTION_URL = 'v1/transactions/chart/latest';
export const GET_UNCONFIRMED_TRANSACTIONS = 'v1/transactions/blocks-unconfirmed';
export const GET_TRANSACTIONS_CHARTS = 'v1/transactions/charts';
export const GET_BLOCKS_CHARTS = 'v1/block/charts';
export const BLOCK_URL = 'v1/blocks';
export const ADDRESS_URL = 'v1/addresses';
export const RICHLIST_URL = 'v1/addresses/rank/100';
export const NETWORK_URL = 'v1/network';
export const SUMMARY_URL = 'v1/stats';
export const HASHRATE_URL = 'v1/block/chart/hashrate';
export const GET_STATISTICS = 'v1/stats/list';
export const GET_STATISTICS_PRICE = 'v1/stats/prices-list';
export const GET_STATISTICS_HASHRATE = 'v1/stats/mining-list';
export const GET_STATISTICS_RAW_MEM_POOL = 'v1/stats/average-fee-of-transaction';
export const GET_STATISTICS_MEMPOOL_INFO = 'v1/stats/mempool-info-list';
export const GET_STATISTICS_NETTOTALS = 'v1/stats/nettotals-list';
export const GET_STATISTICS_TRANSACTIONS_IN_BLOCK = 'v1/stats/blocks-list';
export const GET_STATISTICS_AVERAGE_BLOCK_SIZE = 'v1/stats/average-block-size';
export const GET_STATISTICS_TRANSACTION_PER_SECOND = 'v1/stats/transaction-per-second';
export const GET_STATISTICS_MINING_CHARTS = 'v1/stats/mining-charts';
// External URLS
export const TWITTER_URL = 'https://twitter.com/pastelnetwork';
export const TELEGRAM_URL = 'https://t.me/PastelNetwork';
export const GITHUB_URL = 'https://github.com/pastelnetwork';
