import { useEffect, useState } from 'react';

import { PeriodTypes, transformStatisticsChart } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import { getCurrencyName } from '@utils/appInfo';
import usePercentOfPSLStaked from '@hooks/usePercentOfPSLStaked';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function PercentOfPSLStaked() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = usePercentOfPSLStaked(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.percentOfPslStaked) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformStatisticsChart(swrData.data, period, '');
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.percentOfPslStaked,
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
      title={translate('pages.historicalStatistics.percentOfPSLStaked', {
        currency: getCurrencyName(),
      })}
    >
      <EChartsLineChart
        chartName="percentOfPSLStaked"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={translate('pages.historicalStatistics.percentOfPSLStaked', {
          currency: getCurrencyName(),
        })}
        info={info}
        period={period}
        offset={0.004}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default PercentOfPSLStaked;
