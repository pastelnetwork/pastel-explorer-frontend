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

const TotalOfCascadeRequests: React.FC = () => {
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
      5756861,
      6637116,
      6599295,
      11041698,
      11328649,
      7080555,
      9500527,
      9500527,
      6584256,
      6232521,
      6598593,
      6554860,
      4299563,
      2561857,
      3543750,
      3606250,
      3587500,
      3600000,
      431250,
      914593,
      3518750,
      3662500,
      3518750,
      3587500,
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
          title="Cascade Requests - NFTs stored"
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

export default TotalOfCascadeRequests;
