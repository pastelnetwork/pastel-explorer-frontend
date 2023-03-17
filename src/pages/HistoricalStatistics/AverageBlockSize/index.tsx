// react
import { useEffect, useState } from 'react';

// application
import { TLineChartData } from '@utils/types/IStatistics';
import { TGranularity, PeriodTypes, transformAverageBlockSize } from '@utils/helpers/statisticsLib';
import {
  BLOCK_CHART_DEFAULT_GRANULARITY,
  granularities,
  periods,
  info,
  cacheList,
} from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useAverageBlockSize from '@hooks/useAverageBlockSize';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

const AverageBlockSize = (): JSX.Element => {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [granularity, setGranularity] = useState<TGranularity>(BLOCK_CHART_DEFAULT_GRANULARITY);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const swrData = useAverageBlockSize(period, granularity);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.averageBlockSize) || {};
    if (!currentCache[`${period}-${granularity}`]) {
      setLoading(true);
    } else {
      setChartData(currentCache[`${period}-${granularity}`].parseData as TLineChartData);
      setLoading(false);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformAverageBlockSize(swrData.data, period);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [`${period}-${granularity}`]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.averageBlockSize,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [granularity, period, swrData.isLoading, swrData.data]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setGranularity('none');
    setPeriod(value);
  };

  const handleGranularityFilterChange = (value: TGranularity) => {
    setGranularity(value === granularity ? 'none' : value);
  };

  const getGranularitiesOptions = () => {
    if (period === periods[6][0]) {
      return undefined;
    }
    if (period === periods[6][1] || period === periods[6][2]) {
      return granularities[1];
    }
    if (period === periods[6][3] || period === periods[6][4] || period === periods[6][5]) {
      return granularities[2];
    }
    return granularities[0];
  };

  return (
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title={translate('pages.historicalStatistics.averageblocksizePageTitle')}
    >
      <EChartsLineChart
        chartName="averageblocksize"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={translate('pages.historicalStatistics.averageblocksizeChartTitle')}
        info={info}
        offset={10000}
        period={period}
        granularity={granularity}
        granularities={getGranularitiesOptions()}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        handleGranularityFilterChange={handleGranularityFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
};

export default AverageBlockSize;
