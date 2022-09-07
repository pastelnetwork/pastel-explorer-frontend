import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';

// import { TAnalyticsChartResponse, TAnalyticsChartData } from '@utils/types/IStatistics';
// import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes /* , transformAnalyticsChartData */ } from '@utils/helpers/statisticsLib';
// import * as URLS from '@utils/constants/urls';
import { periods, info } from '@utils/constants/statistics';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';
import { useBackgroundChart } from '@utils/hooks';

import * as Styles from './CasecaseAndSenseStatistics.styles';

const AverageRarenessScoreOfNFTsOnSense: React.FC = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[7][2]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();

  // const { isLoading, data: chartData } = useDeferredData<
  //   TAnalyticsChartResponse,
  //   TAnalyticsChartData
  // >(
  //   { method: 'get', url: `${URLS.VOLUME_TRANSACTION_URL}`, params: { period } },
  //   transformAnalyticsChartData,
  //   undefined,
  //   undefined,
  //   [period],
  // );

  const chartData = {
    value: 0.8,
    maxValue: 1,
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
          chartName="averageRarenessScoreOfNFTsOnSense"
          title="Average rareness score of NFTs on Sense"
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

export default AverageRarenessScoreOfNFTsOnSense;
