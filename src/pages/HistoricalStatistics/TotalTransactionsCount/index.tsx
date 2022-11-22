// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { transformTotalTransactionCount, getChartData } from '@utils/helpers/statisticsLib';
import { info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { TTransactionsChart, TLineChartData, TCacheValue } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

const period = 'all';

function TotalTransactionCount() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<TTransactionsChart> }>({
    method: 'get',
    url: URLS.GET_TRANSACTIONS_CHARTS,
  });
  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.totalTransactionsCount) as TCacheValue) ||
        readCacheValue(cacheList.totalTransactionsCount) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period].parseData as TLineChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period, func: 'COUNT', col: 'id', timestamp },
      });
      if (data) {
        const cacheData = currentCache[period]?.parseData as TLineChartData;
        const startValue = cacheData ? cacheData.dataY[cacheData.dataY.length - 1] : 0;
        const parseData = transformTotalTransactionCount(data.data, startValue);
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
              ? Number(data.data[data.data.length - 1]?.label)
              : currentCache[period]?.lastDate,
          },
        };
        setCacheValue(
          cacheList.totalTransactionsCount,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
          Date.now(),
        );
        cache.set(cacheList.totalTransactionsCount, currentCache);
      }
      setLoading(false);
    };
    loadLineChartData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Total Transaction Count">
      <EChartsLineChart
        chartName="totalTransactionCount"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Total Transaction Count"
        info={info}
        offset={1}
        handleBgColorChange={handleBgColorChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default TotalTransactionCount;
