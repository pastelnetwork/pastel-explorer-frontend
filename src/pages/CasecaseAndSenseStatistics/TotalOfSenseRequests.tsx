import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';

// import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';
// import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes /* transformChartData */ } from '@utils/helpers/statisticsLib';
// import * as URLS from '@utils/constants/urls';
import { periods, info } from '@utils/constants/statistics';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';
import { useBackgroundChart } from '@utils/hooks';

import * as Styles from './CasecaseAndSenseStatistics.styles';

const TotalOfSenseRequests: React.FC = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[7][2]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();

  // const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
  //   { method: 'get', url: `${URLS.VOLUME_TRANSACTION_URL}`, params: { period } },
  //   transformChartData,
  //   undefined,
  //   undefined,
  //   [period],
  // );

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
      57568,
      66371,
      65992,
      70805,
      95005,
      95005,
      65842,
      110416,
      62325,
      65985,
      65548,
      42995,
      25618,
      35437,
      36062,
      35875,
      36000,
      4312,
      113286,
      9145,
      35187,
      36625,
      35187,
      55875,
      32937,
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
          chartName="totalOfCascadeRequests"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title="Sense Requests - NFTs stored"
          info={info}
          period={period}
          offset={1}
          periods={periods[7]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
          setHeaderBackground
          subTitle={`Total: ${formatNumber(total)} requests`}
        />
      )}
    </Styles.ContentWrapper>
  );
};

export default TotalOfSenseRequests;
