// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformDifficultyInfo } from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { IStatistic, TLineChartData, TCacheValue } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

function Difficulty() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<IStatistic> }>({
    method: 'get',
    url: URLS.GET_STATISTICS,
  });
  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let currentCache = (cache.get(cacheList.difficulty) as TCacheValue) || {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period] as TLineChartData);
      }
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period },
      });
      if (data) {
        const parseData = transformDifficultyInfo(data.data, period);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        if (isSubscribed) {
          setChartData(parseData);
        }
        if (!currentCache[period]) {
          currentCache = {
            ...currentCache,
            [period]: parseData,
          };
        }
        cache.set(cacheList.difficulty, currentCache);
      }
      setLoading(false);
    };
    loadLineChartData();
    return () => {
      isSubscribed = false;
    };
  }, [period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Difficulty">
      <EChartsLineChart
        chartName="difficulty"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Network Difficulty"
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
