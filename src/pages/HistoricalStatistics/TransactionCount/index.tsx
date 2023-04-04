// react
import { useEffect, useState } from 'react';

import { PeriodTypes, transformTransactionsChartData } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { TLineChartData } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useTransactionsCount from '@hooks/useTransactionsCount';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function StatisticsTransactionsCount() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useTransactionsCount(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.transactionCount, true) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformTransactionsChartData(swrData.data, period, true, 2);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.transactionCount,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, swrData.isLoading, swrData.data]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };
  return (
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title={translate('pages.historicalStatistics.transactionCount')}
    >
      <EChartsLineChart
        chartName="transactionCount"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={translate('pages.historicalStatistics.transactionCount')}
        period={period}
        info={info}
        offset={1000}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default StatisticsTransactionsCount;
