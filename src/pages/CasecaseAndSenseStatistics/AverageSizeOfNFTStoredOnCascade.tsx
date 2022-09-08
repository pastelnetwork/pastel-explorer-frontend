import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';

// import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';
// import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes /* , transformChartData */ } from '@utils/helpers/statisticsLib';
// import * as URLS from '@utils/constants/urls';
import { periods, info } from '@utils/constants/statistics';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';
import { useBackgroundChart } from '@utils/hooks';

import * as Styles from './CasecaseAndSenseStatistics.styles';

const AverageSizeOfNFTStoredOnCascade: React.FC = () => {
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
      6371,
      5992,
      4805,
      7568,
      5005,
      5842,
      2325,
      5005,
      13286,
      5985,
      5548,
      5618,
      5437,
      2995,
      6062,
      6000,
      3120,
      5875,
      9145,
      5187,
      6625,
      5187,
      5875,
      10416,
    ],
  };

  const handlePeriodFilterChange = (per: PeriodTypes) => {
    setPeriod(per);
  };

  return (
    <Styles.ContentWrapper style={{ backgroundColor: currentBgColor }}>
      {!chartData ? (
        <Skeleton animation="wave" variant="rect" height={386} />
      ) : (
        <EChartsLineChart
          chartName="averageSizeOfNFTStoredOnCascade"
          title="Average size of NFT stored on Cascade"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          info={info}
          period={period}
          offset={1}
          periods={periods[7]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
          setHeaderBackground
        />
      )}
    </Styles.ContentWrapper>
  );
};

export default AverageSizeOfNFTStoredOnCascade;
