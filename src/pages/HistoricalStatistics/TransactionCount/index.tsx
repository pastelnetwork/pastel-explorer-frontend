// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformLineChartData, getChartData } from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { TTransactionsChart, TLineChartData, TCacheValue } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

function StatisticsTransactionsCount() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
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
        (cache.get(cacheList.transactionCount) as TCacheValue) ||
        readCacheValue(cacheList.transactionCount, true) ||
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
        const parseData = transformLineChartData(data.data, period);
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
          cacheList.transactionCount,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.transactionCount, currentCache);
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Transaction Count">
      <EChartsLineChart
        chartName="transactionCount"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Transaction Count"
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
