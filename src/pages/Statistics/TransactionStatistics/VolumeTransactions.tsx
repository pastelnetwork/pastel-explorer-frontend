import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';

import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';

import { PeriodTypes, transformChartData } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';
import { getCurrencyName } from '@utils/appInfo';

const CHART_HEIGHT = 386;

const NetworkStatistics: React.FC = () => {
  const [period, setPeriod] = useState(periods[1][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();

  const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
    { method: 'get', url: `${URLS.VOLUME_TRANSACTION_URL}`, params: { period } },
    transformChartData,
    undefined,
    undefined,
    [period],
  );

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };
  if (!chartData || isLoading) {
    return <Skeleton animation="wave" variant="rect" height={CHART_HEIGHT} />;
  }
  return (
    <div style={{ flex: 1, backgroundColor: currentBgColor }}>
      <EChartsLineChart
        chartName="averageblocksize"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={`Volume of transactions (${getCurrencyName()})`}
        info={info}
        offset={1000}
        period={period}
        periods={periods[1]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
      />
    </div>
  );
};

export default NetworkStatistics;
