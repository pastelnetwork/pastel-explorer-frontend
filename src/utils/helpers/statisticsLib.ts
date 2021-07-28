import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import {
  TMultiLineChartData,
  TMiningInfo,
  TLineChartData,
  IStatistic,
  TMempoolInfo,
  TNettotalsInfo,
  TScatterChartData,
  TAverageBlockSize,
  TTransactionPerSecond,
  IHashRateResponse,
  TTransactionsChart,
  TChartResponseItem,
} from '@utils/types/IStatistics';
import { IBlock } from '@utils/types/IBlocks';
import { formattedDate } from '@utils/helpers/date/date';
import { IRawTransactions, ITransactionState } from '@utils/types/ITransactions';
import { ISocketData } from '@utils/types/ISocketData';

export type PeriodTypes =
  | '1h'
  | '2h'
  | '3h'
  | '6h'
  | '12h'
  | '2d'
  | '4d'
  | '30d'
  | '60d'
  | '180d'
  | '1y'
  | 'all';
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

export function transformHashrateInfo(hashrateInfo: TMiningInfo[]): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];

  for (let i = 0; i < hashrateInfo.length; i += 1) {
    if (hashrateInfo[i].timestamp !== null) {
      const createTime = Number(hashrateInfo[i].timestamp);
      dataY.push(+(Number(hashrateInfo[i].networksolps) / 10e3).toFixed(2));
      dataX.push(new Date(createTime).toLocaleString());
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

export const transformChartData = (
  { data }: IHashRateResponse,
  isHourMinute = true,
): TLineChartData => {
  const dataX: string[] = [];
  const dataY: number[] = [];
  data.forEach(([time, value]: [number | string, number]) => {
    if (typeof time === 'string') {
      dataX.push(time);
    } else {
      const date = isHourMinute
        ? format(fromUnixTime(time), 'HH:mm')
        : formattedDate(time, { onlyDayMonthYear: true });
      dataX.push(date);
    }
    dataY.push(Math.round((value + Number.EPSILON) * 1000) / 1000);
  });
  return { dataX, dataY };
};

export function transformCharts(data: TChartResponseItem[], range = 1): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  data.forEach(({ value, label }) => {
    dataX.push(label);
    dataY.push(+(value / range).toFixed(2));
  });
  return { dataX, dataY };
}

export function transformBlockchainSize(data: TTransactionsChart[]): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  dataX.push(data[0].label);
  dataY.push(+(data[0].value / 10e6).toFixed(2));
  if (data.length > 1) {
    for (let i = 1; i < data.length; i += 1) {
      const { value, label } = data[i];
      dataX.push(label);
      dataY.push(+(dataY[i - 1] + +(value / 10e6).toFixed(2)).toFixed(2));
    }
  }

  return { dataX, dataY };
}

export function transformTotalTransactionCount(data: TChartResponseItem[]) {
  const dataX: string[] = [];
  const dataY: number[] = [];
  dataX.push(data[0].label);
  dataY.push(data[0].value);
  if (data.length > 1) {
    for (let i = 1; i < data.length; i += 1) {
      const { value, label } = data[i];
      const newValue = dataY[i - 1] + value;
      dataY.push(newValue);
      dataX.push(label);
    }
  }
  return {
    dataX,
    dataY,
  };
}

export function convertYAxisLabel(value: number, maxY: number): number | string {
  if (maxY > 1000000000) {
    return `${(value / 1000000000).toFixed(1)} B`;
  }
  if (maxY > 1000000) {
    return `${(value / 1000000).toFixed(1)} M`;
  }
  if (maxY > 1000) {
    return `${(value / 1000).toFixed(1)} K`;
  }
  return value;
}

export function setTransactionsLive(
  prev: Map<string, ITransactionState>,
  { rawTransactions = [], unconfirmedTransactions = [], blocks }: ISocketData,
) {
  const newTxs: Map<string, ITransactionState> = new Map();

  if (rawTransactions.length > 0) {
    let height: number;
    if (blocks && blocks.length) {
      height = blocks[0].height;
    }
    rawTransactions.forEach((item: IRawTransactions) => {
      let pslPrice = 0;
      item.vout.forEach(({ value }) => {
        pslPrice += value;
      });
      newTxs.set(item.txid, {
        ...item,
        pslPrice: +pslPrice.toFixed(2),
        recepients: item.vout.length,
        height,
      });
    });
    return newTxs;
  }
  if (unconfirmedTransactions.length) {
    unconfirmedTransactions.forEach((item: IRawTransactions) => {
      let pslPrice = 0;
      item.vout.forEach(({ value }) => {
        pslPrice += value;
      });
      newTxs.set(item.txid, {
        ...item,
        pslPrice: +pslPrice.toFixed(2),
        recepients: item.vout.length,
      });
    });
  }
  if (prev.size > 0) {
    prev.forEach((value, key) => {
      newTxs.set(key, value);
    });
  }
  return newTxs;
}
