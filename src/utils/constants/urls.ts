// Routes
export const BASE_URL = process.env.REACT_APP_EXPLORER_WEB_API_URL;

// API endpoints
export const SEARCH_URL = `/v1/search`;
export const TRANSACTION_URL = 'v1/transactions';
export const VOLUME_TRANSACTION_URL = 'v1/transactions/chart/volume';
export const INCOMING_TRANSACTION_URL = 'v1/transactions/chart/latest';
export const BLOCK_URL = 'v1/blocks';
export const ADDRESS_URL = 'v1/addresses';
export const RICHLIST_URL = 'v1/addresses/rank/100';
export const NETWORK_URL = 'v1/network';
export const SUMMARY_URL = 'v1/stats';
export const HASHRATE_URL = 'v1/block/chart/hashrate';
export const GET_STATISTICS = 'v1/stats/list';
export const GET_STATISTICS_PRICE = 'v1/stats/prices-list';
export const GET_STATISTICS_HASHRATE = 'v1/stats/mining-list';
export const GET_STATISTICS_RAW_MEM_POOL = 'v1/stats/raw-mem-pool-list';

// External URLS
export const TWITTER_URL = 'https://twitter.com/pastelnetwork';
export const TELEGRAM_URL = 'https://t.me/PastelNetwork';
export const GITHUB_URL = 'https://github.com/pastelnetwork';
