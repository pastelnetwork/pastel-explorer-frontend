export interface ISummaryStats {
  id: string;
  difficulty: number;
  gigaHashPerSec: string;
  coinSupply: number;
  btcPrice: number;
  usdPrice: number;
  marketCapInUSD: number;
  transactions: number;
  timestamp: number;
  avgTransactionsPerSecond: number;
  nonZeroAddressesCount: number;
}

export type TSummaryChartProps = {
  time: number;
  value: number;
};

export type TSummaryChartPriceProps = {
  time: number;
  usdPrice: number;
  btcPrice: number;
};

export interface ISummaryChartStats {
  gigaHashPerSec: TSummaryChartProps[];
  difficulty: TSummaryChartProps[];
  coinSupply: TSummaryChartProps[];
  usdPrice: TSummaryChartPriceProps[];
  nonZeroAddressesCount: TSummaryChartProps[];
  avgTransactionsPerSecond: TSummaryChartProps[];
  avgBlockSizeLast24Hour: TSummaryChartProps[];
  avgTransactionPerBlockLast24Hour: TSummaryChartProps[];
  avgTransactionFeeLast24Hour: TSummaryChartProps[];
  memPoolSize: TSummaryChartProps[];
}

export interface ISummary {
  currentStats: ISummaryStats;
  lastDayStats: ISummaryStats;
  chartStats: ISummaryChartStats;
}
