// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import { TLineChartData, TAverageBlockSize, TCacheValue } from '@utils/types/IStatistics';
import {
  TGranularity,
  PeriodTypes,
  transformAverageBlockSize,
  getChartData,
} from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  BLOCK_CHART_DEFAULT_GRANULARITY,
  granularities,
  periods,
  info,
  LRU_OPTIONS,
  cacheList,
} from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

const AverageBlockSize = (): JSX.Element => {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [granularity, setGranularity] = useState<TGranularity>(BLOCK_CHART_DEFAULT_GRANULARITY);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<TAverageBlockSize> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_AVERAGE_BLOCK_SIZE,
  });

  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.averageBlockSize) as TCacheValue) ||
        readCacheValue(cacheList.averageBlockSize) ||
        {};
      if (!currentCache[`${period}-${granularity}`]) {
        setLoading(true);
      } else {
        setChartData(currentCache[`${period}-${granularity}`].parseData as TLineChartData);
        timestamp = currentCache[`${period}-${granularity}`]?.lastDate?.toString() || '';
      }
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period, granularity, format: 'true', timestamp },
      });
      if (data) {
        const parseData = transformAverageBlockSize(data.data, period);
        if (
          currentCache[`${period}-${granularity}`] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[`${period}-${granularity}`])
        ) {
          setLoading(true);
        }
        const newParseData = getChartData(
          parseData,
          currentCache[`${period}-${granularity}`]?.parseData as TLineChartData,
          period,
        );
        if (isSubscribed) {
          setChartData(newParseData);
        }
        if (!currentCache[`${period}-${granularity}`]) {
          currentCache = {
            ...currentCache,
            [`${period}-${granularity}`]: {
              parseData: newParseData,
              lastDate: data.data[data.data.length - 1].time,
            },
          };
        }
        setCacheValue(
          cacheList.averageBlockSize,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.averageBlockSize, currentCache);
      }
      setLoading(false);
    };
    loadLineChartData();
    return () => {
      isSubscribed = false;
    };
  }, [granularity, period]);

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
      title="Cumulative Overall Average Block Size"
    >
      <EChartsLineChart
        chartName="averageblocksize"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Cumulative Overall Average Block Size (MB)"
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
