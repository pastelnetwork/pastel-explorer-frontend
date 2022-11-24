import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import subDays from 'date-fns/subDays';
import subHours from 'date-fns/subHours';
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
  THashrate,
  TSolpsData,
  THashrateChartData,
  TMinMaxChartData,
  MarketCoinRespone,
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
  if (!timestamp) {
    return null;
  }
  const nowHour = format(new Date(), 'MM/dd/yyyy HH');
  const targetHour = format(timestamp, 'MM/dd/yyyy HH');
  if (nowHour !== targetHour) {
    return new Date().toLocaleString();
  }

  return null;
};

export function transformDifficultyInfo(
  difficulties: IStatistic[],
  period: PeriodTypes,
  timestamp: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];

  for (let i = 0; i < difficulties.length; i += 1) {
    if (difficulties[i].timestamp !== null) {
      dataY.push(Number(difficulties[i].difficulty));
      dataX.push(format(Number(difficulties[i].timestamp), 'MM/dd/yyyy hh:mm aa'));
    }
  }
  if (
    period === '24h' &&
    !timestamp &&
    checkValidateData(difficulties[difficulties.length - 1]?.timestamp)
  ) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy hh:mm aa') || '');
    dataY.push(difficulties[difficulties.length - 1].difficulty);
  }

  return { dataX, dataY };
}

export function transformPriceInfo(
  prices: IStatistic[],
  period: PeriodTypes,
  timestamp: string,
): TMultiLineChartData {
  const dataX: string[] = [];
  const dataY1: number[] = [];
  const dataY2: number[] = [];

  for (let i = 0; i < prices.length; i += 1) {
    const usd = Number(prices[i].usdPrice);
    const btc = Number(prices[i].btcPrice);
    dataY1.push(usd);
    dataY2.push(btc);
    dataX.push(new Date(Number(prices[i].timestamp)).toLocaleString());
  }
  if (period === '24h' && !timestamp && checkValidateData(prices[prices.length - 1]?.timestamp)) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy hh:mm aa') || '');
    dataY1.push(Number(prices[prices.length - 1].usdPrice));
    dataY2.push(Number(prices[prices.length - 1].btcPrice));
  }
  return { dataX, dataY1, dataY2 };
}

export function transformMarketVolumePriceInfo(
  data: MarketCoinRespone,
  period: PeriodTypes,
  isAddNewNode: boolean,
): TMultiLineChartData {
  const dataX: string[] = [];
  const dataY1: number[] = [];
  const dataY2: number[] = [];

  const { prices, total_volumes } = data;

  for (let i = 0; i < prices.length; i += 1) {
    const [x, y1] = prices[i];
    const [, y2] = total_volumes[i];
    dataX.push(new Date(Number(x)).toLocaleString());
    dataY1.push(+y1.toFixed(8));
    dataY2.push(Math.round(y2));
  }
  if (period === '24h' && isAddNewNode && checkValidateData(prices[prices.length - 1][0])) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy hh:mm aa') || '');
    dataY1.push(Number(dataY1[dataY1.length - 1]));
    dataY2.push(Number(dataY2[dataY2.length - 1]));
  }
  return { dataX, dataY1, dataY2 };
}

export function transformMarketCapPriceInfo(
  data: MarketCoinRespone,
  period: PeriodTypes,
  isAddNewNode: boolean,
): TMultiLineChartData {
  const dataX: string[] = [];
  const dataY1: number[] = [];
  const dataY2: number[] = [];

  const { prices, market_caps } = data;

  for (let i = 0; i < prices.length; i += 1) {
    const [x, y1] = prices[i];
    const [, y2] = market_caps[i];
    dataX.push(new Date(Number(x)).toLocaleString());
    dataY1.push(+y1.toFixed(8));
    dataY2.push(Math.round(y2));
  }
  if (period === '24h' && isAddNewNode && checkValidateData(prices[prices.length - 1][0])) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy hh:mm aa') || '');
    dataY1.push(Number(dataY1[dataY1.length - 1]));
    dataY2.push(Number(dataY2[dataY2.length - 1]));
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
  timestamp: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < mempoolInfo.length; i += 1) {
    if (mempoolInfo[i].usage !== null && mempoolInfo[i].timestamp !== 0) {
      const bytes = Number(mempoolInfo[i].usage) / 1000;
      dataY.push(bytes);
      dataX.push(new Date(Number(mempoolInfo[i].timestamp)).toLocaleString());
    }
  }
  if (
    period === '24h' &&
    !timestamp &&
    checkValidateData(mempoolInfo[mempoolInfo.length - 1]?.timestamp)
  ) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy hh:mm aa') || '');
    dataY.push(Number(mempoolInfo[mempoolInfo.length - 1].usage) / 1000);
  }
  return { dataX, dataY };
}

export function transformNetTotals(
  nettotals: TNettotalsInfo[],
  period: PeriodTypes,
  timestamp: string,
): TMultiLineChartData {
  const dataX: string[] = [];
  const dataY1: number[] = [];
  const dataY2: number[] = [];
  for (let i = 0; i < nettotals.length; i += 1) {
    if (nettotals[i].timemillis !== null) {
      const recv = Number(nettotals[i].totalbytesrecv);
      const sent = Number(nettotals[i].totalbytessent);
      dataY1.push(recv);
      dataY2.push(sent);
      dataX.push(new Date(Number(nettotals[i].timemillis)).toLocaleString());
    }
  }
  if (
    period === '24h' &&
    !timestamp &&
    checkValidateData(nettotals[nettotals.length - 1]?.timemillis)
  ) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy hh:mm aa') || '');
    dataY1.push(Number(nettotals[nettotals.length - 1].totalbytesrecv));
    dataY2.push(Number(nettotals[nettotals.length - 1].totalbytessent));
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
  timestamp: string,
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
  if (
    period === '24h' &&
    !timestamp &&
    checkValidateData(blockSizes[blockSizes.length - 1]?.time * 1000)
  ) {
    dataX.push(format(Date.now(), 'MM/dd/yyyy HH:mm'));
    dataY.push(0);
  }
  return { dataX, dataY };
}

export function transformTransactionPerSecond(
  trans: TTransactionPerSecond[],
  period: PeriodTypes,
  timestamp: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    const size = Number(trans[i].size) / (24 * 3600);
    if (size) {
      dataY.push(size);
      dataX.push(new Date(trans[i].time).toLocaleString());
    }
  }
  if (
    period === '24h' &&
    !timestamp &&
    trans.length &&
    checkValidateData(trans[trans.length - 1]?.time)
  ) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
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

export function transformBlockchainSizeData(
  data: TTransactionsChart[],
  period: PeriodTypes,
  startValue: number,
  endValue: number,
  startValueCache: number,
  range = 10e6,
  timestamp?: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  let preValue = startValueCache ? startValueCache * range : startValue;
  for (let i = 0; i < data.length; i += 1) {
    let value = data[i].value + preValue;
    if (i === data.length - 1) {
      value = endValue;
    }
    dataX.push(new Date(parseInt(data[i].label, 10)).toLocaleString());
    dataY.push(parseFloat((value / range).toFixed(2)));
    preValue += data[i].value;
  }
  if (
    period === '24h' &&
    timestamp &&
    checkValidateData(parseInt(data[data.length - 1]?.label, 10))
  ) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
  }
  return { dataX, dataY };
}

export function transformTotalTransactionCount(
  data: TChartResponseItem[],
  period: PeriodTypes,
  startValue: number,
  endValue: number,
  startValueCache: number,
  timestamp: string,
) {
  const dataX: string[] = [];
  const dataY: number[] = [];
  let preValue = startValueCache || startValue;
  for (let i = 0; i < data.length; i += 1) {
    let value = data[i].value + preValue;
    if (i === data.length - 1) {
      value = endValue;
    }
    dataX.push(new Date(parseInt(data[i].label, 10) * 1000).toLocaleString());
    dataY.push(parseFloat(value.toFixed(2)));
    preValue += data[i].value;
  }
  if (
    period === '24h' &&
    !timestamp &&
    checkValidateData(parseInt(data[data.length - 1]?.label, 10) * 1000)
  ) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
  }
  return {
    dataX,
    dataY,
  };
}

export function convertYAxisLabel(
  value: number,
  maxY: number,
  fractionDigits = 2,
): number | string {
  if (value === 0) {
    return value;
  }
  if (maxY > 1000000000) {
    const newValue = (value / 1000000000).toFixed(fractionDigits);
    return parseFloat(newValue) > 0 ? `${parseFloat(newValue)}B` : 0;
  }
  if (maxY > 1000000) {
    const newValue = (value / 1000000).toFixed(fractionDigits);
    return parseFloat(newValue) > 0 ? `${parseFloat(newValue)}M` : 0;
  }
  if (maxY > 1000) {
    const newValue = (value / 1000).toFixed(fractionDigits);
    return parseFloat(newValue) > 0 ? `${parseFloat(newValue)}K` : 0;
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
  timestamp: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    const value = Number(trans[i].value);
    dataY.push(value);
    dataX.push(new Date(trans[i].time).toLocaleString());
  }
  if (period === '24h' && !timestamp && checkValidateData(trans[trans.length - 1]?.time)) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
  }
  return {
    dataX,
    dataY,
  };
}

export function transformAccountDataChart(
  trans: IStatistic[],
  period: PeriodTypes,
  timestamp: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    dataY.push(Number(trans[i].nonZeroAddressesCount));
    dataX.push(new Date(trans[i].timestamp).toLocaleString());
  }
  if (period === '24h' && !timestamp && checkValidateData(trans[trans.length - 1]?.timestamp)) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
  }
  return {
    dataX,
    dataY,
  };
}

export function transformTotalSupplyDataChart(
  trans: IStatistic[],
  period: PeriodTypes,
  timestamp: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < trans.length; i += 1) {
    dataY.push(Number(trans[i].coinSupply));
    dataX.push(new Date(trans[i].timestamp).toLocaleString());
  }
  if (period === '24h' && !timestamp && checkValidateData(trans[trans.length - 1]?.timestamp)) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
  }
  return {
    dataX,
    dataY,
  };
}

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
  timestamp: string,
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
  if (period === '24h' && !timestamp && checkValidateData(data[data.length - 1]?.timestamp)) {
    dataX.push(new Date().toLocaleString());
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

export const toPlainString = (num: number) => {
  return `${+num}`.replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/, (a, b, c, d, e) => {
    return e < 0
      ? `${b}0.${Array(1 - e - c.length).join('0')}${c}${d}`
      : b + c + d + Array(e - d.length + 1).join('0');
  });
};

const getPeriodData = (period: PeriodTypes, date: string, isHour = false) => {
  if (isHour) {
    const periodHourData = {
      '1h': 1,
      '3h': 3,
      '6h': 6,
      '12h': 12,
    };
    return subHours(
      new Date(date),
      periodHourData[period as keyof typeof periodHourData],
    ).valueOf();
  }

  const periodData = {
    '24h': 1,
    '7d': 7,
    '14d': 14,
    '30d': 30,
    '60d': 60,
    '90d': 90,
    '180d': 180,
    '1y': 365,
  };
  return subDays(new Date(date), periodData[period as keyof typeof periodData]).valueOf();
};

export function transformLineChartData(
  data: TChartResponseItem[],
  period: PeriodTypes,
  isMicroseconds = true,
  range = 1,
  decimalsLength = 2,
  timestamp?: string,
): TLineChartData {
  const dataX: string[] = [];
  const dataY: number[] = [];
  data.forEach(({ value, label }) => {
    dataX.push(new Date(isMicroseconds ? Number(label) * 1000 : label).toLocaleString());
    if (decimalsLength) {
      dataY.push(+(value / range).toFixed(decimalsLength));
    } else {
      dataY.push(+(value / range));
    }
  });
  if (
    period === '24h' &&
    !timestamp &&
    checkValidateData(
      isMicroseconds
        ? Number(data[data.length - 1]?.label) * 1000
        : Number(data[data.length - 1]?.label),
    )
  ) {
    dataX.push(new Date().toLocaleString());
    dataY.push(dataY[dataY.length - 1]);
  }
  return { dataX, dataY };
}

export const getScatterChartData = (
  parseData: TScatterChartData,
  currentData: TScatterChartData,
  period: PeriodTypes,
) => {
  if (!currentData || !currentData.dataX.length) {
    return parseData;
  }
  if (!parseData || !parseData.dataX.length) {
    return currentData;
  }
  const newDataX = [
    ...currentData.dataX.splice(0, currentData.dataX.length - 1),
    ...parseData.dataX,
  ];
  const newData = currentData.data.splice(0, currentData.data.length - 1).concat(parseData.data);
  let startIndex = 0;
  if (period !== 'all' && period !== 'max') {
    const target = getPeriodData(period, parseData.dataX[parseData.dataX.length - 1], true);
    for (let i = 0; i < newDataX.length; i += 1) {
      const timestamp = new Date(newDataX[i]).valueOf();
      if (timestamp >= target) {
        startIndex = i;
        break;
      }
    }
  }
  const dataX = newDataX.splice(startIndex, newDataX.length);
  return {
    dataX,
    data: newData.splice(startIndex, newData.length),
  };
};

export const generateXAxisIntervalForScatterChart = (
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

  return Math.floor(dataX.length / 14);
};

export const mergeChartData = (
  parseData: TLineChartData,
  currentData: TLineChartData,
  period: PeriodTypes,
) => {
  if (!currentData || !currentData.dataX.length) {
    return parseData;
  }
  if (!parseData || !parseData.dataX.length) {
    return currentData;
  }
  const newDataX = [
    ...currentData.dataX.splice(0, currentData.dataX.length - 1),
    ...parseData.dataX,
  ];
  const newDataY = [
    ...currentData.dataY.splice(0, currentData.dataY.length - 1),
    ...parseData.dataY,
  ];
  let startIndex = 0;
  if (period !== 'all' && period !== 'max') {
    const target = getPeriodData(period, parseData.dataX[parseData.dataX.length - 1]);
    for (let i = 0; i < newDataX.length; i += 1) {
      const timestamp = new Date(newDataX[i]).valueOf();
      if (timestamp >= target) {
        startIndex = i;
        break;
      }
    }
  }

  return {
    dataX: newDataX.splice(startIndex, newDataX.length),
    dataY: newDataY.splice(startIndex, newDataY.length),
  };
};

export const mergeMultiLineChartData = (
  parseData: TMultiLineChartData,
  currentData: TMultiLineChartData,
  period: PeriodTypes,
) => {
  if (!currentData || !currentData.dataX.length) {
    return parseData;
  }
  if (!parseData || !parseData.dataX.length) {
    return currentData;
  }
  const newDataX = [
    ...currentData.dataX.splice(0, currentData.dataX.length - 1),
    ...parseData.dataX,
  ];
  const newDataY1 = [
    ...currentData.dataY1.splice(0, currentData.dataY1.length - 1),
    ...parseData.dataY1,
  ];
  const newDataY2 = [
    ...currentData.dataY2.splice(0, currentData.dataY2.length - 1),
    ...parseData.dataY2,
  ];
  let startIndex = 0;
  if (period !== 'all' && period !== 'max') {
    const target = getPeriodData(period, parseData.dataX[parseData.dataX.length - 1]);
    for (let i = 0; i < newDataX.length; i += 1) {
      const timestamp = new Date(newDataX[i]).valueOf();
      if (timestamp >= target) {
        startIndex = i;
        break;
      }
    }
  }

  return {
    dataX: newDataX.splice(startIndex, newDataX.length),
    dataY1: newDataY1.splice(startIndex, newDataY1.length),
    dataY2: newDataY2.splice(startIndex, newDataY2.length),
  };
};

export const mergeHashRateChartData = (
  parseData: THashrateChartData,
  currentData: THashrateChartData,
  period: PeriodTypes,
) => {
  if (!currentData || !currentData.dataX.length) {
    return parseData;
  }
  if (!parseData || !parseData.dataX.length) {
    return currentData;
  }
  const newDataX = [
    ...currentData.dataX.splice(0, currentData.dataX.length - 1),
    ...parseData.dataX,
  ];
  const networksolps: TSolpsData = {
    solps5: [
      ...currentData.networksolps.solps5.splice(0, currentData.networksolps.solps5.length - 1),
      ...parseData.networksolps.solps5,
    ],
    solps10: [
      ...currentData.networksolps.solps10.splice(0, currentData.networksolps.solps10.length - 1),
      ...parseData.networksolps.solps10,
    ],
    solps25: [
      ...currentData.networksolps.solps25.splice(0, currentData.networksolps.solps25.length - 1),
      ...parseData.networksolps.solps25,
    ],
    solps50: [
      ...currentData.networksolps.solps50.splice(0, currentData.networksolps.solps50.length - 1),
      ...parseData.networksolps.solps50,
    ],
    solps100: [
      ...currentData.networksolps.solps100.splice(0, currentData.networksolps.solps100.length - 1),
      ...parseData.networksolps.solps100,
    ],
    solps500: [
      ...currentData.networksolps.solps500.splice(0, currentData.networksolps.solps500.length - 1),
      ...parseData.networksolps.solps5,
    ],
    solps1000: [
      ...currentData.networksolps.solps1000.splice(
        0,
        currentData.networksolps.solps1000.length - 1,
      ),
      ...parseData.networksolps.solps1000,
    ],
  };

  let startIndex = 0;
  if (period !== 'all' && period !== 'max') {
    const target = getPeriodData(period, parseData.dataX[parseData.dataX.length - 1]);
    for (let i = 0; i < newDataX.length; i += 1) {
      const timestamp = new Date(newDataX[i]).valueOf();
      if (timestamp >= target) {
        startIndex = i;
        break;
      }
    }
  }

  return {
    dataX: newDataX.splice(startIndex, newDataX.length),
    networksolps: {
      solps5: networksolps.solps5.splice(startIndex, networksolps.solps5.length),
      solps10: networksolps.solps10.splice(startIndex, networksolps.solps10.length),
      solps25: networksolps.solps25.splice(startIndex, networksolps.solps25.length),
      solps50: networksolps.solps50.splice(startIndex, networksolps.solps50.length),
      solps100: networksolps.solps100.splice(startIndex, networksolps.solps100.length),
      solps500: networksolps.solps500.splice(startIndex, networksolps.solps500.length),
      solps1000: networksolps.solps5.splice(startIndex, networksolps.solps1000.length),
    },
  };
};
