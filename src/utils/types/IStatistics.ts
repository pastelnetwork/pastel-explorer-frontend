export interface IHashRateResponse {
  data: [[number, number]];
}

export interface IStatistic {
  id: string;
  difficulty: number;
  gigaHashPerSec: string;
  nonZeroAddressesCount: number;
  avgTransactionsPerSecond: number;
  coinSupply: number;
  btcPrice: number;
  usdPrice: number;
  marketCapInUSD: number;
  transactions: number;
  timestamp: number;
}
export interface IDifficulty {
  id: string;
  difficulty: number;
  solutions: number;
  timestamp: number;
}

export interface IPlsPrice {
  id: string;
  price_usd: number;
  timestamp: number;
}
export interface IPslPrice {
  id: string;
  price_usd: number;
  timestamp: number;
}

export type TLineChartData = {
  dataX: string[];
  dataY: number[];
};

export type TMultiLineChartData = {
  dataX: string[];
  dataY1: number[];
  dataY2: number[];
};

export type TMiningInfo = {
  id: string;
  blocks: number;
  currentblocksize: number;
  currentblocktx: number;
  difficulty: number;
  errors: string;
  genproclimit: number;
  localsolps: number;
  networksolps: number;
  networkhashps: number;
  pooledtx: number;
  testnet: number;
  chain: string;
  generate: boolean;
  timestamp: number;
};

export type TRawMempoolInfo = {
  [index: string]: {
    transactionid: string;
    size: number;
    fee: number;
    time: number;
    height: number;
    startingpriority: number;
    currentpriority: number;
    depends: TRawMempoolInfo[];
  };
};

export type TRawMempool = {
  id: string;
  transactionid: string;
  size: number;
  fee: number;
  time: number;
  height: number;
  startingpriority: number;
  currentpriority: number;
  depends: string;
  timestamp: number;
};

export type TStatisticsInfo = {
  connections: number;
  currencyName: string;
  disconnected: boolean;
  latestBlock: number;
  pslPrice: number | undefined;
  solps: number;
  testnet: boolean;
  verificationProgress: number;
  version: number;
};
