// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  PeriodTypes,
  transformTransactionPerSecond,
  getChartData,
} from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { TTransactionPerSecond, TLineChartData, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

function TransactionPerSecond() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<TTransactionPerSecond> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_TRANSACTION_PER_SECOND,
  });

  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.transactionPerSecond) as TCacheValue) ||
        readCacheValue(cacheList.transactionPerSecond) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period].parseData as TLineChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period, timestamp },
      });
      if (data) {
        const parseData = transformTransactionPerSecond(data.data, period, timestamp);
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
          cacheList.transactionPerSecond,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.transactionPerSecond, currentCache);
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Transaction Per Second">
      <EChartsLineChart
        chartName="transactionspersecond"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Transactions Per Second"
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

export default TransactionPerSecond;
