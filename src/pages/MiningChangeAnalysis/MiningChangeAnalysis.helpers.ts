import { TRows } from '@hooks/useMiningChangeAnalysis';
import { getMinMax } from '@utils/helpers/statisticsLib';

import { translateDropdown } from '@utils/helpers/i18n';

type TPeriodOption = {
  name: string;
  value: string;
};

export const PERIOD_OPTIONS = [
  {
    name: 'pages.miningChangeAnalysis.periods.10Blocks',
    value: '10',
  },
  {
    name: 'pages.miningChangeAnalysis.periods.50Blocks',
    value: '50',
  },
  {
    name: 'pages.miningChangeAnalysis.periods.100Blocks',
    value: '100',
  },
  {
    name: 'pages.miningChangeAnalysis.periods.500Blocks',
    value: '500',
  },
  {
    name: 'pages.miningChangeAnalysis.periods.1000Blocks',
    value: '1000',
  },
];

export const getPeriodOptions = (periods: TPeriodOption[]) => {
  return periods.map(period => ({
    ...period,
    name: translateDropdown(period.name),
  }));
};

export const transferTrailing50BlockAverageBlocksChartData = (data: TRows[]) => {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < data?.length; i += 1) {
    dataX.push(`${data[i].height}`);
    dataY.push(data[i].trailing_50_block_average_blocks_since_same_pastelid_signed);
  }
  const minMax = getMinMax(dataY);
  return {
    dataX,
    dataY,
    offset: minMax[1] ? minMax[1] * 0.01 : 0,
  };
};

export const transferTrailing10BlockAverageBlockTimeChartData = (data: TRows[]) => {
  const dataX: string[] = [];
  const dataY: number[] = [];
  for (let i = 0; i < data?.length; i += 1) {
    dataX.push(`${data[i].height}`);
    dataY.push(data[i].trailing_10_block_average_block_time);
  }
  const minMax = getMinMax(dataY);
  return {
    dataX,
    dataY,
    offset: minMax[1] ? minMax[1] * 0.25 : 0,
  };
};

export const transferTimeBetweenBlocksInMinutesChartData = (data: TRows[]) => {
  const dataX: string[] = [];
  const dataY: number[][] = [];
  for (let i = 0; i < data?.length; i += 1) {
    dataX.push(`${data[i].height}`);
    dataY.push([data[i].height, data[i].time_between_blocks_in_minutes]);
  }
  return {
    dataX,
    dataY,
    offset: 1,
  };
};

export const transferTrailing50BlockChartData = (data: TRows[]) => {
  const dataX: string[] = [];
  const dataY1: number[] = [];
  const dataY2: number[] = [];
  for (let i = 0; i < data?.length; i += 1) {
    dataX.push(`${data[i].height}`);
    dataY1.push(data[i].trailing_50_block_average_block_time);
    dataY2.push(data[i].trailing_50_block_st_deviation_of_block_time);
  }
  const minMax = getMinMax([...dataY1, ...dataY2]);
  return {
    dataX,
    dataY1,
    dataY2,
    offset: minMax[1] ? minMax[1] * 0.9 : 0,
  };
};
