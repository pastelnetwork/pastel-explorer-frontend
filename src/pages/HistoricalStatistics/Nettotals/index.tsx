// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  PeriodTypes,
  transformNetTotals,
  mergeMultiLineChartData,
} from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TNettotalsInfo, TMultiLineChartData, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

function Nettotals() {
  const [chartData, setChartData] = useState<TMultiLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<TNettotalsInfo> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_NETTOTALS,
  });

  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.networkTotal) as TCacheValue) ||
        readCacheValue(cacheList.networkTotal) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period].parseData as TMultiLineChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }

      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'ASC', timestamp },
      });
      if (data) {
        const parseData = transformNetTotals(data.data, period, timestamp);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        const newParseData = mergeMultiLineChartData(
          parseData,
          currentCache[period]?.parseData as TMultiLineChartData,
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
              ? data.data[data.data.length - 1]?.timestamp
              : currentCache[period]?.lastDate,
          },
        };
        setCacheValue(
          cacheList.networkTotal,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.networkTotal, currentCache);
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Network Total">
      <EChartsLineChart
        chartName="networktotals"
        dataX={chartData?.dataX}
        dataY1={chartData?.dataY1}
        dataY2={chartData?.dataY2}
        title="Network Total"
        info={info}
        period={period}
        offset={0}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default Nettotals;
