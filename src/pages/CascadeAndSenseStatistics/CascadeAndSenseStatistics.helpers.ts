import format from 'date-fns/format';

import { TAverageRarenessScoreData, TCascadeAndSenseData } from '@utils/types/IStatistics';

export const transformAverageRarenessScoreOfNFTsOnSenseChartData = (
  data: TAverageRarenessScoreData[] | null,
  range = 1,
) => {
  const dataX: string[] = [];
  const dataY: number[] = [];
  const dataY1: number[] = [];
  if (data?.length) {
    data.forEach(item => {
      dataX.push(format(item.timestamp, 'MM/dd/yyyy hh:mm aa'));
      dataY.push(item.highest / range);
      dataY1.push(item.average / range);
    });
  }

  return {
    dataX,
    dataY,
    dataY1,
  };
};

export const transformChartData = (data: TCascadeAndSenseData[] | null, range = 1) => {
  const dataX: string[] = [];
  const dataY: number[] = [];
  if (data?.length) {
    data.forEach(item => {
      dataX.push(format(item.timestamp, 'MM/dd/yyyy hh:mm aa'));
      dataY.push(item.value / range);
    });
  }

  return {
    dataX,
    dataY,
  };
};
