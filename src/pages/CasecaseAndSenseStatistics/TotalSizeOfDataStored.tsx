import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';

import { PeriodTypes } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';
import { useBackgroundChart } from '@utils/hooks';

import * as Styles from './CasecaseAndSenseStatistics.styles';

const TotalSizeOfDataStored: React.FC = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[7][2]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();

  const chartData = {
    dataX: [
      '08/08/2022',
      '08/09/2022',
      '08/10/2022',
      '08/11/2022',
      '08/12/2022',
      '08/13/2022',
      '08/14/2022',
      '08/15/2022',
      '08/16/2022',
      '08/23/2022',
      '08/24/2022',
      '08/25/2022',
      '08/26/2022',
      '08/27/2022',
      '08/28/2022',
      '08/29/2022',
      '08/30/2022',
      '08/31/2022',
      '09/01/2022',
      '09/02/2022',
      '09/03/2022',
      '09/04/2022',
      '09/05/2022',
      '09/06/2022',
    ],
    dataY: [
      7568,
      6371,
      5992,
      4805,
      5005,
      5005,
      5842,
      2325,
      5985,
      5548,
      2995,
      5618,
      5437,
      6062,
      13286,
      5875,
      6000,
      3120,
      9145,
      5187,
      6625,
      5187,
      5875,
      2937,
    ],
  };

  const handlePeriodFilterChange = (per: PeriodTypes) => {
    setPeriod(per);
  };

  const total = chartData?.dataY?.reduce((partialSum, a) => partialSum + a, 0) || 0;

  return (
    <Styles.ContentWrapper style={{ backgroundColor: currentBgColor }}>
      {!chartData ? (
        <Skeleton animation="wave" variant="rect" height={386} />
      ) : (
        <EChartsLineChart
          chartName="totalSizeOfDataStored"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title="Total data stored on Cascade"
          info={info}
          period={period}
          offset={1}
          periods={periods[7]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
          setHeaderBackground
          subTitle={`Total: ${formatNumber(total)} MB`}
        />
      )}
    </Styles.ContentWrapper>
  );
};

export default TotalSizeOfDataStored;
