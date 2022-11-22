// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformStatisticsChart, getChartData } from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TChartStatisticsResponse, TLineChartData, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { getCurrencyName } from '@utils/appInfo';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

function PercentOfPSLStaked() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<TChartStatisticsResponse> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_PERCENT_OF_PSL_STAKED,
  });
  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.percentOfPslStaked) as TCacheValue) ||
        readCacheValue(cacheList.percentOfPslStaked) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period].parseData as TLineChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }
      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'ASC', timestamp },
      });
      if (data) {
        const parseData = transformStatisticsChart(data.data, period);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        const newParseData = getChartData(
          parseData,
          currentCache[period]?.parseData as TLineChartData,
          period,
        );
        if (isSubscribed) {
          setChartData(newParseData);
        }
        currentCache = {
          ...currentCache,
          [period]: {
            parseData: newParseData,
            lastDate: data.data.length
              ? data.data[data.data.length - 1]?.time
              : currentCache[period]?.lastDate,
          },
        };
        setCacheValue(
          cacheList.percentOfPslStaked,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.percentOfPslStaked, currentCache);
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
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title={`% of ${getCurrencyName()} Staked`}
    >
      <EChartsLineChart
        chartName="percentOfPSLStaked"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={`% of ${getCurrencyName()} Staked`}
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
