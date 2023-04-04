// react
import { useEffect, useState } from 'react';

// application
import { PeriodTypes, transformDifficultyInfo } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { TLineChartData } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useDifficulty from '@hooks/useDifficulty';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function Difficulty() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useDifficulty(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.difficulty) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformDifficultyInfo(swrData.data, period);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.difficulty,
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
      title={translate('pages.historicalStatistics.difficulty')}
    >
      <EChartsLineChart
        chartName="difficulty"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={translate('pages.historicalStatistics.networkDifficulty')}
        period={period}
        info={info}
        offset={100000}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default Difficulty;
