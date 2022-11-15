// import * as echarts from 'echarts';
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
  TChartStatisticsResponse,
  TAnalyticsChartResponse,
  TAnalyticsChartData,
  THashrate,
  TSolpsData,
  THashrateChartData,
  TMinMaxChartData,
} from '@utils/types/IStatistics';
import { IBlock } from '@utils/types/IBlocks';
import { formattedDate } from '@utils/helpers/date/date';
import { IRawTransactions, ITransaction } from '@utils/types/ITransactions';
import { ISocketData } from '@utils/types/ISocketData';
import { getCurrencyName } from '../appInfo';

export type PeriodTypes =
  | '1h'
  | '24h'
  | '2h'
  | '3h'
  | '6h'
  | '12h'
  | '1d'
  | '2d'
  | '4d'
  | '7d'
  | '14d'
  | '30d'
  | '60d'
  | '90d'
  | '180d'
  | '1y'
  | 'max'
  | 'all';
export type TGranularity = '1d' | '30d' | '1y' | 'all' | 'none';

export const periodShowTime = ['24h', '7d', '14d'];

export const makeDownloadFileName = (currencyName: string | number, title: string): string => {
  let imageTitle = '';
  const date = new Date();

  if (title === 'Network Difficulty') {
    imageTitle = 'Network_Difficulty';
  } else if (title === `${getCurrencyName()} Prices`) {
    imageTitle = 'Prices';
  }

  const dateTime = `${
    date.getMonth() + 1
  }_${date.getDate()}_${date.getFullYear()}__${date.getHours()}_${date.getMinutes()}`;

  return `${currencyName}_${imageTitle}_${dateTime}`;
};

const checkValidateData = (timestamp: number) => {
  const nowHour = format(new Date(), 'MM/dd/yyyy HH');
  const targetHour = format(timestamp, 'MM/dd/yyyy HH');
  if (nowHour !== targetHour) {
    return new Date().toLocaleString();
  }

  return null;
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
    case '90d':
      duration = 90 * 24;
      break;
    case '180d':
      duration = 180 * 24;
      break;
    case '1y':
      duration = 360 * 24;
      break;
    case 'all':
    case 'max':
      return 0;
    default:
      duration = 2;
      return 0;
  }
  return Date.now() - duration * 60 * 60 * 1000;
}

export function transformDifficultyInfo(
  difficulties: IStatistic[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];

  for (let i = 0; i < difficulties.length; i += 1) {
    if (difficulties[i].timestamp !== null) {
      dataY.push(Number(difficulties[i].difficulty));
      dataX.push(format(Number(difficulties[i].timestamp), 'MM/dd/yyyy hh:mm aa'));
    }
  }
  if (period === '24h' && checkValidateData(difficulties[difficulties.length - 1].timestamp)) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy hh:mm aa') || '');
    dataY.push(difficulties[difficulties.length - 1].difficulty);
  }

  return { dataX, dataY };
}

export function transformPriceInfo(prices: IStatistic[], period: PeriodTypes): TMultiLineChartData {
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
    dataX.push(
      periodShowTime.indexOf(period) !== -1
        ? new Date(createTime).toLocaleString()
        : format(createTime, 'MM/dd/yyyy'),
    );
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

export function transformMempoolInfo(
  mempoolInfo: TMempoolInfo[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < mempoolInfo.length; i += 1) {
    if (mempoolInfo[i].usage !== null && mempoolInfo[i].timestamp !== 0) {
      const createTime = Number(mempoolInfo[i].timestamp);
      const bytes = Number(mempoolInfo[i].usage) / 1000;
      dataY.push(bytes);
      dataX.push(
        periodShowTime.indexOf(period) !== -1
          ? new Date(createTime).toLocaleString()
          : format(createTime, 'MM/dd/yyyy'),
      );
    }
  }
  return { dataX, dataY };
}

export function transformNetTotals(
  nettotals: TNettotalsInfo[],
  period: PeriodTypes,
): TMultiLineChartData {
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
      dataX.push(
        periodShowTime.indexOf(period) !== -1
          ? new Date(createTime).toLocaleString()
          : format(createTime, 'MM/dd/yyyy'),
      );
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

export function transformAverageBlockSize(
  blockSizes: TAverageBlockSize[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < blockSizes.length; i += 1) {
    const size = Number(blockSizes[i].size) / 10e6;
    dataY.push(size);
    if (i !== blockSizes.length - 1) {
      dataX.push(format(blockSizes[i].minTime * 1000, 'MM/dd/yyyy HH:mm'));
    } else {
      dataX.push(format(blockSizes[i].maxTime * 1000, 'MM/dd/yyyy HH:mm'));
    }
  }
  if (period === '24h' && checkValidateData(blockSizes[blockSizes.length - 1].time * 1000)) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy HH:mm'));
    dataY.push(0);
  }
  return { dataX, dataY };
}

export function transformTransactionPerSecond(
  trans: TTransactionPerSecond[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    const size = Number(trans[i].size) / (24 * 3600);
    dataY.push(size);
    dataX.push(
      periodShowTime.indexOf(period) !== -1
        ? new Date(trans[i].time).toLocaleString()
        : format(Number(trans[i].time), 'MM/dd/yyyy'),
    );
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

export function transformTotalData(data: TTransactionsChart[], range = 10e6): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  dataX.push(data[0].label);
  dataY.push(+(data[0].value / range).toFixed(2));
  if (data.length > 1) {
    for (let i = 1; i < data.length; i += 1) {
      const { value, label } = data[i];
      dataX.push(label);
      dataY.push(+(dataY[i - 1] + +(value / range).toFixed(2)).toFixed(2));
    }
  }

  return { dataX, dataY };
}

export function transformBlockchainSizeData(
  data: TTransactionsChart[],
  period: PeriodTypes,
  startValue: number,
  endValue: number,
  range = 10e6,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  let preValue = startValue;
  for (let i = 0; i < data.length; i += 1) {
    let value = data[i].value + preValue;
    if (i === data.length - 1) {
      value = endValue;
    }
    dataX.push(new Date(parseInt(data[i].label, 10)).toLocaleString());
    dataY.push(parseFloat((value / range).toFixed(2)));
    preValue += data[i].value;
  }
  if (period === '24h' && checkValidateData(parseInt(data[data.length - 1].label, 10))) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
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

export function convertYAxisLabel(
  value: number,
  maxY: number,
  fractionDigits = 1,
): number | string {
  if (value === 0) {
    return value;
  }
  if (maxY > 1000000000) {
    return `${(value / 1000000000).toFixed(fractionDigits)}B`;
  }
  if (maxY > 1000000) {
    return `${(value / 1000000).toFixed(fractionDigits)}M`;
  }
  if (maxY > 1000) {
    return `${(value / 1000).toFixed(fractionDigits)}K`;
  }
  if (value > 0 && value < 1) {
    return value.toFixed(fractionDigits);
  }
  return value;
}

export function setTransactionsLive(
  prev: Map<string, ITransaction>,
  { rawTransactions = [], unconfirmedTransactions = [], blocks }: ISocketData,
) {
  const newTxs: Map<string, ITransaction> = new Map();

  if (rawTransactions.length > 0) {
    const block = blocks[0];
    rawTransactions.forEach((item: IRawTransactions) => {
      let pslPrice = 0;
      item.vout.forEach(({ value }) => {
        pslPrice += value;
      });
      const fee = prev.get(item.txid)?.fee || item.fee || 0;
      newTxs.set(item.txid, {
        // ...item,
        block: {
          height: `${block.height || ''}`,
          confirmations: block.confirmations,
        },
        blockHash: block.hash,
        coinbase: 0,
        id: item.txid,
        isNonStandard: 1,
        rawData: '',
        fee,
        height: block.height,
        totalAmount: +pslPrice.toFixed(2),
        recipientCount: item.vout.length,
        timestamp: item.time,
        size: item.size || 0,
      });
    });
    // return newTxs;
  }
  if (unconfirmedTransactions.length) {
    unconfirmedTransactions.forEach((item: IRawTransactions) => {
      let pslPrice = 0;
      item.vout.forEach(({ value }) => {
        pslPrice += value;
      });
      const fee = prev.get(item.txid)?.fee || item.fee || 0;
      newTxs.set(item.txid, {
        block: {
          height: '',
          confirmations: 0,
        },
        blockHash: item.blockhash || '',
        coinbase: 0,
        id: item.txid,
        isNonStandard: 1,
        rawData: '',
        fee,
        height: 0,
        totalAmount: +pslPrice.toFixed(2),
        recipientCount: item.vout.length,
        timestamp: item.time,
        size: item.size || 0,
      });
    });
  }
  if (prev.size > 0) {
    let i = newTxs.size;
    prev.forEach((value, key) => {
      if (i < 6) {
        if (!newTxs.get(key)) {
          newTxs.set(key, value);
          i += 1;
        }
      }
    });
  }
  return newTxs;
}

export function transformStatisticsChart(
  trans: TChartStatisticsResponse[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    const value = Number(trans[i].value);
    dataY.push(value);
    dataX.push(
      periodShowTime.indexOf(period) !== -1
        ? new Date(trans[i].time).toLocaleString()
        : format(trans[i].time, 'MM/dd/yyyy'),
    );
  }
  return {
    dataX,
    dataY,
  };
}

export function transformAccountDataChart(
  trans: IStatistic[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    dataY.push(Number(trans[i].nonZeroAddressesCount));
    dataX.push(
      periodShowTime.indexOf(period) !== -1
        ? new Date(trans[i].timestamp).toLocaleString()
        : format(trans[i].timestamp, 'MM/dd/yyyy'),
    );
  }
  return {
    dataX,
    dataY,
  };
}

export function transformTotalSupplyDataChart(
  trans: IStatistic[],
  period: PeriodTypes,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    dataY.push(Number(trans[i].coinSupply));
    dataX.push(
      periodShowTime.indexOf(period) !== -1
        ? new Date(trans[i].timestamp).toLocaleString()
        : format(trans[i].timestamp, 'MM/dd/yyyy'),
    );
  }
  return {
    dataX,
    dataY,
  };
}

export const transformAnalyticsChartData = ({
  data,
}: TAnalyticsChartResponse): TAnalyticsChartData => {
  return { ...data };
};

export const generatePeriodToDropdownOptions = (periods: PeriodTypes[]) => {
  const results = [];
  for (let i = 0; i < periods.length; i += 1) {
    results.push({
      name: `Last ${periods[i]}`,
      value: periods[i],
    });
  }
  return results;
};

export function transformHashRateCharts(
  data: THashrate[],
  period: PeriodTypes,
): THashrateChartData {
  const dataX: string[] = [];
  const networksolps: TSolpsData = {
    solps5: [],
    solps10: [],
    solps25: [],
    solps50: [],
    solps100: [],
    solps500: [],
    solps1000: [],
  };

  data.forEach(item => {
    dataX.push(new Date(item.timestamp).toLocaleString());
    networksolps.solps5.push(item.networksolps5);
    networksolps.solps10.push(item.networksolps10);
    networksolps.solps25.push(item.networksolps25);
    networksolps.solps50.push(item.networksolps50);
    networksolps.solps100.push(item.networksolps100);
    networksolps.solps500.push(item.networksolps500);
    networksolps.solps1000.push(item.networksolps1000);
  });
  if (period === '24h' && checkValidateData(data[data.length - 1].timestamp)) {
    dataX.push(new Date(data[data.length - 1].timestamp).toLocaleString());
    networksolps.solps5.push(0);
    networksolps.solps10.push(0);
    networksolps.solps25.push(0);
    networksolps.solps50.push(0);
    networksolps.solps100.push(0);
    networksolps.solps500.push(0);
    networksolps.solps1000.push(0);
  }
  return { dataX, networksolps };
}

export function convertYAxisLabelWithoutUnit(
  value: number,
  maxY: number,
  fractionDigits = 1,
): number | string {
  if (value === 0) {
    return value;
  }
  if (maxY > 1000000000) {
    return `${(value / 1000000000).toFixed(fractionDigits)}`;
  }
  if (maxY > 1000000) {
    return `${(value / 1000000).toFixed(fractionDigits)}`;
  }
  if (maxY > 1000) {
    return `${(value / 1000).toFixed(fractionDigits)}`;
  }
  return value;
}

export const generateXAxisInterval = (
  granularity: TGranularity,
  period?: PeriodTypes,
  dataX?: string[],
  width?: number,
): number | string => {
  if (!dataX || !dataX?.length || !period || !width) {
    return 'auto';
  }

  if (width > 960 && width < 1200) {
    return Math.floor(dataX.length / 5);
  }

  if (width <= 960) {
    return Math.floor(dataX.length / 3);
  }

  switch (period) {
    case '24h':
      return Math.floor(dataX.length / 5);
    case '7d':
      if (dataX.length <= 8) {
        return 'auto';
      }
      return Math.floor(dataX.length / 7);
    case '14d':
      return Math.floor(dataX.length / 10);
    case '30d':
      if (dataX.length !== 31) {
        return Math.floor(dataX.length / 15);
      }
      return 1;
    case '90d':
    case '180d':
      return Math.floor(dataX.length / 15);
    default:
      return Math.floor(dataX.length / 14);
  }
};

export const generateMinMaxChartData = (
  min: number,
  max: number,
  offset: number,
  step: number,
  period?: PeriodTypes,
  decimalsLength?: number,
): TMinMaxChartData => {
  let result = {
    min: 0,
    max: 0,
  };
  let inputMin = min;
  let inputMax = max;
  if (decimalsLength && offset) {
    inputMin = parseFloat(min.toFixed(decimalsLength)) * offset;
    inputMax = parseFloat(max.toFixed(decimalsLength)) * offset;
  }
  if (period === '24h' && !decimalsLength) {
    result = {
      min: Math.floor(min),
      max: Math.ceil(max),
    };
  } else {
    let minVal = Math.floor(inputMin - Math.floor(inputMin) * 0.02);
    if (minVal % step !== 0) {
      const minRange = minVal / step;
      const tmpMin = minVal;
      for (let i = 1; i <= minRange; i += 1) {
        minVal = tmpMin - i;
        if (minVal % step === 0) {
          break;
        }
      }
    }
    const maxTmp = Math.ceil(inputMax);
    const range = parseInt((maxTmp - minVal).toString(), 10);
    let valRange = range;
    if (range % step !== 0) {
      const x = Math.ceil(range / step);
      for (let i = 1; i <= x; i += 1) {
        valRange = range + i;
        if (valRange % step === 0) {
          break;
        }
      }
    }
    const maxVal = minVal + valRange;
    result = {
      min: decimalsLength ? minVal / offset : minVal,
      max: decimalsLength ? maxVal / offset : maxVal,
    };
  }

  return result;
};

export const getMinMax = (arr: number[]) =>
  arr.reduce(([min, max], val) => [Math.min(min, val), Math.max(max, val)], [
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ]);
