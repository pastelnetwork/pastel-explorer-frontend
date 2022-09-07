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
    value: 120,
    maxValue: 250,
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
          info={info}
          period={period}
          offset={1}
          periods={periods[7]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
          setHeaderBackground
          gaugeValue={chartData.value}
          maxGaugeValue={chartData.maxValue}
        />
      )}
    </Styles.ContentWrapper>
  );
};

export default AverageSizeOfNFTStoredOnCascade;
