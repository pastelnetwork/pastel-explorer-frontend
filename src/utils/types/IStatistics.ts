export interface IHashRateResponse {
  data: [[number | string, number]];
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

export type TScatterChartData = {
  data: number[][];
  dataX: string[];
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
  size: number;
  fee: number;
  time: string;
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

export type TMempoolInfo = {
  id: string;
  size: number;
  bytes: number;
  usage: number;
  timestamp: number;
};

export type TNettotalsInfo = {
  id: string;
  totalbytesrecv: number;
  totalbytessent: number;
  timemillis: number;
  timestamp: number;
};

export type TAverageBlockSize = {
  time: number;
  size: number;
  maxTime: number;
  minTime: number;
};

export type TTransactionPerSecond = TAverageBlockSize;

export type TChartResponseItem = {
  label: string;
  value: number;
};

export type TTransactionsChart = TChartResponseItem;

type MarketChartItem = [number, number];

export type MarketCoinRespone = {
  prices: MarketChartItem[];
  market_caps: MarketChartItem[];
  total_volumes: MarketChartItem[];
};

export type TChartStatisticsResponse = {
  time: number;
  value: number;
};

export type TAnalyticsChartResponse = {
  data: {
    maxValue: number;
    value: number;
  };
};

export type TAnalyticsChartData = {
  maxValue: number;
  value: number;
};

export type THashrate = {
  id: string;
  networksolps5: number;
  networksolps10: number;
  networksolps25: number;
  networksolps50: number;
  networksolps100: number;
  networksolps500: number;
  networksolps1000: number;
  timestamp: number;
};

export type TSolpsData = {
  solps5: number[];
  solps10: number[];
  solps25: number[];
  solps50: number[];
  solps100: number[];
  solps500: number[];
  solps1000: number[];
};

export type THashrateChartData = {
  dataX: string[];
  networksolps: TSolpsData;
};

export type TChartParams = {
  data: number;
  dataIndex: number;
  axisValue: string;
  axisValueLabel: string;
  marker: string;
  name: string;
  value: number;
  seriesName: string;
};

export type TMinMaxChartData = {
  min: number;
  max: number;
};

export type TCacheValue = {
  [key: string]: THashrateChartData | TLineChartData;
};
