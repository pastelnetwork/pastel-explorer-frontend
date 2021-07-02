import {
  TMultiLineChartData,
  TMiningInfo,
  TLineChartData,
  TRawMempool,
  IStatistic,
  TMempoolInfo,
  TNettotalsInfo,
  TScatterChartData,
  TAverageBlockSize,
  TTransactionPerSecond,
} from '@utils/types/IStatistics';
import { IBlock } from '@utils/types/IBlocks';

export type PeriodTypes = '2h' | '2d' | '4d' | '30d' | '60d' | '180d' | '1y' | 'all';
export type TGranularity = '1d' | '30d' | '1y' | 'all';

export const makeDownloadFileName = (currencyName: string | number, title: string): string => {
  let imageTitle = '';
  const date = new Date();

  if (title === 'Network Difficulty') {
    imageTitle = 'Network_Difficulty';
  } else if (title === 'PSL Prices') {
    imageTitle = 'Prices';
  }

  const dateTime = `${
    date.getMonth() + 1
  }_${date.getDate()}_${date.getFullYear()}__${date.getHours()}_${date.getMinutes()}`;

  return `${currencyName}_${imageTitle}_${dateTime}`;
};

export function getStartPoint(period: PeriodTypes): number {
  let duration = 1;
  switch (period) {
    case '2h':
      duration = 2;
      break;
    case '2d':
      duration = 2 * 24;
      break;
    case '4d':
      duration = 4 * 24;
      break;
    case '30d':
      duration = 30 * 24;
      break;
    case '60d':
      duration = 60 * 24;
      break;
    case '180d':
      duration = 180 * 24;
      break;
    case '1y':
      duration = 360 * 24;
      break;
    case 'all':
      return 0;
    default:
      duration = 2;
      return 0;
  }
  return Date.now() - duration * 60 * 60 * 1000;
}

export function transformDifficultyInfo(
  difficulties: IStatistic[],
  // period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];

  // const startDate = getStartPoint(period);

  for (let i = 0; i < difficulties.length; i += 1) {
    if (difficulties[i].timestamp !== null) {
      const createTime = Number(difficulties[i].timestamp);
      // if (createTime > startDate) {
      dataY.push(Number(difficulties[i].difficulty));
      dataX.push(new Date(createTime).toLocaleString());
      // }
    }
  }

  return { dataX, dataY };
}

export function transformPriceInfo(prices: IStatistic[]): TMultiLineChartData {
  const dataX: string[] = [];
  const dataY1: number[] = [];
  const dataY2: number[] = [];

  // const startDate = getStartPoint(period);

  for (let i = 0; i < prices.length; i += 1) {
    const createTime = Number(prices[i].timestamp);
    // if (createTime > startDate) {
    const usd = Number(prices[i].usdPrice);
    const btc = Number(prices[i].btcPrice);
    dataY1.push(usd);
    dataY2.push(btc);
    dataX.push(new Date(createTime).toLocaleString());
    // }
  }
  return { dataX, dataY1, dataY2 };
}

export function transformHashrateInfo(
  hashrateInfo: TMiningInfo[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];

  const startDate = getStartPoint(period);

  for (let i = 0; i < hashrateInfo.length; i += 1) {
    if (hashrateInfo[i].timestamp !== null) {
      const createTime = Number(hashrateInfo[i].timestamp);
      if (createTime > startDate) {
        dataY.push(Number(hashrateInfo[i].networksolps) / 1000000);
        dataX.push(new Date(createTime).toLocaleString());
      }
    }
  }

  return { dataX, dataY };
}

export function transformTransactionFee(
  transactionFees: TRawMempool[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];

  const startDate = getStartPoint(period);

  for (let i = 0; i < transactionFees.length; i += 1) {
    if (transactionFees[i].timestamp !== null && transactionFees[i].fee !== 0) {
      const createTime = Number(transactionFees[i].timestamp);
      if (createTime > startDate) {
        dataY.push(Number(transactionFees[i].fee));
        dataX.push(new Date(createTime).toLocaleString());
      }
    }
  }
  return { dataX, dataY };
}

export function transformMempoolInfo(mempoolInfo: TMempoolInfo[]): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < mempoolInfo.length; i += 1) {
    if (mempoolInfo[i].usage !== null && mempoolInfo[i].timestamp !== 0) {
      const createTime = Number(mempoolInfo[i].timestamp);
      const bytes = Number(mempoolInfo[i].usage) / 1000;
      dataY.push(bytes);
      dataX.push(new Date(createTime).toLocaleString());
    }
  }
  return { dataX, dataY };
}

export function transformNetTotals(nettotals: TNettotalsInfo[]): TMultiLineChartData {
  const dataX: string[] = [];
  const dataY1: number[] = [];
  const dataY2: number[] = [];
  for (let i = 0; i < nettotals.length; i += 1) {
    if (nettotals[i].timemillis !== null) {
      const createTime = Number(nettotals[i].timemillis);
      const recv = Number(nettotals[i].totalbytesrecv);
      const sent = Number(nettotals[i].totalbytessent);
      dataY1.push(recv);
      dataY2.push(sent);
      dataX.push(new Date(createTime).toLocaleString());
    }
  }
  return { dataX, dataY1, dataY2 };
}

export function transformBlocks(blocks: IBlock[]): TScatterChartData {
  const data: number[][] = [];
  const dataX: string[] = [];
  for (let i = 0; i < blocks.length; i += 1) {
    const createTime = Number(blocks[i].timestamp * 1000);
    const xAxisValue = Number(blocks[i].height);
    const yAxisValue = blocks[i].transactionCount;
    data.push([xAxisValue, yAxisValue]);
    dataX.push(new Date(createTime).toLocaleString());
  }
  return { data, dataX };
}

export function transformAverageBlockSize(blockSizes: TAverageBlockSize[]): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < blockSizes.length; i += 1) {
    const size = Number(blockSizes[i].size) / 1000;
    dataY.push(size);
    dataX.push(blockSizes[i].time);
  }
  return { dataX, dataY };
}

export function transformTransactionPerSecond(trans: TTransactionPerSecond[]): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    const size = Number(trans[i].size) / (24 * 3600);
    dataY.push(size);
    dataX.push(trans[i].time);
  }
  return {
    dataX,
    dataY,
  };
}
