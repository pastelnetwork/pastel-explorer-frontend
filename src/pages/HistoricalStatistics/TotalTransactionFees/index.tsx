import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { TLineChartData } from '@utils/types/IStatistics';
import { PeriodTypes, transformTotalTransactionCount } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useTotalTransactionFees from '@hooks/useTotalTransactionFees';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function TotalTransactionFees() {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const swrData = useTotalTransactionFees(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.totalTransactionFees) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformTotalTransactionCount(
        swrData.data,
        period,
        swrData.startValue,
        swrData.endValue,
        0,
        '',
      );
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.totalTransactionFees,
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
      title={parse(translate('pages.historicalStatistics.totalTransactionFees'))}
    >
      <EChartsLineChart
        chartName="totalTransactionFees"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={parse(translate('pages.historicalStatistics.totalTransactionFees'))}
        info={info}
        period={period}
        offset={10}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default TotalTransactionFees;
